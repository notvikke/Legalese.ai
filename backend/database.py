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
    DATABASE_URL = "sqlite:///./legalese_local.db"
elif DATABASE_URL.startswith("postgres://"):
    # Fix for Heroku/Render postgres:// URLs (SQLAlchemy requires postgresql://)
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

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
