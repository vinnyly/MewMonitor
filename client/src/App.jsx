import { useState, useEffect } from 'react';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import Homepage from './pages/Homepage';
import ViewCatProfile from './pages/ViewCatProfile';
import './App.css';

function App() {
  // Check if user is already logged in (uid exists in localStorage)
  const [currentPage, setCurrentPage] = useState(() => {
    const savedUid = localStorage.getItem('uid');
    return savedUid ? 'homepage' : 'signin';
  });
  const [selectedCat, setSelectedCat] = useState(null);
  const [medicinalProblems, setMedicinalProblems] = useState([]); // Cached medicinal problems

  // Fetch medicinal problems once when app loads (if user is logged in)
  useEffect(() => {
    const fetchMedicinalProblems = async () => {
      try {
        const response = await fetch('http://localhost:3000/catprofile/med-problem/list');
        const data = await response.json();
        if (response.ok) {
          setMedicinalProblems(data);
        }
      } catch (e) {
        console.error('Failed to fetch medicinal problems:', e);
      }
    };

    const uid = localStorage.getItem('uid');
    if (uid && (currentPage === 'homepage' || currentPage === 'catprofile')) {
      fetchMedicinalProblems();
    }
  }, [currentPage]);

  const navigate = (page, catData = null) => {
    if (catData) {
      setSelectedCat(catData);
    }
    setCurrentPage(page);
  };

  return (
    <div className="app">
      {currentPage === 'signin' && <SignIn onNavigate={navigate} />}
      {currentPage === 'signup' && <CreateAccount onNavigate={navigate} />}
      {currentPage === 'homepage' && (
        <Homepage 
          onNavigate={navigate} 
          medicinalProblems={medicinalProblems} 
        />
      )}
      {currentPage === 'catprofile' && (
        <ViewCatProfile 
          onNavigate={navigate} 
          cat={selectedCat} 
          medicinalProblems={medicinalProblems}
        />
      )}
    </div>
  );
}

export default App;
