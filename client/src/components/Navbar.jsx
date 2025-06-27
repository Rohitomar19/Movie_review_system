import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { removeUser } from '../features/user/userSlice';
import potato from '../images/potato.png';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuItems, setMenuItems] = React.useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Base menu items
  const baseMenuItems = [
    { name: 'Home', href: './' },
    { name: 'About', href: '/about' },
  ];

  // Handle scroll behavior
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        // Scrolling down and not at the top
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Handle theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const updateMenuItems = useCallback(() => {
    let updatedItems = [...baseMenuItems];
    
    if (user?.role === 'USER') {
      updatedItems.push({ name: 'Profile', href: './user' });
    } else if (user?.role === 'ADMIN') {
      updatedItems.push({ name: 'Admin', href: './admin' });
    }
    
    setMenuItems(updatedItems);
  }, [user]);

  useEffect(() => {
    updateMenuItems();
  }, [user, updateMenuItems]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleSignOut = () => {
    dispatch(removeUser());
    
    navigate('/', { replace: true });
  };

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-20 w-full transition-all duration-300 transform ${
        isVisible ? 'translate-y-6' : '-translate-y-full'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 navbar-container">
        <div className={`relative transition-colors duration-300 ${
          isDarkTheme 
            ? 'bg-gradient-to-r from-blue-gray-800 to-black text-white' 
            : 'bg-gradient-to-r from-red-100 to-gray-300 text-gray-900'
          } rounded-full mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8 shadow-lg dark:shadow-blue-gray-900`}>
          {/* Rest of the navbar content remains the same... */}
          {/* Logo and Brand */}
          <Link to="/" className="inline-flex items-center space-x-2 hover:opacity-90 transition-opacity duration-200">
            <img 
              className="w-12 h-12 drop-shadow-md" 
              src={potato} 
              alt="Rotten Potato Logo"
            />
            <span className={`font-bold text-lg ${isDarkTheme ? 'text-red-200' : 'text-red-900'}`}>
              Rotten Potato
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <ul className="inline-flex items-center space-x-8" role="menubar">
              {menuItems.map((item, idx) => (
                <li key={idx} role="none">
                  <Link
                    to={item.href}
                    className={`text-sm font-semibold transition-all duration-200 px-3 py-2 rounded-md
                      ${location.pathname === item.href 
                        ? isDarkTheme 
                          ? 'text-white bg-gradient-to-r from-red-800 to-red-900 shadow-md'
                          : 'text-red-900 bg-gradient-to-r from-red-100 to-red-200 shadow-md'
                        : isDarkTheme
                          ? 'text-red-300 hover:text-red-200 hover:bg-blue-gray-800'
                          : 'text-red-700 hover:text-red-800 hover:bg-red-50'
                      }`}
                    role="menuitem"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Auth Buttons and Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isDarkTheme 
                  ? 'text-yellow-300 hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <button
                type="button"
                onClick={handleSignOut}
                className={`transition-all duration-200 rounded-md ${
                  isDarkTheme
                    ? 'bg-gradient-to-r from-red-800 to-red-900 text-red-50 hover:from-red-700 hover:to-red-800'
                    : 'bg-gradient-to-r from-red-100 to-red-200 text-red-900 hover:from-red-200 hover:to-red-300'
                } px-4 py-2 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1`}
              >
                Sign Out
              </button>
            ) : (
              <div className="flex">
                <Link to="/Sign-in">
                  <button
                    type="button"
                    className={`transition-all duration-200 rounded-md ${
                      isDarkTheme
                        ? 'bg-gradient-to-r from-red-300 to-red-900 text-red-50 hover:from-red-600 hover:to-red-700'
                        : 'bg-gradient-to-r from-red-500 to-red-200 text-red-800 hover:from-red-200 hover:to-red-300'
                    } px-4 py-2 text-sm font-semibold focus:outline-none  focus:ring-red-500 focus:ring-offset-1`}
                  >
                    Sign In
                  </button>
                </Link>
                
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isDarkTheme 
                  ? 'text-yellow-300 hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              type="button"
              className={`p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                isDarkTheme
                  ? 'text-red-100 hover:bg-red-900'
                  : 'text-red-900 hover:bg-red-100'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`absolute top-full right-0 w-full mt-2 origin-top-right rounded-lg ${
              isDarkTheme
                ? 'bg-gradient-to-b from-gray-900 to-black'
                : 'bg-gradient-to-b from-red-50 to-white'
            } shadow-xl ring-1 ring-red-900/10 lg:hidden`}>
              <div className="px-4 py-3 divide-y divide-red-900/10">
                <div className="space-y-2">
                  {menuItems.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.href}
                      className={`block px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                        isDarkTheme
                          ? 'text-red-200 hover:bg-red-900/50'
                          : 'text-red-900 hover:bg-red-100'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-3 ">
                  {user ? (
                    <button
                      type="button"
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                        isDarkTheme
                          ? 'text-red-200 hover:bg-red-900/50'
                          : 'text-red-900 hover:bg-red-100'
                      }`}
                    >
                      Sign Out
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/Sign-in"
                        className={`block px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                          isDarkTheme
                            ? 'text-red-200 hover:bg-red-900/50'
                            : 'text-red-900 hover:bg-red-100'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;