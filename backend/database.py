from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Validate and fix DATABASE_URL
if not DATABASE_URL:
    print("WARNING: DATABASE_URL not set. Using local SQLite database.")
    # Use /tmp for Vercel/Serverless writability (Note: Data is ephemeral)
    DATABASE_URL = "sqlite:////tmp/legalese_local.db"
else:
    # 1. Fix postgres protocol
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

    # 2. Clean unsupported query parameters for psycopg2 (e.g. prepared_statement*)
    try:
        from sqlalchemy.engine.url import make_url
        url_obj = make_url(DATABASE_URL)
        
        # Filter out keys starting with 'prepared_statement' or 'pgbouncer' which confuse libpq
        clean_query = {
            k: v for k, v in url_obj.query.items() 
            if not k.startswith("prepared_statement") and k != "pgbouncer"
        }
        
        # Reconstruct URL with cleaned query
        url_obj = url_obj._replace(query=clean_query)
        DATABASE_URL = str(url_obj)
    except Exception as e:
        print(f"Warning: Failed to sanitize DATABASE_URL: {e}")

# Configure engine with appropriate settings
if DATABASE_URL.startswith("sqlite"):
    # SQLite doesn't support connection pooling
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    # PostgreSQL with NullPool for serverless environments (Vercel)
    # NullPool prevents "too many connections" errors by not maintaining a connection pool
    # Each request gets a fresh connection that's immediately closed after use
    engine = create_engine(
        DATABASE_URL,
        poolclass=NullPool,
        pool_pre_ping=True,  # Verify connections before using
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
