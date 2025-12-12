import { useState } from 'react';
import './Modal.css';

function AddNewFood({ onClose }) {
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');

    if (!name) {
      setError('Food name is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/catprofile/food/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: brand || null,
          name: name,
          type: type || null,
          calories: calories ? parseFloat(calories) : null,
          carbs: carbs ? parseFloat(carbs) : null,
          protein: protein ? parseFloat(protein) : null,
          fat: fat ? parseFloat(fat) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to add food');
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
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add Food to Catalog</h2>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="modal-body">
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="form-group">
            <label className="form-label">Brand</label>
            <input 
              type="text" 
              className="modal-input" 
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              className="modal-input" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Type</label>
            <select 
              className="modal-input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="Wet">Wet</option>
              <option value="Dry">Dry</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Calories</label>
            <input 
              type="text" 
              className="modal-input" 
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Carbs</label>
            <input 
              type="text" 
              className="modal-input" 
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Protein</label>
            <input 
              type="text" 
              className="modal-input" 
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Fat</label>
            <input 
              type="text" 
              className="modal-input" 
              value={fat}
              onChange={(e) => setFat(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSave}>
            Save food
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewFood;
