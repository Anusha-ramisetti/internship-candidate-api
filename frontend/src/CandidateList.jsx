import { useEffect, useState } from "react";

function CandidateList({
  refresh,
  onEdit,
  onCandidateChange
}) {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");

  // Get candidates from backend
  const getCandidates = async () => {
    try {
      const response = await fetch(
        "https://internship-candidate-api.onrender.com/candidates"
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

  // Load candidates
  useEffect(() => {
    getCandidates();
  }, [refresh]);

  // Delete candidate
  const deleteCandidate = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this candidate?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `https://internship-candidate-api.onrender.com/candidates/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          "Candidate deleted successfully!"
        );

        // Update candidate list
        getCandidates();

        // Update dashboard counts
        onCandidateChange();
      } else {
        alert(
          data.detail ||
            "Could not delete candidate"
        );
      }
    } catch (error) {
      console.error(
        "Error deleting candidate:",
        error
      );

      alert(
        "Could not connect to the backend"
      );
    }
  };

  // Search candidates
  const filteredCandidates =
    candidates.filter((candidate) => {
      const searchText =
        search.toLowerCase();

      return (
        candidate.name
          .toLowerCase()
          .includes(searchText) ||

        candidate.email
          .toLowerCase()
          .includes(searchText) ||

        candidate.skills
          .toLowerCase()
          .includes(searchText) ||

        candidate.status
          .toLowerCase()
          .includes(searchText)
      );
    });

  return (
    <div className="candidate-list-container">

      <h2>Candidate List</h2>

      {/* Search */}
      <input
        className="search-input"
        type="text"
        placeholder="Search by name, email, skills or status"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* Candidate Table */}
      {filteredCandidates.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        <div className="table-container">

          <table className="candidate-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Skills</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredCandidates.map(
                (candidate) => (
                  <tr key={candidate.id}>

                    <td>
                      {candidate.id}
                    </td>

                    <td>
                      {candidate.name}
                    </td>

                    <td>
                      {candidate.email}
                    </td>

                    <td>
                      {candidate.phone}
                    </td>

                    <td>
                      {candidate.skills}
                    </td>

                    <td>
                      <span
                        className={`status-badge status-${candidate.status.toLowerCase()}`}
                      >
                        {candidate.status}
                      </span>
                    </td>

                    <td>

                      {/* Edit */}
                      <button
                        className="edit-button"
                        onClick={() =>
                          onEdit(candidate)
                        }
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        className="delete-button"
                        onClick={() =>
                          deleteCandidate(
                            candidate.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default CandidateList;