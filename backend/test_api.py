from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_home():
    response = client.get("/")

    assert response.status_code == 200

    assert response.json() == {
        "message": "Internship Candidate API is running"
    }


def test_create_candidate():
    candidate = {
        "name": "Test Candidate",
        "email": "testcandidate@example.com",
        "phone": "9876543210",
        "skills": "Python, React, SQL",
        "status": "Applied"
    }

    response = client.post(
        "/candidates",
        json=candidate
    )

    assert response.status_code == 200

    data = response.json()

    assert data["name"] == "Test Candidate"
    assert data["email"] == "testcandidate@example.com"
    assert data["phone"] == "9876543210"
    assert data["status"] == "Applied"


def test_get_candidates():
    response = client.get("/candidates")

    assert response.status_code == 200

    assert isinstance(response.json(), list)


def test_invalid_email():
    candidate = {
        "name": "Test User",
        "email": "invalid-email",
        "phone": "9876543210",
        "skills": "Python",
        "status": "Applied"
    }

    response = client.post(
        "/candidates",
        json=candidate
    )

    assert response.status_code == 422


def test_invalid_phone():
    candidate = {
        "name": "Test User",
        "email": "phone-test@example.com",
        "phone": "123abc",
        "skills": "Python",
        "status": "Applied"
    }

    response = client.post(
        "/candidates",
        json=candidate
    )

    assert response.status_code == 422