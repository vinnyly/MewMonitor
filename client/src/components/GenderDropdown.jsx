import { useState } from 'react';
import './GenderDropdown.css';

function GenderDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (gender) => {
    onChange(gender);
    setIsOpen(false);
  };

  return (
    <div className="gender-dropdown">
      <label className="dropdown-label">Gender</label>
      <div className="dropdown-container">
        <button 
          className="dropdown-button" 
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <span className={value ? "dropdown-text-selected" : "dropdown-text-placeholder"}>
            {value || 'Select Gender'}
          </span>
          <svg 
            className={`dropdown-chevron ${isOpen ? 'open' : ''}`}
            width="12" 
            height="5" 
            viewBox="0 0 12 5" 
            fill="none"
          >
            <path 
              opacity="0.8" 
              d="M0.700073 0.700073L5.70007 4.22054L10.7001 0.700073" 
              stroke="#C6D1C7" 
              strokeWidth="1.4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        {isOpen && (
          <div className="dropdown-list">
            <div 
              className="dropdown-item" 
              onClick={() => handleSelect('F')}
            >
              Female
            </div>
            <div 
              className="dropdown-item" 
              onClick={() => handleSelect('M')}
            >
              Male
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GenderDropdown;
