from sqlalchemy import Column, Integer, String
from database import Base


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True, index=True)
    phone = Column(String, nullable=False)
    skills = Column(String, nullable=False)
    status = Column(String, default="Applied")