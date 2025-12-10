import { useState, useEffect } from 'react';
import GenderDropdown from '../components/GenderDropdown';
import './Homepage.css';

function Homepage({ onNavigate }) {
  const [gender, setGender] = useState('');
  const [cats, setCats] = useState([]);
  const [error, setError] = useState('');
  
  // Form state for adding a new cat
  const [newCatName, setNewCatName] = useState('');
  const [newCatBreed, setNewCatBreed] = useState('');
  const [newCatAge, setNewCatAge] = useState('');
  const [newCatWeight, setNewCatWeight] = useState('');

  const uid = localStorage.getItem('uid');

  // Fetch all cats for the logged-in user
  useEffect(() => {
    const fetchCats = async () => {
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

    if (uid) {
      fetchCats();
    }
  }, [uid]);

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
      const listResponse = await fetch(`http://localhost:3000/temp/cat/list?uid=${uid}`);
      const listData = await listResponse.json();
      if (listResponse.ok) {
        setCats(listData);
      }

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

  const handleViewProfile = (cat) => {
    // Pass cat data to the profile page
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
                    <span className="row-name">{cat.name}</span>
                    <span className="row-age">{cat.age || '-'}</span>
                    <span className="row-breed">{cat.breed || '-'}</span>
                    <button 
                      className="view-profile-button"
                      onClick={() => handleViewProfile(cat)}
                    >
                      View Profile
                    </button>
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
        </div>
      </div>
    </div>
  );
}

export default Homepage;
