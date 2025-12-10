import { useState, useEffect } from 'react';
import AddHealthProblem from '../components/AddHealthProblem';
import AddNewFood from '../components/AddNewFood';
import EditDietPlan from '../components/EditDietPlan';
import './ViewCatProfile.css';

function ViewCatProfile({ onNavigate, cat }) {
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showDietModal, setShowDietModal] = useState(false);

  // Cat data state
  const [catInfo, setCatInfo] = useState(null);
  const [healthProblems, setHealthProblems] = useState([]);
  const [dietPlans, setDietPlans] = useState([]);
  const [feedingHistory, setFeedingHistory] = useState([]);
  const [foodCache, setFoodCache] = useState({}); // Cache food details by fid
  const [nutritionalIntake, setNutritionalIntake] = useState(null); // Average daily nutritional intake

  // Feeding entry form state
  const [feedDate, setFeedDate] = useState('');
  const [feedTime, setFeedTime] = useState('');
  const [foodSearch, setFoodSearch] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodResults, setFoodResults] = useState([]);
  const [feedingError, setFeedingError] = useState('');

  const uid = cat?.uid || localStorage.getItem('uid');
  const cname = cat?.name;

  // Fetch nutritional intake
  const fetchNutritionalIntake = async () => {
    try {
      const response = await fetch(`http://localhost:3000/temp/nutritional-intake?uid=${uid}&cname=${encodeURIComponent(cname)}`);
      const data = await response.json();
      if (response.ok && data && data.length > 0) {
        setNutritionalIntake(data[0]);
      } else {
        setNutritionalIntake(null);
      }
    } catch (e) {
      console.error('Failed to fetch nutritional intake:', e);
    }
  };

  // Fetch food details by ID and cache them
  const fetchFoodDetails = async (fid) => {
    if (foodCache[fid]) return foodCache[fid]; // Already cached
    try {
      const response = await fetch(`http://localhost:3000/temp/food/get-by-id?fid=${fid}`);
      const data = await response.json();
      if (response.ok && data) {
        setFoodCache(prev => ({ ...prev, [fid]: data }));
        return data;
      }
    } catch (e) {
      console.error('Failed to fetch food details:', e);
    }
    return null;
  };

  // Fetch all food details for feeding history
  const fetchAllFoodDetails = async (feeds) => {
    const uniqueFids = [...new Set(feeds.map(f => f.fid))];
    for (const fid of uniqueFids) {
      if (!foodCache[fid]) {
        await fetchFoodDetails(fid);
      }
    }
  };

  // Fetch cat details on load
  useEffect(() => {
    if (!uid || !cname) return;

    const fetchCatData = async () => {
      try {
        // Fetch cat info
        const catResponse = await fetch(`http://localhost:3000/temp/cat/get?uid=${uid}&name=${cname}`);
        const catData = await catResponse.json();
        if (catResponse.ok) setCatInfo(catData);

        // Fetch health problems
        const problemsResponse = await fetch(`http://localhost:3000/temp/cat-problem/list?uid=${uid}&cname=${cname}`);
        const problemsData = await problemsResponse.json();
        if (problemsResponse.ok) setHealthProblems(problemsData);

        // Fetch diet plans
        const dietResponse = await fetch(`http://localhost:3000/temp/diet-plan/list?uid=${uid}&cname=${cname}`);
        const dietData = await dietResponse.json();
        if (dietResponse.ok) setDietPlans(dietData);

        // Fetch feeding history
        const feedsResponse = await fetch(`http://localhost:3000/temp/feeds/list?uid=${uid}&cname=${cname}`);
        const feedsData = await feedsResponse.json();
        if (feedsResponse.ok) {
          setFeedingHistory(feedsData);
          // Fetch food details for all feeds
          await fetchAllFoodDetails(feedsData);
        }

        // Fetch nutritional intake
        await fetchNutritionalIntake();
      } catch (e) {
        console.error('Failed to fetch cat data:', e);
      }
    };

    fetchCatData();
  }, [uid, cname]);

  // Search for food by name
  const handleFoodSearch = async () => {
    if (!foodSearch) return;
    try {
      const response = await fetch(`http://localhost:3000/temp/food/get-by-name?name=${encodeURIComponent(foodSearch)}`);
      const data = await response.json();
      if (response.ok) {
        setFoodResults(Array.isArray(data) ? data : [data].filter(Boolean));
      }
    } catch (e) {
      console.error('Failed to search food:', e);
    }
  };

  // Select a food from search results
  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setFoodResults([]); // Hide results after selection
  };

  // Save feeding entry
  const handleSaveFeedingEntry = async () => {
    setFeedingError('');

    // Validation
    if (!feedDate || !feedTime || !selectedFood) {
      setFeedingError('There is missing content.');
      return;
    }

    // Validate date format (YYYY-MM-DD) with valid month and day ranges
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!dateRegex.test(feedDate)) {
      setFeedingError('Invalid entry. Date must be YYYY-MM-DD (e.g., 2024-12-10)');
      return;
    }

    // Validate time format (HH:MM:SS) with valid hour, minute, second ranges
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timeRegex.test(feedTime)) {
      setFeedingError('Invalid entry. Time must be HH:MM:SS (e.g., 14:30:00)');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/temp/feeds/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: parseInt(uid),
          cname: cname,
          fid: selectedFood.fid,
          feed_date: feedDate,
          feed_time: feedTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFeedingError(data.error || 'Failed to save feeding entry');
        return;
      }

      // Cache the selected food details
      setFoodCache(prev => ({ ...prev, [selectedFood.fid]: selectedFood }));

      // Refresh feeding history
      const feedsResponse = await fetch(`http://localhost:3000/temp/feeds/list?uid=${uid}&cname=${cname}`);
      const feedsData = await feedsResponse.json();
      if (feedsResponse.ok) {
        setFeedingHistory(feedsData);
        await fetchAllFoodDetails(feedsData);
      }

      // Refresh nutritional intake
      await fetchNutritionalIntake();

      // Clear form
      setFeedDate('');
      setFeedTime('');
      setFoodSearch('');
      setSelectedFood(null);
      setFoodResults([]);
    } catch (e) {
      setFeedingError('Unable to connect to server');
      console.error('Failed to save feeding entry:', e);
    }
  };

  // Delete feeding entry
  const handleDeleteFeedingEntry = async (entry) => {
    try {
      const response = await fetch('http://localhost:3000/temp/feeds/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: parseInt(uid),
          cname: cname,
          fid: entry.fid,
          feed_date: entry.feed_date?.split('T')[0],
          feed_time: entry.feed_time,
        }),
      });

      if (response.ok) {
        // Refresh feeding history
        const feedsResponse = await fetch(`http://localhost:3000/temp/feeds/list?uid=${uid}&cname=${cname}`);
        const feedsData = await feedsResponse.json();
        if (feedsResponse.ok) setFeedingHistory(feedsData);

        // Refresh nutritional intake
        await fetchNutritionalIntake();
      }
    } catch (e) {
      console.error('Failed to delete feeding entry:', e);
    }
  };

  // Delete health problem
  const handleDeleteHealthProblem = async (pname) => {
    try {
      const response = await fetch('http://localhost:3000/temp/cat-problem/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: parseInt(uid),
          cname: cname,
          pname: pname,
        }),
      });

      if (response.ok) {
        refreshHealthProblems();
      }
    } catch (e) {
      console.error('Failed to delete health problem:', e);
    }
  };

  // Refresh data after modal closes
  const refreshHealthProblems = async () => {
    const response = await fetch(`http://localhost:3000/temp/cat-problem/list?uid=${uid}&cname=${cname}`);
    const data = await response.json();
    if (response.ok) setHealthProblems(data);
  };

  const refreshDietPlans = async () => {
    const response = await fetch(`http://localhost:3000/temp/diet-plan/list?uid=${uid}&cname=${cname}`);
    const data = await response.json();
    if (response.ok) setDietPlans(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('uid');
    onNavigate('signin');
  };

  if (!catInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cat-profile-page">
      <header className="header">
        <button className="back-button" onClick={() => onNavigate('homepage')}>
          Back
        </button>
        <h1 className="header-logo">MewMonitor</h1>
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </header>

      <div className="profile-content">
        <div className="profile-box">
          <h2 className="cat-name">{catInfo.name}</h2>
          <p className="cat-info">
            {catInfo.age ? `${catInfo.age} years` : ''} 
            {catInfo.breed ? ` - ${catInfo.breed}` : ''} 
            {catInfo.weight ? ` - ${catInfo.weight}lbs` : ''} 
            {catInfo.gender ? ` - ${catInfo.gender === 'M' ? 'Male' : 'Female'}` : ''}
          </p>

          <section className="profile-section">
            <h3 className="section-title">Health Problems</h3>
            {healthProblems.length === 0 ? (
              <p className="section-text">No health problems recorded.</p>
            ) : (
              healthProblems.map((problem, index) => (
                <div className="health-tag" key={index}>
                  <span className="health-tag-bold">{problem.pname}</span> - {problem.severity || 'Unknown'}
                  <button 
                    className="delete-health-btn"
                    onClick={() => handleDeleteHealthProblem(problem.pname)}
                    style={{
                      marginLeft: '10px',
                      background: 'none',
                      border: 'none',
                      color: 'red',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
            <button className="action-button" onClick={() => setShowHealthModal(true)}>
              Add health Problem
            </button>
          </section>

          <section className="profile-section">
            <h3 className="section-title">Diet Plan</h3>
            {dietPlans.length === 0 ? (
              <p className="section-text">No diet plan set.</p>
            ) : (
              dietPlans.map((plan, index) => (
                <p className="section-text" key={index}>
                  {plan.feeding_interval} meals per day - {plan.feeding_portion}g per meal<br/>
                  {plan.description && <><strong>Notes:</strong> {plan.description}</>}
                </p>
              ))
            )}
            <button className="action-button" onClick={() => setShowDietModal(true)}>
              Edit diet plan
            </button>
          </section>

          <section className="profile-section">
            <h3 className="section-title">Add feeding entry</h3>
            
            {feedingError && <p style={{ color: 'red', marginBottom: '10px' }}>{feedingError}</p>}

            <div className="form-group">
              <label className="form-label">Date (YYYY-MM-DD)</label>
              <input 
                type="text" 
                className="form-input" 
                value={feedDate}
                onChange={(e) => setFeedDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time (HH:MM:SS)</label>
              <input 
                type="text" 
                className="form-input" 
                value={feedTime}
                onChange={(e) => setFeedTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Food (search by name)</label>
              <input 
                type="text" 
                className="form-input" 
                value={foodSearch}
                onChange={(e) => setFoodSearch(e.target.value)}
              />
              <button className="action-button small" onClick={handleFoodSearch}>
                Search
              </button>
              
              {/* Selected food indicator */}
              {selectedFood && (
                <p style={{ color: 'green', marginTop: '8px', fontWeight: '500' }}>
                  Selected food: {selectedFood.brand ? `${selectedFood.brand} - ` : ''}{selectedFood.name}
                </p>
              )}

              {/* Food search results */}
              {foodResults.length > 0 && (
                <div style={{ marginTop: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                  {foodResults.map((food) => (
                    <div 
                      key={food.fid}
                      style={{ 
                        padding: '8px 12px', 
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee',
                        transition: 'background-color 0.2s'
                      }}
                      onClick={() => handleSelectFood(food)}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      {food.brand ? `${food.brand} - ` : ''}{food.name} {food.type ? `(${food.type})` : ''}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="action-button small" onClick={() => setShowFoodModal(true)}>
              Food not listed? Add new food to catalog
            </button>

            <button className="save-entry-button" onClick={handleSaveFeedingEntry}>
              Save feeding entry
            </button>
          </section>

          <section className="profile-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 className="section-title">Feeding History</h3>
              <div style={{ textAlign: 'right', fontSize: '14px' }}>
                <strong>Avg Daily Intake:</strong>
                {nutritionalIntake ? (
                  <span style={{ marginLeft: '10px' }}>
                    Calories: {Number(nutritionalIntake.Avg_Daily_Calories).toFixed(1)} | 
                    Carbs: {Number(nutritionalIntake.Avg_Daily_Carbs).toFixed(1)}g | 
                    Protein: {Number(nutritionalIntake.Avg_Daily_Protein).toFixed(1)}g | 
                    Fat: {Number(nutritionalIntake.Avg_Daily_Fat).toFixed(1)}g
                  </span>
                ) : (
                  <span style={{ marginLeft: '10px', color: '#888' }}>No data</span>
                )}
              </div>
            </div>
            
            <table className="feeding-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Brand</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Calories</th>
                  <th>Carbs</th>
                  <th>Protein</th>
                  <th>Fat</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {feedingHistory.length === 0 ? (
                  <tr><td colSpan="10">No feeding history yet.</td></tr>
                ) : (
                  feedingHistory.map((entry, index) => {
                    const food = foodCache[entry.fid];
                    return (
                      <tr key={index}>
                        <td>{entry.feed_date?.split('T')[0]}</td>
                        <td>{entry.feed_time}</td>
                        <td>{food?.brand || '-'}</td>
                        <td>{food?.name || '-'}</td>
                        <td>{food?.type || '-'}</td>
                        <td>{food?.calories || '-'}</td>
                        <td>{food?.carbs || '-'}</td>
                        <td>{food?.protein || '-'}</td>
                        <td>{food?.fat || '-'}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteFeedingEntry(entry)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'red',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              fontSize: '16px'
                            }}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </section>
        </div>
      </div>

      {showHealthModal && (
        <AddHealthProblem 
          onClose={() => { setShowHealthModal(false); refreshHealthProblems(); }} 
          uid={uid}
          cname={cname}
        />
      )}
      {showFoodModal && (
        <AddNewFood onClose={() => setShowFoodModal(false)} />
      )}
      {showDietModal && (
        <EditDietPlan 
          onClose={() => { setShowDietModal(false); refreshDietPlans(); }} 
          uid={uid}
          cname={cname}
          existingPlan={dietPlans[0]}
        />
      )}
    </div>
  );
}

export default ViewCatProfile;
