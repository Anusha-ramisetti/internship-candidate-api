from sqlalchemy.orm import Session
from models import Candidate
from schemas import CandidateCreate


def create_candidate(db: Session, candidate: CandidateCreate):
    db_candidate = Candidate(
        name=candidate.name,
        email=candidate.email,
        phone=candidate.phone,
        skills=candidate.skills,
        status=candidate.status
    )

    db.add(db_candidate)
    db.commit()
    db.refresh(db_candidate)

    return db_candidate


def get_candidates(db: Session):
    return db.query(Candidate).all()


def get_candidate(db: Session, candidate_id: int):
    return db.query(Candidate).filter(
        Candidate.id == candidate_id
    ).first()


def update_candidate(
    db: Session,
    candidate_id: int,
    candidate: CandidateCreate
):
    db_candidate = get_candidate(db, candidate_id)

    if db_candidate is None:
        return None

    db_candidate.name = candidate.name
    db_candidate.email = candidate.email
    db_candidate.phone = candidate.phone
    db_candidate.skills = candidate.skills
    db_candidate.status = candidate.status

    db.commit()
    db.refresh(db_candidate)

    return db_candidate


def delete_candidate(db: Session, candidate_id: int):
    db_candidate = get_candidate(db, candidate_id)

    if db_candidate is None:
        return None

    db.delete(db_candidate)
    db.commit()

    return db_candidate