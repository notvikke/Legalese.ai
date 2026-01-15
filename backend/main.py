from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, Request, Form, Body
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import uvicorn
from database import engine, Base, get_db
import models, extraction, ai, report_generator
import os 
from pydantic import BaseModel 
# from dodo_payments.webhook import Webhook

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model on startup
    try:
        ai.load_ai_model()
    except Exception as e:
        print(f"Warning: Could not load AI model: {e}")
    
    # Create tables
    try:
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully")
    except Exception as e:
        print(f"Warning: Could not create database tables: {e}")
        print("App will continue but database operations may fail")
    
    yield
    # Clean up
    print("Shutting down...")


app = FastAPI(lifespan=lifespan)

# Add CORS Middleware
# Support both local development and production
# For debugging: Allow all origins temporarily
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=False, # Must be False for wildcard origins
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "Legalese.ai Backend"}

@app.get("/health")
def health_check():
    """Health check endpoint for Vercel"""
    return {
        "status": "healthy",
        "database": "connected" if engine else "not configured",
        "ai_model": "loaded" if ai.model_loaded else "using heuristics"
    }


@app.post("/api/create-checkout-session")
async def create_checkout_session(user_id: str = Form(...)): 
    # Mock checkout creation using proper Dodo Payments API structure if SDK is missing
    # or just return a mock URL for this demo.
    
    # Real implementation would be calls to Dodo API
    # For MVP demonstration, we redirect to the payment link
    # In a real app, you might want to pass user_id as metadata to Dodo so you can link the webhook back
    return {"checkout_url": "https://checkout.dodopayments.com/buy/pdt_0NWHk0ALtx4aENNGHWVUR?quantity=1"}

@app.post("/api/analyze")
async def analyze_document(
    file: UploadFile = File(...), 
    user_id: str = Form(...),
    db: Session = Depends(get_db)
):
    try:
        # 1. Read file
        content = await file.read()
        
        # 2. Extract text
        text = extraction.extract_text(file.filename, content)
        if not text:
            raise HTTPException(status_code=400, detail="Could not extract text or unsupported file format.")
        
        # 3. Check subscription limit
        # Check if user exists, if not create
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
             # In real app, user creation happens via Clerk webhook, but for now lazy-create
             user = models.User(id=user_id, email="user_from_clerk@example.com") 
             db.add(user)
             db.commit()
        
        if not user.is_premium:
            doc_count = db.query(models.Document).filter(models.Document.user_id == user_id).count()
            if doc_count >= 3: # Updated limit to 3
                raise HTTPException(status_code=402, detail="Free limit reached. Upgrade to Premium.")
    
        # 4. Save Document
        db_doc = models.Document(user_id=user_id, filename=file.filename, content=text)
        db.add(db_doc)
        db.commit()
        db.refresh(db_doc)
        
        # 5. Analyze
        analysis_results = ai.process_document(text)
        
        # 6. Save Clauses
        for item in analysis_results:
            clause = models.Clause(
                document_id=db_doc.id,
                text=item['text'],
                risk_level=item['risk'],
                explanation=item['explanation']
            )
            db.add(clause)
        
        db.commit()
        
        return {
            "document_id": db_doc.id,
            "filename": db_doc.filename,
            "results": analysis_results
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Error in analyze: {e}")
        from fastapi.responses import JSONResponse
        return JSONResponse(status_code=500, content={"detail": f"Backend Error: {str(e)}"})

@app.get("/api/documents")
def get_documents(user_id: str, db: Session = Depends(get_db)):
    # In a real app, user_id would be extracted from the auth token (Clerk)
    # Here we might need to pass it as a query param or header for MVP if not fully validating tokens yet.
    docs = db.query(models.Document).filter(models.Document.user_id == user_id).all()
    return docs

@app.get("/api/documents/{doc_id}")
def get_document(doc_id: int, db: Session = Depends(get_db)):
    doc = db.query(models.Document).filter(models.Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # helper to format clauses
    results = []
    for c in doc.clauses:
        results.append({
            "text": c.text,
            "risk": c.risk_level,
            "explanation": c.explanation
        })
        
    return {
        "document_id": doc.id,
        "filename": doc.filename,
        "content" : doc.content,
        "results": results
    }

@app.post("/api/webhooks/dodo")
async def dodo_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    headers = request.headers
    # Verify signature logic here using Dodo SDK
    # webhook_id = headers.get("webhook-id")
    # if not Webhook.verify(payload, headers, os.getenv("DODO_PAYMENTS_WEBHOOK_KEY")):
    #    raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Handle event (e.g. subscription.created -> set is_premium=True)
    return {"status": "received"}

@app.get("/api/user/status")
def get_user_status(user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    
    # If user doesn't exist yet (first login), treat as free user with 0 docs
    if not user:
        return {
            "is_premium": False,
            "document_count": 0,
            "limit": 3 # Updated limit to 3
        }
    
    doc_count = db.query(models.Document).filter(models.Document.user_id == user_id).count()
    
    return {
        "is_premium": user.is_premium,
        "document_count": doc_count,
        "limit": 3 if not user.is_premium else -1 # Updated limit to 3
    }

class RewriteRequest(BaseModel):
    text: str

@app.post("/api/negotiate")
async def negotiate_clause(request: RewriteRequest):
    rewritten = await ai.rewrite_clause(request.text)
    return {"rewritten_text": rewritten}

@app.get("/api/export/{doc_id}")
def export_report(doc_id: int, db: Session = Depends(get_db)):
    doc = db.query(models.Document).filter(models.Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Prepare data
    results = []
    for c in doc.clauses:
        results.append({
            "text": c.text,
            "risk": c.risk_level,
            "explanation": c.explanation
        })
    
    doc_data = {
        "filename": doc.filename,
        "results": results
    }
    
    pdf_buffer = report_generator.generate_pdf_report(doc_data)
    
    return StreamingResponse(
        pdf_buffer, 
        media_type="application/pdf", 
        headers={"Content-Disposition": f"attachment; filename=Risk_Report_{doc.filename}.pdf"}
    )

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
