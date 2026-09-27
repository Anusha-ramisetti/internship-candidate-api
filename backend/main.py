from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

import models
import schemas
import crud

from database import engine, SessionLocal


# ==========================================
# CREATE DATABASE TABLES
# ==========================================

models.Base.metadata.create_all(bind=engine)


# ==========================================
# CREATE FASTAPI APPLICATION
# ==========================================

app = FastAPI(
    title="Internship Candidate Management API",
    description="API for managing internship candidates",
    version="1.0.0"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# ==========================================
# HOME ENDPOINT
# ==========================================

@app.get("/")
def home():
    return {
        "message": "Internship Candidate API is running"
    }


# ==========================================
# CREATE CANDIDATE
# ==========================================

@app.post(
    "/candidates",
    response_model=schemas.CandidateResponse
)
def create_candidate(
    candidate: schemas.CandidateCreate,
    db: Session = Depends(get_db)
):
    try:
        return crud.create_candidate(
            db,
            candidate
        )

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="A candidate with this email already exists"
        )


# ==========================================
# GET ALL CANDIDATES
# ==========================================

@app.get(
    "/candidates",
    response_model=list[schemas.CandidateResponse]
)
def get_candidates(
    db: Session = Depends(get_db)
):
    return crud.get_candidates(db)


# ==========================================
# GET ONE CANDIDATE
# ==========================================

@app.get(
    "/candidates/{candidate_id}",
    response_model=schemas.CandidateResponse
)
def get_candidate(
    candidate_id: int,
    db: Session = Depends(get_db)
):
    candidate = crud.get_candidate(
        db,
        candidate_id
    )

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    return candidate


# ==========================================
# UPDATE CANDIDATE
# ==========================================

@app.put(
    "/candidates/{candidate_id}",
    response_model=schemas.CandidateResponse
)
def update_candidate(
    candidate_id: int,
    candidate: schemas.CandidateCreate,
    db: Session = Depends(get_db)
):
    try:
        updated_candidate = crud.update_candidate(
            db,
            candidate_id,
            candidate
        )

        if updated_candidate is None:
            raise HTTPException(
                status_code=404,
                detail="Candidate not found"
            )

        return updated_candidate

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="A candidate with this email already exists"
        )


# ==========================================
# DELETE CANDIDATE
# ==========================================

@app.delete("/candidates/{candidate_id}")
def delete_candidate(
    candidate_id: int,
    db: Session = Depends(get_db)
):
    deleted_candidate = crud.delete_candidate(
        db,
        candidate_id
    )

    if deleted_candidate is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    return {
        "message": "Candidate deleted successfully"
    }