# Internship Candidate Management System

A full-stack web application for managing internship candidates.

The application allows users to register candidates, view candidate details, update candidate information, delete candidates, search candidates, and track candidate application status through a dashboard.

---

## Features

### Candidate Management

- Add a new candidate
- View all candidates
- View candidate details
- Edit candidate information
- Delete candidates
- Search candidates
- Track candidate status

### Candidate Status

Candidates can have the following statuses:

- Applied
- Shortlisted
- Interview
- Selected
- Rejected

### Dashboard

The dashboard displays:

- Total Candidates
- Applied Candidates
- Shortlisted Candidates
- Interview Candidates
- Selected Candidates
- Rejected Candidates

### Backend

- REST API
- CRUD operations
- Email validation
- Phone number validation
- Duplicate email handling
- SQLite database
- Swagger API documentation
- CORS configuration

### Frontend

- Candidate registration form
- Candidate list
- Search functionality
- Edit functionality
- Delete functionality
- Status badges
- Dashboard
- Responsive design

---

## Technologies Used

### Backend

- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Uvicorn
- Pytest

### Frontend

- React.js
- JavaScript
- HTML
- CSS
- Vite

### Tools

- Visual Studio Code
- Git
- GitHub
- Swagger UI

---

## Project Structure

```text
internship-candidate-api/
│
├── backend/
│   │
│   ├── venv/
│   │
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── test_api.py
│   ├── requirements.txt
│   └── candidates.db
│
├── frontend/
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── CandidateList.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md