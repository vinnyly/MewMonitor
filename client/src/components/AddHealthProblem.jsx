import { useState } from 'react';
import './Modal.css';

function AddHealthProblem({ onClose, uid, cname, medicinalProblems }) {
  const [pname, setPname] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');

    if (!pname) {
      setError('Health problem is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/temp/cat-problem/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: parseInt(uid),
          cname: cname,
          pname: pname,
          diagnosis_date: new Date().toISOString().split('T')[0],
          severity: severity || null,
          description: description || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to add health problem');
        return;
      }

      onClose();
    } catch (e) {
      setError('Unable to connect to server');
      console.error(e);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add Health Problem</h2>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="modal-body">
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="form-group">
            <label className="form-label">Health Problem</label>
            <select 
              className="modal-input"
              value={pname}
              onChange={(e) => setPname(e.target.value)}
            >
              <option value="">Select a health problem</option>
              {medicinalProblems && medicinalProblems.map((problem) => (
                <option key={problem.Mname} value={problem.Mname}>
                  {problem.Mname}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Severity</label>
            <select 
              className="modal-input"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="">Select severity</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea 
              className="modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSave}>
            Save problem
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddHealthProblem;
