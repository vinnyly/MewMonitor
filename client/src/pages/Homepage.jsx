import { useState, useEffect } from 'react';
import GenderDropdown from '../components/GenderDropdown';
import './Homepage.css';

function Homepage({ onNavigate, medicinalProblems }) {
  const [gender, setGender] = useState('');
  const [cats, setCats] = useState([]);
  const [error, setError] = useState('');
  
  // Form state for adding a new cat
  const [newCatName, setNewCatName] = useState('');
  const [newCatBreed, setNewCatBreed] = useState('');
  const [newCatAge, setNewCatAge] = useState('');
  const [newCatWeight, setNewCatWeight] = useState('');

  // Edit cat state
  const [editingCatName, setEditingCatName] = useState(null); // Original name of cat being edited
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editBreed, setEditBreed] = useState('');

  // Diagnosis & Diet Plan state
  const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
  const [diagnosisPlans, setDiagnosisPlans] = useState([]);

  // Health Condition By Age state
  const [conditionsByAge, setConditionsByAge] = useState([]);

  const uid = localStorage.getItem('uid');

  // Refresh cat list
  const refreshCats = async () => {
    try {
      const response = await fetch(`http://localhost:3000/temp/cat/list?uid=${uid}`);
      const data = await response.json();
      if (response.ok) {
        setCats(data);
      }
    } catch (e) {
      console.error('Failed to fetch cats:', e);
    }
  };

  // Fetch all cats for the logged-in user
  useEffect(() => {
    const fetchConditionsByAge = async () => {
      try {
        const response = await fetch('http://localhost:3000/temp/conditions-by-age');
        const data = await response.json();
        if (response.ok) {
          setConditionsByAge(data);
        }
      } catch (e) {
        console.error('Failed to fetch conditions by age:', e);
      }
    };

    if (uid) {
      refreshCats();
      fetchConditionsByAge();
    }
  }, [uid]);

  // Fetch diagnosis plans when a diagnosis is selected
  const handleDiagnosisChange = async (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
    
    if (!diagnosis) {
      setDiagnosisPlans([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/temp/diagnosis-plans?condition=${encodeURIComponent(diagnosis)}`);
      const data = await response.json();
      if (response.ok) {
        setDiagnosisPlans(data);
      } else {
        setDiagnosisPlans([]);
      }
    } catch (e) {
      console.error('Failed to fetch diagnosis plans:', e);
      setDiagnosisPlans([]);
    }
  };

  const handleAddCat = async () => {
    setError('');

    if (!newCatName) {
      setError('Cat name is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/temp/cat/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: parseInt(uid),
          name: newCatName,
          breed: newCatBreed || null,
          age: newCatAge ? parseInt(newCatAge) : null,
          weight: newCatWeight ? parseFloat(newCatWeight) : null,
          gender: gender || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to add cat');
        return;
      }

      // Refresh the cat list
      await refreshCats();

      // Clear form
      setNewCatName('');
      setNewCatBreed('');
      setNewCatAge('');
      setNewCatWeight('');
      setGender('');
    } catch (e) {
      setError('Unable to connect to server');
      console.error(e);
    }
  };

  // Delete cat
  const handleDeleteCat = async (catName) => {
    if (!window.confirm(`Are you sure you want to delete ${catName}?`)) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/temp/cat/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: parseInt(uid),
          name: catName,
        }),
      });

      if (response.ok) {
        await refreshCats();
      }
    } catch (e) {
      console.error('Failed to delete cat:', e);
    }
  };

  // Start editing a cat
  const handleStartEdit = (cat) => {
    setEditingCatName(cat.name);
    setEditName(cat.name);
    setEditAge(cat.age || '');
    setEditBreed(cat.breed || '');
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingCatName(null);
    setEditName('');
    setEditAge('');
    setEditBreed('');
  };

  // Save cat changes
  const handleSaveEdit = async () => {
    try {
      const response = await fetch('http://localhost:3000/temp/cat/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: parseInt(uid),
          name: editingCatName,
          newName: editName || null,
          age: editAge ? parseInt(editAge) : null,
          breed: editBreed || null,
        }),
      });

      if (response.ok) {
        await refreshCats();
        handleCancelEdit();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update cat');
      }
    } catch (e) {
      console.error('Failed to update cat:', e);
      setError('Unable to connect to server');
    }
  };

  // Handle Enter key for saving edit
  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    }
  };

  const handleViewProfile = (cat) => {
    onNavigate('catprofile', { uid: uid, name: cat.name });
  };

  const handleLogout = () => {
    localStorage.removeItem('uid');
    onNavigate('signin');
  };

  return (
    <div className="homepage">
      <header className="header">
        <h1 className="header-logo">MewMonitor</h1>
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </header>

      <div className="homepage-content">
        <div className="homepage-box">
          <div className="cats-section">
            <h2 className="section-title">All Cats</h2>
            
            <div className="cats-table">
              <div className="table-header">
                <span className="header-name">Name</span>
                <span className="header-age">Age</span>
                <span className="header-breed">Breed</span>
                <span className="header-actions">Actions</span>
              </div>

              {cats.length === 0 ? (
                <div className="table-row">
                  <span>No cats yet. Add one below!</span>
                </div>
              ) : (
                cats.map((cat, index) => (
                  <div className="table-row" key={index}>
                    {editingCatName === cat.name ? (
                      <>
                        <input 
                          type="text" 
                          value={editName} 
                          onChange={(e) => setEditName(e.target.value)} 
                          onKeyDown={handleEditKeyDown}
                        />
                        <input 
                          type="number" 
                          value={editAge} 
                          onChange={(e) => setEditAge(e.target.value)} 
                          onKeyDown={handleEditKeyDown}
                        />
                        <input 
                          type="text" 
                          value={editBreed} 
                          onChange={(e) => setEditBreed(e.target.value)} 
                          onKeyDown={handleEditKeyDown}
                        />
                        <div className="action-buttons">
                          <button className="save-edit-button" onClick={handleSaveEdit}>Save Changes</button>
                          <button className="cancel-edit-button" onClick={handleCancelEdit}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="row-name">{cat.name}</span>
                        <span className="row-age">{cat.age || '-'}</span>
                        <span className="row-breed">{cat.breed || '-'}</span>
                        <div className="action-buttons">
                          <button 
                            className="view-profile-button"
                            onClick={() => handleViewProfile(cat)}
                          >
                            View Profile
                          </button>
                          <button className="edit-button" onClick={() => handleStartEdit(cat)}>Edit</button>
                          <button className="delete-button" onClick={() => handleDeleteCat(cat.name)}>Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="add-cat-section">
            <h2 className="section-title">Add Cat</h2>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="form-group">
              <label className="form-label">Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Breed</label>
              <input 
                type="text" 
                className="form-input" 
                value={newCatBreed}
                onChange={(e) => setNewCatBreed(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Age (years)</label>
              <input 
                type="number" 
                className="form-input" 
                value={newCatAge}
                onChange={(e) => setNewCatAge(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Weight</label>
              <input 
                type="text" 
                className="form-input" 
                value={newCatWeight}
                onChange={(e) => setNewCatWeight(e.target.value)}
              />
            </div>

            <div className="form-group">
              <GenderDropdown value={gender} onChange={setGender} />
            </div>

            <button className="save-cat-button" onClick={handleAddCat}>
              Save Cat
            </button>
          </div>

          <div className="diagnosis-section">
            <h2 className="section-title">Current Diet Plans for Health Conditions</h2>
            
            <div className="form-group">
              <label className="form-label">Select Health Condition</label>
              <select 
                className="form-input"
                value={selectedDiagnosis}
                onChange={(e) => handleDiagnosisChange(e.target.value)}
              >
                <option value="">Select a condition</option>
                {medicinalProblems.map((problem) => (
                  <option key={problem.Mname} value={problem.Mname}>
                    {problem.Mname}
                  </option>
                ))}
              </select>
            </div>

            {selectedDiagnosis && (
              <div className="diagnosis-results">
                <table className="diagnosis-table">
                  <thead>
                    <tr>
                      <th>Cat Name</th>
                      <th>Health Condition</th>
                      <th>Feeding Interval</th>
                      <th>Feeding Portion</th>
                      <th>Diet Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diagnosisPlans.length === 0 ? (
                      <tr>
                        <td colSpan="5">No cats found with this condition or no diet plans set.</td>
                      </tr>
                    ) : (
                      diagnosisPlans.map((plan, index) => (
                        <tr key={index}>
                          <td>{plan.Cat_Name}</td>
                          <td>{plan.Diagnosis}</td>
                          <td>{plan.feeding_interval ? `${plan.feeding_interval} meals/day` : '-'}</td>
                          <td>{plan.feeding_portion ? `${plan.feeding_portion}g` : '-'}</td>
                          <td>{plan.Diet_Description || '-'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="diagnosis-section">
            <h2 className="section-title">Health Condition By Age</h2>
            
            <div className="diagnosis-results">
              <table className="diagnosis-table">
                <thead>
                  <tr>
                    <th>Age</th>
                    <th>Condition Name</th>
                    <th>Cases Count</th>
                  </tr>
                </thead>
                <tbody>
                  {conditionsByAge.length === 0 ? (
                    <tr>
                      <td colSpan="3">No health condition data available.</td>
                    </tr>
                  ) : (
                    conditionsByAge.map((row, index) => (
                      <tr key={index}>
                        <td>{row.age || '-'}</td>
                        <td>{row.Condition_Name}</td>
                        <td>{row.Cases_Count}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
