import { useEffect, useState } from "react";
import "./App.css";
import CandidateList from "./CandidateList";

function App() {
  // ==========================================
  // FORM STATES
  // ==========================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [status, setStatus] = useState("Applied");

  // ==========================================
  // REFRESH STATE
  // ==========================================

  const [refresh, setRefresh] = useState(0);

  // ==========================================
  // CANDIDATE DATA
  // ==========================================

  const [candidates, setCandidates] = useState([]);

  // ==========================================
  // EDITING STATE
  // ==========================================

  const [editingId, setEditingId] = useState(null);

  // ==========================================
  // GET CANDIDATES FROM BACKEND
  // ==========================================

  const getCandidates = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/candidates"
      );

      const data = await response.json();

      if (response.ok) {
        setCandidates(data);
      }
    } catch (error) {
      console.error(
        "Error fetching candidates:",
        error
      );
    }
  };

  // ==========================================
  // LOAD CANDIDATES
  // ==========================================

  useEffect(() => {
    getCandidates();
  }, [refresh]);

  // ==========================================
  // DASHBOARD COUNTS
  // ==========================================

  const totalCandidates = candidates.length;

  const appliedCount = candidates.filter(
    (candidate) =>
      candidate.status === "Applied"
  ).length;

  const shortlistedCount = candidates.filter(
    (candidate) =>
      candidate.status === "Shortlisted"
  ).length;

  const interviewCount = candidates.filter(
    (candidate) =>
      candidate.status === "Interview"
  ).length;

  const selectedCount = candidates.filter(
    (candidate) =>
      candidate.status === "Selected"
  ).length;

  const rejectedCount = candidates.filter(
    (candidate) =>
      candidate.status === "Rejected"
  ).length;

  // ==========================================
  // ADD OR UPDATE CANDIDATE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const candidate = {
      name: name,
      email: email,
      phone: phone,
      skills: skills,
      status: status,
    };

    try {
      let response;

      // ========================================
      // UPDATE CANDIDATE
      // ========================================

      if (editingId !== null) {
        response = await fetch(
          `http://127.0.0.1:8000/candidates/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(candidate),
          }
        );
      }

      // ========================================
      // ADD CANDIDATE
      // ========================================

      else {
        response = await fetch(
          "http://127.0.0.1:8000/candidates",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(candidate),
          }
        );
      }

      const data = await response.json();

      // ========================================
      // SUCCESS
      // ========================================

      if (response.ok) {
        alert(
          editingId !== null
            ? "Candidate updated successfully!"
            : "Candidate added successfully!"
        );

        // Clear form
        setName("");
        setEmail("");
        setPhone("");
        setSkills("");
        setStatus("Applied");

        // Exit edit mode
        setEditingId(null);

        // Refresh candidate data
        setRefresh(
          (value) => value + 1
        );

        console.log(data);
      }

      // ========================================
      // ERROR
      // ========================================

      else {
        alert(
          data.detail ||
            "Something went wrong"
        );
      }
    } catch (error) {
      console.error(
        "Error submitting candidate:",
        error
      );

      alert(
        "Could not connect to the backend"
      );
    }
  };

  // ==========================================
  // EDIT CANDIDATE
  // ==========================================

  const handleEdit = (candidate) => {
    setName(candidate.name);
    setEmail(candidate.email);
    setPhone(candidate.phone);
    setSkills(candidate.skills);
    setStatus(candidate.status);

    setEditingId(candidate.id);
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================

  const cancelEdit = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSkills("");
    setStatus("Applied");

    setEditingId(null);
  };

  // ==========================================
  // REFRESH AFTER CANDIDATE CHANGE
  // ==========================================

  const handleCandidateChange = () => {
    setRefresh(
      (value) => value + 1
    );
  };

  // ==========================================
  // USER INTERFACE
  // ==========================================

  return (
    <div className="app-container">

      {/* ======================================
          MAIN HEADING
      ====================================== */}

      <h1>
        Internship Candidate Management System
      </h1>


      {/* ======================================
          DASHBOARD
      ====================================== */}

      <h2>Candidate Dashboard</h2>

      <div className="dashboard">

        {/* Total Candidates */}

        <div className="dashboard-card">
          <h3>Total Candidates</h3>
          <p>{totalCandidates}</p>
        </div>

        {/* Applied */}

        <div className="dashboard-card">
          <h3>Applied</h3>
          <p>{appliedCount}</p>
        </div>

        {/* Shortlisted */}

        <div className="dashboard-card">
          <h3>Shortlisted</h3>
          <p>{shortlistedCount}</p>
        </div>

        {/* Interview */}

        <div className="dashboard-card">
          <h3>Interview</h3>
          <p>{interviewCount}</p>
        </div>

        {/* Selected */}

        <div className="dashboard-card">
          <h3>Selected</h3>
          <p>{selectedCount}</p>
        </div>

        {/* Rejected */}

        <div className="dashboard-card">
          <h3>Rejected</h3>
          <p>{rejectedCount}</p>
        </div>

      </div>


      {/* ======================================
          CANDIDATE REGISTRATION / EDIT FORM
      ====================================== */}

      <div className="form-container">

        <h2>
          {editingId !== null
            ? "Edit Candidate"
            : "Candidate Registration"}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <div className="form-group">

            <label>Name:</label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter candidate name"
              required
            />

          </div>


          {/* Email */}

          <div className="form-group">

            <label>Email:</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter email address"
              required
            />

          </div>


          {/* Phone */}

          <div className="form-group">

            <label>Phone:</label>

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Enter phone number"
              required
            />

          </div>


          {/* Skills */}

          <div className="form-group">

            <label>Skills:</label>

            <input
              type="text"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              placeholder="Python, React, SQL"
              required
            />

          </div>


          {/* Status */}

          <div className="form-group">

            <label>Status:</label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >

              <option value="Applied">
                Applied
              </option>

              <option value="Shortlisted">
                Shortlisted
              </option>

              <option value="Interview">
                Interview
              </option>

              <option value="Selected">
                Selected
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

          </div>


          {/* Submit Button */}

          <button
            type="submit"
            className="submit-button"
          >
            {editingId !== null
              ? "Update Candidate"
              : "Add Candidate"}
          </button>


          {/* Cancel Button */}

          {editingId !== null && (
            <button
              type="button"
              className="cancel-button"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}

        </form>

      </div>


      {/* ======================================
          CANDIDATE LIST
      ====================================== */}

      <CandidateList
        refresh={refresh}
        onEdit={handleEdit}
        onCandidateChange={
          handleCandidateChange
        }
      />

    </div>
  );
}

export default App;