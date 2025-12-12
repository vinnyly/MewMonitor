import { useState } from 'react';
import './Modal.css';

function EditDietPlan({ onClose, uid, cname, existingPlan }) {
  const [feedingInterval, setFeedingInterval] = useState(existingPlan?.feeding_interval || '');
  const [feedingPortion, setFeedingPortion] = useState(existingPlan?.feeding_portion || '');
  const [description, setDescription] = useState(existingPlan?.description || '');
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');

    if (!feedingInterval) {
      setError('Meals per day is required');
      return;
    }

    try {
      // If there's an existing plan, update it. Otherwise, create a new one.
      if (existingPlan) {
        const response = await fetch('http://localhost:3000/catprofile/diet-plan/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            feeding_interval: parseInt(feedingInterval),
            feeding_portion: feedingPortion ? parseInt(feedingPortion) : null,
            description: description || null,
            dp_number: existingPlan.dp_number,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to update diet plan');
          return;
        }
      } else {
        const response = await fetch('http://localhost:3000/catprofile/diet-plan/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid: parseInt(uid),
            cname: cname,
            feeding_interval: parseInt(feedingInterval),
            feeding_portion: feedingPortion ? parseInt(feedingPortion) : null,
            description: description || null,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to create diet plan');
          return;
        }
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
          <h2 className="modal-title">{existingPlan ? 'Edit Diet Plan' : 'Create Diet Plan'}</h2>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="modal-body">
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="form-group">
            <label className="form-label">Meals per day</label>
            <input 
              type="number" 
              className="modal-input" 
              value={feedingInterval}
              onChange={(e) => setFeedingInterval(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Portion per meal (g)</label>
            <input 
              type="number" 
              className="modal-input" 
              value={feedingPortion}
              onChange={(e) => setFeedingPortion(e.target.value)}
            />
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
            {existingPlan ? 'Update plan' : 'Create plan'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditDietPlan;
