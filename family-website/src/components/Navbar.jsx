import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle dropdown clicks for mobile, hover for desktop
  const handleDropdown = (index, event) => {
    event.preventDefault();
    if (window.innerWidth <= 768) {
      setActiveDropdown(activeDropdown === index ? null : index);
    } else {
      // Desktop: toggle on click
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  // Handle desktop hover
  const handleDropdownEnter = (index) => {
    if (window.innerWidth > 768) {
      setActiveDropdown(index);
    }
  };

  const handleDropdownLeave = () => {
    if (window.innerWidth > 768) {
      // Small delay to allow moving to dropdown content
      setTimeout(() => {
        setActiveDropdown(null);
      }, 200);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <button 
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span></span>
      </button>
      
      <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            HOME
          </Link>
        </li>
        
        <li 
          className="dropdown"
          onMouseEnter={() => handleDropdownEnter(0)}
          onMouseLeave={handleDropdownLeave}
        >
          <button 
            type="button"
            className="dropbtn"
            onClick={(e) => handleDropdown(0, e)}
          >
            MY BEAUTIFUL BABY GIRL
          </button>
          <div 
            className={`dropdown-content ${activeDropdown === 0 ? 'active' : ''}`}
            onMouseEnter={() => handleDropdownEnter(0)}
            onMouseLeave={handleDropdownLeave}
          >
            <Link
              to="/jordan/valentines-2025"
              className={location.pathname === '/jordan/valentines-2025' ? 'active' : ''}
              onClick={() => {
                setIsMenuOpen(false);
                setActiveDropdown(null);
              }}
            >
              Valentine's 2025
            </Link>
            <Link
              to="/jordan/anniversary-1month"
              className={location.pathname === '/jordan/anniversary-1month' ? 'active' : ''}
              onClick={() => {
                setIsMenuOpen(false);
                setActiveDropdown(null);
              }}
            >
              1 Month Anniversary
            </Link>
            <Link
              to="/jordan/anniversary-6mths"
              className={location.pathname === '/jordan/anniversary-6mths' ? 'active' : ''}
              onClick={() => {
                setIsMenuOpen(false);
                setActiveDropdown(null);
              }}
            >
              6 Month Anniversary
            </Link>
            <Link
              to="/jordan/christmas-2025"
              className={location.pathname === '/jordan/christmas-2025' ? 'active' : ''}
              onClick={() => {
                setIsMenuOpen(false);
                setActiveDropdown(null);
              }}
            >
              Christmas 2025 🎄
            </Link>
          </div>
        </li>
        
        <li 
          className="dropdown"
          onMouseEnter={() => handleDropdownEnter(1)}
          onMouseLeave={handleDropdownLeave}
        >
          <button 
            type="button"
            className="dropbtn"
            onClick={(e) => handleDropdown(1, e)}
          >
            ALWY
          </button>
          <div 
            className={`dropdown-content ${activeDropdown === 1 ? 'active' : ''}`}
            onMouseEnter={() => handleDropdownEnter(1)}
            onMouseLeave={handleDropdownLeave}
          >
            <Link
              to="/alexandria/birthday-2025"
              className={location.pathname === '/alexandria/birthday-2025' ? 'active' : ''}
              onClick={() => {
                setIsMenuOpen(false);
                setActiveDropdown(null);
              }}
            >
              Birthday 2025
            </Link>
          </div>
        </li>
        
        <li 
          className="dropdown"
          onMouseEnter={() => handleDropdownEnter(2)}
          onMouseLeave={handleDropdownLeave}
        >
          <button 
            type="button"
            className="dropbtn"
            onClick={(e) => handleDropdown(2, e)}
          >
            MOM & DAD
          </button>
          <div 
            className={`dropdown-content ${activeDropdown === 2 ? 'active' : ''}`}
            onMouseEnter={() => handleDropdownEnter(2)}
            onMouseLeave={handleDropdownLeave}
          >
            <Link
              to="/parents/moving-home-2025"
              className={location.pathname === '/parents/moving-home-2025' ? 'active' : ''}
              onClick={() => {
                setIsMenuOpen(false);
                setActiveDropdown(null);
              }}
            >
              Moving Home 2025
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 