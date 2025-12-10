import { useState } from 'react'; //include useEffect later
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
  const [selectedCat, setSelectedCat] = useState(null); // Store selected cat data

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
      {currentPage === 'homepage' && <Homepage onNavigate={navigate} />}
      {currentPage === 'catprofile' && <ViewCatProfile onNavigate={navigate} cat={selectedCat} />}
    </div>
  );
}

export default App;
