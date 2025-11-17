import { ChevronDown, Menu, X, ShoppingCart, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faShirt, faGem, faVest, faHouse, faSignInAlt, faUserPlus, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

import Logo from '../Assests/logo.jpg';

const Navbar = ({ onFilterSelect }) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [openDropdown, setOpenDropdown] = useState(null); // Dropdown state
  const [leaveTimeout, setLeaveTimeout] = useState(null); // Timeout for dropdown
  const [cartCount, setCartCount] = useState(0); // Cart count state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
  const [userName, setUserName] = useState(''); // User name state
  const [showAuthModal, setShowAuthModal] = useState(false); // Auth modal state
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign in/sign up
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on component mount
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.firstName);
    }

    // Update cart count when there is a change in cart
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(storedCart.length);
    };
    updateCartCount();
    
    // Listen for custom event when cart is cleared after checkout
    const handleCartCleared = () => {
      setCartCount(0);
    };
    
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartCleared', handleCartCleared);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartCleared', handleCartCleared);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleFilter = (category, value) => {
    // Handle category filtering and navigation
    onFilterSelect?.(category, value);
    setIsOpen(false); // Close the mobile menu when an item is selected
    setOpenDropdown(null);

    const routeMap = {
      Suits: {
        '2 Piece Suits': '/suits/2piecesuits',
        '3 Piece Suits': '/suits/3piecesuits',
        'Tuxedo & Dinner': '/suits/tuxedo',
        'Kaunda Suits': '/suits/kaunda',
      },
      Accessories: {
        'Belt': '/accessories/belt',
        'Ties': '/accessories/ties',
        'Socks': '/accessories/socks',
      },
      Shirts: {
        'Official Shirts': '/shirts/official',
        'Casual Shirts': '/shirts/casual',
      },
      'Blazers & Jackets': {
        'Leather Jacket': '/jackets/leather',
      },
      Jeans: {
        'Jeans': '/jeans',
      },
    };

    const path = routeMap[category]?.[value];
    if (path) {
      navigate(path);
      // Scroll to top after navigation
      setTimeout(scrollToTop, 100);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    // Scroll to top after navigation
    setTimeout(scrollToTop, 100);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Sign Up logic
      if (authForm.password !== authForm.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      const user = {
        email: authForm.email,
        password: authForm.password,
        firstName: authForm.firstName,
        lastName: authForm.lastName,
        id: Date.now()
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoggedIn(true);
      setUserName(user.firstName);
      setShowAuthModal(false);
      setAuthForm({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
      alert('Account created successfully!');
    } else {
      // Sign In logic
      const storedUser = JSON.parse(localStorage.getItem('user'));
      
      if (storedUser && storedUser.email === authForm.email && storedUser.password === authForm.password) {
        setIsLoggedIn(true);
        setUserName(storedUser.firstName);
        setShowAuthModal(false);
        setAuthForm({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
        alert('Signed in successfully!');
      } else {
        alert('Invalid email or password!');
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('user');
    setOpenDropdown(null);
    alert('Signed out successfully!');
  };

  const handleAuthClick = () => {
    setShowAuthModal(true);
    setIsSignUp(false);
    setAuthForm({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
  };

  // Custom Jeans Icon SVG
  const JeansIcon = ({ className }) => (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
    >
      {/* Jeans/Trousers shape */}
      <path d="M6 3H18C18.5 3 19 3.5 19 4V8C19 8.5 18.5 9 18 9H6C5.5 9 5 8.5 5 8V4C5 3.5 5.5 3 6 3Z" />
      <path d="M7 9L5 20C5 20.5 5.5 21 6 21H9V9H7Z" />
      <path d="M17 9L19 20C19 20.5 18.5 21 18 21H15V9H17Z" />
      {/* Back pocket detail */}
      <path d="M8 12H10V14H8V12Z" />
      <path d="M14 12H16V14H14V12Z" />
      {/* Stitching lines */}
      <path d="M12 5V7" strokeWidth="0.3" />
      <path d="M10 5V7" strokeWidth="0.3" />
      <path d="M14 5V7" strokeWidth="0.3" />
    </svg>
  );

  const menuItems = [
    {
      title: 'Suits',
      icon: <FontAwesomeIcon icon={faUserTie} className="text-lg group-hover:text-yellow-200 transition-colors" />,
      dropdown: {
        Style: ['2 Piece Suits', '3 Piece Suits', 'Tuxedo & Dinner', 'Kaunda Suits'],
      },
    },
    {
      title: 'Shirts',
      icon: <FontAwesomeIcon icon={faShirt} className="text-lg group-hover:text-yellow-200 transition-colors" />,
      dropdown: { Style: ['Official Shirts', 'Cassual Shirts'] },
    },
    {
      title: 'Jeans',
      icon: <JeansIcon className="w-5 h-5 group-hover:text-yellow-200 transition-colors" />,
      dropdown: { Type: ['Jeans'] },
      page: '/jeans',
    },
    {
      title: 'Accessories',
      icon: <FontAwesomeIcon icon={faGem} className="text-lg group-hover:text-yellow-200 transition-colors" />,
      dropdown: { Items: ['Socks', 'Ties', 'Belt'] },
    },
    {
      title: 'Blazers & Jackets',
      icon: <FontAwesomeIcon icon={faVest} className="text-lg group-hover:text-yellow-200 transition-colors" />,
      dropdown: { Jackets: ['Leather Jacket'] },
    },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo on the left */}
          <div className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-14 w-14 md:h-20 md:w-20 rounded-full object-cover shadow-lg cursor-pointer transition-transform hover:scale-105 border-2 border-white"
              onClick={() => {
                navigate('/');
                scrollToTop();
              }}
            />
          </div>

          {/* Menu Items moved to the right */}
          <div className="flex items-center flex-1 justify-end">
            {/* Desktop Menu Items - Moved to right side */}
            <div className="hidden md:flex items-center font-semibold gap-2 mr-6">
              <button
                onClick={() => {
                  navigate('/');
                  setIsOpen(false);
                  scrollToTop();
                }}
                className="flex items-center group hover:text-yellow-200 transition px-3 py-2 rounded-lg hover:bg-blue-500 min-w-[70px] justify-center"
              >
                <FontAwesomeIcon icon={faHouse} className="text-lg group-hover:scale-110 transition-transform" />
                <span className="ml-2 text-sm">Home</span>
              </button>

              {menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                  onMouseEnter={() => {
                    clearTimeout(leaveTimeout);
                    setOpenDropdown(item.title);
                  }}
                  onMouseLeave={() => {
                    setLeaveTimeout(setTimeout(() => setOpenDropdown(null), 200));
                  }}
                >
                  <button
                    className="flex items-center space-x-1 group hover:text-yellow-200 transition px-3 py-2 rounded-lg hover:bg-blue-500 min-w-[80px] justify-center"
                    onClick={() => {
                      if (item.page) {
                        handleNavigation(item.page);
                      } else {
                        setOpenDropdown(openDropdown === item.title ? null : item.title);
                      }
                    }}
                  >
                    <div className="transition-transform group-hover:scale-110">
                      {item.icon}
                    </div>
                    <span className="text-sm ml-1">{item.title}</span>
                    {item.dropdown && (
                      <ChevronDown 
                        size={12} 
                        className={`transition-transform ${openDropdown === item.title ? 'rotate-180' : ''}`} 
                      />
                    )}
                  </button>

                  {item.dropdown && openDropdown === item.title && (
                    <div className="absolute top-12 left-0 bg-white text-black shadow-xl rounded-md p-3 grid gap-1 w-52 z-50 border border-blue-100">
                      {Object.entries(item.dropdown).map(([section, values]) => (
                        <div key={section}>
                          <p className="text-blue-700 font-bold text-sm mb-1 border-b border-blue-100 pb-1">{section}</p>
                          <div className="space-y-1">
                            {values.map((val) => (
                              <button
                                key={val}
                                onClick={() => handleFilter(item.title, val)}
                                className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-blue-50 transition-all flex items-center group/item"
                              >
                                <span className="group-hover/item:translate-x-1 transition-transform">{val}</span>
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-3 w-3 ml-2 opacity-0 group-hover/item:opacity-100 transition-opacity" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side - Cart & User */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <div
                className="flex items-center space-x-2 hover:text-yellow-200 cursor-pointer relative group px-3 py-2 rounded-lg hover:bg-blue-500 transition-all"
                onClick={() => {
                  navigate('/cart');
                  setIsOpen(false);
                  scrollToTop();
                }}
              >
                <div className="transition-transform group-hover:scale-110">
                  <ShoppingCart size={20} />
                </div>
                <span className="text-sm hidden sm:block">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs group-hover:animate-pulse border border-white">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* User Authentication */}
              <div className="relative group">
                {isLoggedIn ? (
                  <button
                    className="flex items-center space-x-2 group hover:text-yellow-200 transition px-3 py-2 rounded-lg hover:bg-blue-500"
                    onClick={() => setOpenDropdown(openDropdown === 'user' ? null : 'user')}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 border-2 border-white">
                        <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
                      </div>
                    </div>
                    <span className="text-sm hidden lg:block">Hi, {userName}</span>
                    <ChevronDown 
                      size={12} 
                      className={`transition-transform ${openDropdown === 'user' ? 'rotate-180' : ''}`} 
                    />
                  </button>
                ) : (
                  <button
                    className="flex items-center space-x-2 group hover:text-yellow-200 transition px-3 py-2 rounded-lg hover:bg-blue-500"
                    onClick={handleAuthClick}
                  >
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 border-2 border-white">
                      <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
                    </div>
                    <span className="text-sm hidden lg:block">Sign In</span>
                  </button>
                )}

                {isLoggedIn && openDropdown === 'user' && (
                  <div className="absolute top-12 right-0 bg-white text-black shadow-xl rounded-md p-2 w-48 z-50 border border-blue-100">
                    <div className="px-3 py-2 text-sm text-gray-600 border-b border-blue-100 flex items-center">
                      <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center mr-2">
                        <FontAwesomeIcon icon={faUser} className="text-white text-xs" />
                      </div>
                      Hi, {userName}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-red-50 transition-all flex items-center group/item text-red-600"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-sm" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-blue-500 rounded-lg transition-colors ml-1"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 bg-blue-600 space-y-2 text-base border-t border-blue-500">
            <button
              onClick={() => {
                navigate('/');
                setIsOpen(false);
                scrollToTop();
              }}
              className="flex items-center space-x-3 py-3 w-full hover:bg-blue-500 rounded-lg px-3 transition-colors border-b border-blue-500"
            >
              <FontAwesomeIcon icon={faHouse} className="text-lg" />
              <span className="font-semibold">Home</span>
            </button>

            {menuItems.map((item) => (
              <div key={item.title} className="space-y-1">
                <button
                  className="flex justify-between items-center w-full py-3 px-3 hover:bg-blue-500 rounded-lg transition-colors"
                  onClick={() => {
                    if (item.page) {
                      handleNavigation(item.page);
                    } else {
                      setOpenDropdown(openDropdown === item.title ? null : item.title);
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="transition-transform hover:scale-110">
                      {item.icon}
                    </div>
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  {item.dropdown && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${openDropdown === item.title ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {item.dropdown && openDropdown === item.title && (
                  <div className="ml-8 space-y-1 mt-1 border-l-2 border-blue-400 pl-4">
                    {Object.entries(item.dropdown).map(([section, values]) => (
                      <div key={section}>
                        <p className="text-yellow-200 font-bold text-sm mt-2">{section}</p>
                        <div className="space-y-1 mt-1">
                          {values.map((val) => (
                            <button
                              key={val}
                              onClick={() => {
                                handleFilter(item.title, val);
                              }}
                              className="w-full text-left px-3 py-2 hover:bg-blue-500 rounded-lg flex items-center transition-colors group/item"
                            >
                              <span className="group-hover/item:translate-x-1 transition-transform text-sm">{val}</span>
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-3 w-3 ml-2 opacity-0 group-hover/item:opacity-100 transition-opacity" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Auth Section */}
            {!isLoggedIn && (
              <button
                onClick={handleAuthClick}
                className="flex items-center space-x-3 py-3 w-full hover:bg-blue-500 rounded-lg px-3 transition-colors mt-2 border-t border-blue-500"
              >
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
                </div>
                <span className="font-semibold">Sign In / Sign Up</span>
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md my-auto transform transition-all">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-blue-100 mt-1">
                      {isSignUp ? 'Join our fashion community' : 'Sign in to your account'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-white hover:text-yellow-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAuth} className="p-6 space-y-4">
              {isSignUp && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={authForm.firstName}
                      onChange={(e) => setAuthForm({...authForm, firstName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={authForm.lastName}
                      onChange={(e) => setAuthForm({...authForm, lastName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={authForm.email}
                  onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={authForm.password}
                  onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={authForm.confirmPassword}
                    onChange={(e) => setAuthForm({...authForm, confirmPassword: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
              >
                <FontAwesomeIcon icon={isSignUp ? faUserPlus : faSignInAlt} className="text-sm" />
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              </button>
            </form>

            {/* Modal Footer */}
            <div className="px-6 pb-6">
              <div className="text-center">
                <p className="text-gray-600">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="ml-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <FontAwesomeIcon icon={isSignUp ? faSignInAlt : faUserPlus} className="text-sm" />
                    <span>{isSignUp ? 'Sign In' : 'Sign Up'}</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

