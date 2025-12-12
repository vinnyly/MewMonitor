import { useState, useEffect } from 'react';
import './Modal.css';

function HealthProblemsData({ onClose }) {
  const [problems, setProblems] = useState([]);
  const [editingMname, setEditingMname] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [error, setError] = useState('');

  // Fetch all medicinal problems on load
  useEffect(() => {
    const loadProblems = async () => {
      try {
        const response = await fetch('http://localhost:3000/catprofile/med-problem/list');
        const data = await response.json();
        if (response.ok) {
          setProblems(data);
        }
      } catch (e) {
        console.error('Failed to fetch medicinal problems:', e);
      }
    };
    loadProblems();
  }, []);

  // Refetch problems after update/delete
  const fetchProblems = async () => {
    try {
      const response = await fetch('http://localhost:3000/catprofile/med-problem/list');
      const data = await response.json();
      if (response.ok) {
        setProblems(data);
      }
    } catch (e) {
      console.error('Failed to fetch medicinal problems:', e);
    }
  };

  // Start editing a problem
  const handleStartEdit = (problem) => {
    setEditingMname(problem.Mname);
    setEditDescription(problem.description || '');
    setError('');
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingMname(null);
    setEditDescription('');
    setError('');
  };

  // Save problem changes
  const handleSaveEdit = async () => {
    try {
      const response = await fetch('http://localhost:3000/catprofile/med-problem/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Mname: editingMname,
          description: editDescription || null,
        }),
      });

      if (response.ok) {
        await fetchProblems();
        handleCancelEdit();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update medicinal problem');
      }
    } catch (e) {
      console.error('Failed to update medicinal problem:', e);
      setError('Unable to connect to server');
    }
  };

  // Delete problem
  const handleDeleteProblem = async (Mname) => {
    if (!window.confirm(`Are you sure you want to delete "${Mname}"? This may affect cats with this health problem.`)) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/catprofile/med-problem/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Mname }),
      });

      if (response.ok) {
        await fetchProblems();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete medicinal problem');
      }
    } catch (e) {
      console.error('Failed to delete medicinal problem:', e);
      setError('Unable to connect to server');
    }
  };

  // Handle Enter key for saving edit
  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content health-problems-modal">
        <h2>Health Problems Data</h2>
        
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

        <div className="health-table-container">
          <table className="health-data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {problems.length === 0 ? (
                <tr>
                  <td colSpan={3}>No health problems data available.</td>
                </tr>
              ) : (
                problems.map((problem) => (
                  <tr key={problem.Mname}>
                    {editingMname === problem.Mname ? (
                      <>
                        <td>{problem.Mname}</td>
                        <td>
                          <input 
                            type="text" 
                            value={editDescription} 
                            onChange={(e) => setEditDescription(e.target.value)}
                            onKeyDown={handleEditKeyDown}
                            className="edit-description-input"
                          />
                        </td>
                        <td>
                          <div className="health-action-buttons">
                            <button className="save-btn" onClick={handleSaveEdit}>Save</button>
                            <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td><strong>{problem.Mname}</strong></td>
                        <td>{problem.description || '-'}</td>
                        <td>
                          <div className="health-action-buttons">
                            <button className="edit-btn" onClick={() => handleStartEdit(problem)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDeleteProblem(problem.Mname)}>Delete</button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default HealthProblemsData;