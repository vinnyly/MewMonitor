import { useState, useEffect } from 'react';
import './Modal.css';

function FoodData({ onClose, isSiteManager }) {
  const [foods, setFoods] = useState([]);
  const [editingFid, setEditingFid] = useState(null);
  const [editBrand, setEditBrand] = useState('');
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('');
  const [editCalories, setEditCalories] = useState('');
  const [editCarbs, setEditCarbs] = useState('');
  const [editProtein, setEditProtein] = useState('');
  const [editFat, setEditFat] = useState('');
  const [error, setError] = useState('');

  // Fetch all foods on load
  useEffect(() => {
    const loadFoods = async () => {
      try {
        const response = await fetch('http://localhost:3000/catprofile/food/list');
        const data = await response.json();
        if (response.ok) {
          setFoods(data);
        }
      } catch (e) {
        console.error('Failed to fetch foods:', e);
      }
    };
    loadFoods();
  }, []);

  // Refetch foods after update/delete
  const fetchFoods = async () => {
    try {
      const response = await fetch('http://localhost:3000/catprofile/food/list');
      const data = await response.json();
      if (response.ok) {
        setFoods(data);
      }
    } catch (e) {
      console.error('Failed to fetch foods:', e);
    }
  };

  // Start editing a food
  const handleStartEdit = (food) => {
    setEditingFid(food.fid);
    setEditBrand(food.brand || '');
    setEditName(food.name || '');
    setEditType(food.type || '');
    setEditCalories(food.calories || '');
    setEditCarbs(food.carbs || '');
    setEditProtein(food.protein || '');
    setEditFat(food.fat || '');
    setError('');
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingFid(null);
    setEditBrand('');
    setEditName('');
    setEditType('');
    setEditCalories('');
    setEditCarbs('');
    setEditProtein('');
    setEditFat('');
    setError('');
  };

  // Save food changes
  const handleSaveEdit = async () => {
    if (!editName) {
      setError('Name is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/catprofile/food/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fid: editingFid,
          brand: editBrand || null,
          name: editName,
          type: editType || null,
          calories: editCalories ? parseFloat(editCalories) : null,
          carbs: editCarbs ? parseFloat(editCarbs) : null,
          protein: editProtein ? parseFloat(editProtein) : null,
          fat: editFat ? parseFloat(editFat) : null,
        }),
      });

      if (response.ok) {
        await fetchFoods();
        handleCancelEdit();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update food');
      }
    } catch (e) {
      console.error('Failed to update food:', e);
      setError('Unable to connect to server');
    }
  };

  // Delete food
  const handleDeleteFood = async (fid) => {
    if (!window.confirm('Are you sure you want to delete this food?')) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/catprofile/food/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fid }),
      });

      if (response.ok) {
        await fetchFoods();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete food');
      }
    } catch (e) {
      console.error('Failed to delete food:', e);
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
      <div className="modal-content food-data-modal">
        <h2>Food Data</h2>
        
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

        <div className="food-table-container">
          <table className="food-data-table">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Name</th>
                <th>Type</th>
                <th>Calories</th>
                <th>Carbs</th>
                <th>Protein</th>
                <th>Fat</th>
                {isSiteManager && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {foods.length === 0 ? (
                <tr>
                  <td colSpan={isSiteManager ? 8 : 7}>No food data available.</td>
                </tr>
              ) : (
                foods.map((food) => (
                  <tr key={food.fid}>
                    {editingFid === food.fid ? (
                      <>
                        <td>
                          <input 
                            type="text" 
                            value={editBrand} 
                            onChange={(e) => setEditBrand(e.target.value)}
                            onKeyDown={handleEditKeyDown}
                          />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            value={editName} 
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={handleEditKeyDown}
                          />
                        </td>
                        <td>
                          <select 
                            value={editType} 
                            onChange={(e) => setEditType(e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Wet">Wet</option>
                            <option value="Dry">Dry</option>
                            <option value="Mixed">Mixed</option>
                          </select>
                        </td>
                        <td>
                          <input 
                            type="number" 
                            value={editCalories} 
                            onChange={(e) => setEditCalories(e.target.value)}
                            onKeyDown={handleEditKeyDown}
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            value={editCarbs} 
                            onChange={(e) => setEditCarbs(e.target.value)}
                            onKeyDown={handleEditKeyDown}
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            value={editProtein} 
                            onChange={(e) => setEditProtein(e.target.value)}
                            onKeyDown={handleEditKeyDown}
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            value={editFat} 
                            onChange={(e) => setEditFat(e.target.value)}
                            onKeyDown={handleEditKeyDown}
                          />
                        </td>
                        <td>
                          <div className="food-action-buttons">
                            <button className="save-btn" onClick={handleSaveEdit}>Save</button>
                            <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{food.brand || '-'}</td>
                        <td>{food.name}</td>
                        <td>{food.type || '-'}</td>
                        <td>{food.calories || '-'}</td>
                        <td>{food.carbs || '-'}</td>
                        <td>{food.protein || '-'}</td>
                        <td>{food.fat || '-'}</td>
                        {isSiteManager && (
                          <td>
                            <div className="food-action-buttons">
                              <button className="edit-btn" onClick={() => handleStartEdit(food)}>Edit</button>
                              <button className="delete-btn" onClick={() => handleDeleteFood(food.fid)}>Delete</button>
                            </div>
                          </td>
                        )}
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

export default FoodData;