from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Literal
import re


# ==========================================
# CREATE CANDIDATE SCHEMA
# ==========================================

class CandidateCreate(BaseModel):

    name: str = Field(
        min_length=2,
        max_length=100
    )

    email: EmailStr

    phone: str = Field(
        min_length=10,
        max_length=15
    )

    skills: str = Field(
        min_length=1,
        max_length=300
    )

    status: Literal[
        "Applied",
        "Shortlisted",
        "Interview",
        "Selected",
        "Rejected"
    ] = "Applied"

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value):

        if not re.fullmatch(r"[0-9]{10,15}", value):
            raise ValueError(
                "Phone number must contain only digits "
                "and be 10 to 15 digits long"
            )

        return value


# ==========================================
# RESPONSE SCHEMA
# ==========================================

class CandidateResponse(BaseModel):

    id: int
    name: str
    email: EmailStr
    phone: str
    skills: str
    status: str

    class Config:
        from_attributes = True