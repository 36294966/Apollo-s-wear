import { ChevronDown, Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faShirt, faGem, faVest, faHouse } from '@fortawesome/free-solid-svg-icons';

import Logo from '../Assests/logo.jpg';

const Navbar = ({ onFilterSelect }) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [openDropdown, setOpenDropdown] = useState(null); // Dropdown state
  const [leaveTimeout, setLeaveTimeout] = useState(null); // Timeout for dropdown
  const [cartCount, setCartCount] = useState(0); // Cart count state
  const [showAuthModal, setShowAuthModal] = useState(false); // Auth modal state
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register
  const [user, setUser] = useState(null); // User state
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [authErrors, setAuthErrors] = useState({});
  const navigate = useNavigate();

  // Enhanced scroll to top function with immediate execution
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to update cart count
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart items in storage:', storedCart); // Debug log
    setCartCount(storedCart.length);
  };

  // Function to clear cart completely
  const clearCart = () => {
    console.log('Clearing cart...'); // Debug log
    localStorage.removeItem('cart');
    setCartCount(0);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
    console.log('Cart cleared, new count:', 0); // Debug log
  };

  useEffect(() => {
    // Initial cart count
    updateCartCount();
    
    // Check if user is logged in
    const checkUser = () => {
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      setUser(userData);
    };

    checkUser();
    
    // Listen for storage events (cart updates from other tabs)
    const handleStorageChange = () => {
      updateCartCount();
    };
    
    // Listen for custom cart update events
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    // Check for checkout completion on component mount
    const checkoutCompleted = localStorage.getItem('checkoutCompleted');
    if (checkoutCompleted === 'true') {
      console.log('Checkout completed detected, clearing cart...'); // Debug log
      clearCart();
      localStorage.removeItem('checkoutCompleted');
    }
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Listen for route changes to check for checkout success
  useEffect(() => {
    const handleRouteChange = () => {
      // Check if we're coming from a checkout page
      const checkoutCompleted = localStorage.getItem('checkoutCompleted');
      if (checkoutCompleted === 'true') {
        console.log('Route change detected, clearing cart...'); // Debug log
        clearCart();
        localStorage.removeItem('checkoutCompleted');
      }
    };

    // Check immediately on load
    handleRouteChange();
    
    // Set up interval to check for checkout completion
    const interval = setInterval(() => {
      const checkoutCompleted = localStorage.getItem('checkoutCompleted');
      if (checkoutCompleted === 'true') {
        console.log('Interval check - clearing cart...'); // Debug log
        clearCart();
        localStorage.removeItem('checkoutCompleted');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced navigation handler with immediate scroll to top
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    // Immediate scroll to top
    scrollToTop();
  };

  // Enhanced filter handler with immediate scroll to top
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
        'Cassual Shirts': '/shirts/cassual',
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
      // Immediate scroll to top
      scrollToTop();
    }
  };

  // Auth validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const errors = {};

    if (!authForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(authForm.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!authForm.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(authForm.password)) {
      errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
    }

    if (!isLogin) {
      if (!authForm.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (authForm.password !== authForm.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      if (!authForm.firstName.trim()) {
        errors.firstName = 'First name is required';
      }

      if (!authForm.lastName.trim()) {
        errors.lastName = 'Last name is required';
      }
    }

    setAuthErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to send email confirmation
  const sendEmailConfirmation = (userData) => {
    // In a real application, you would send an API request to your backend
    // For demo purposes, we'll simulate sending an email confirmation
    console.log('Sending email confirmation to:', userData.email);
    
    // Simulate email sending - in real app, this would be an API call
    const emailData = {
      to: userData.email,
      subject: 'Welcome to Sir Apollo Men Wear!',
      message: `
        Dear ${userData.firstName} ${userData.lastName},
        
        Welcome to Sir Apollo Men Wear! Your account has been successfully created.
        
        Thank you for joining our exclusive community of stylish gentlemen.
        
        Get ready to explore our premium collection of suits, shirts, accessories, and more!
        
        Best regards,
        The Sir Apollo Team
      `
    };
    
    // Store email confirmation in localStorage (for demo purposes)
    const emailConfirmations = JSON.parse(localStorage.getItem('emailConfirmations')) || [];
    emailConfirmations.push({
      ...emailData,
      timestamp: new Date().toISOString(),
      userId: userData.id
    });
    localStorage.setItem('emailConfirmations', JSON.stringify(emailConfirmations));
    
    return true;
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === authForm.email && u.password === authForm.password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setUser(user);
        setShowAuthModal(false);
        setAuthForm({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
        setAuthErrors({});
        alert('Login successful! Welcome back!');
      } else {
        setAuthErrors({ general: 'Invalid email or password' });
      }
    } else {
      // Register logic
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Check if user already exists
      if (users.find(u => u.email === authForm.email)) {
        setAuthErrors({ email: 'User with this email already exists' });
        return;
      }

      const newUser = {
        id: Date.now(),
        email: authForm.email,
        password: authForm.password,
        firstName: authForm.firstName,
        lastName: authForm.lastName,
        createdAt: new Date().toISOString(),
        emailVerified: false
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      // Send email confirmation
      const emailSent = sendEmailConfirmation(newUser);
      
      setUser(newUser);
      setShowAuthModal(false);
      setAuthForm({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
      setAuthErrors({});
      
      if (emailSent) {
        alert('Registration successful! A welcome email has been sent to your email address. Welcome to Sir Apollo Men Wear!');
      } else {
        alert('Registration successful! Welcome to Sir Apollo Men Wear!');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    alert('Logged out successfully!');
  };

  const handleAuthToggle = () => {
    setIsLogin(!isLogin);
    setAuthForm({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
    setAuthErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (authErrors[name]) {
      setAuthErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setAuthForm({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
    setAuthErrors({});
  };

  // Improved Jeans Icon SVG - Better design
  const JeansIcon = ({ className }) => (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Modern jeans/trousers design */}
      <path d="M5 4H19C19.5523 4 20 4.44772 20 5V9C20 9.55228 19.5523 10 19 10H5C4.44772 10 4 9.55228 4 9V5C4 4.44772 4.44772 4 5 4Z" />
      <path d="M7 10L6 20C6 20.5523 6.44772 21 7 21H9V10H7Z" />
      <path d="M17 10L18 20C18 20.5523 17.5523 21 17 21H15V10H17Z" />
      {/* Front pockets */}
      <path d="M8 6H10V8H8V6Z" />
      <path d="M14 6H16V8H14V6Z" />
      {/* Back pockets */}
      <path d="M9 16H11V18H9V16Z" />
      <path d="M13 16H15V18H13V16Z" />
      {/* Belt loops */}
      <path d="M7 4V3" />
      <path d="M9 4V3" />
      <path d="M12 4V3" />
      <path d="M15 4V3" />
      <path d="M17 4V3" />
    </svg>
  );

  const menuItems = [
    {
      title: 'Suits',
      icon: <FontAwesomeIcon icon={faUserTie} className="text-xl group-hover:text-yellow-200 transition-colors" />,
      dropdown: {
        Style: ['2 Piece Suits', '3 Piece Suits', 'Tuxedo & Dinner', 'Kaunda Suits'],
      },
    },
    {
      title: 'Shirts',
      icon: <FontAwesomeIcon icon={faShirt} className="text-xl group-hover:text-yellow-200 transition-colors" />,
      dropdown: { Style: ['Official Shirts', 'Cassual Shirts'] },
    },
    {
      title: 'Jeans',
      icon: <JeansIcon className="w-6 h-6 group-hover:text-yellow-200 transition-colors" />,
      dropdown: { Type: ['Jeans'] },
      page: '/jeans',
    },
    {
      title: 'Accessories',
      icon: <FontAwesomeIcon icon={faGem} className="text-xl group-hover:text-yellow-200 transition-colors" />,
      dropdown: { Items: ['Socks', 'Ties', 'Belt'] },
    },
    {
      title: 'Blazers & Jackets',
      icon: <FontAwesomeIcon icon={faVest} className="text-xl group-hover:text-yellow-200 transition-colors" />,
      dropdown: { Jackets: ['Leather Jacket'] },
    },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-3 py-2 flex justify-between items-center">
          {/* Logo - Made slightly bigger */}
          <img
            src={Logo}
            alt="Sir Apollo Men Wear Logo"
            className="h-14 w-14 md:h-18 md:w-18 rounded-full object-cover shadow-lg cursor-pointer transition-transform hover:scale-105"
            onClick={() => {
              navigate('/');
              scrollToTop();
            }}
          />

          {/* Desktop Menu - Increased spacing and size */}
          <div className="hidden md:flex items-center space-x-4 font-semibold text-base">
            <button
              onClick={() => {
                navigate('/');
                setIsOpen(false);
                scrollToTop();
              }}
              className="flex items-center group hover:text-yellow-200 transition px-3 py-2 rounded-lg hover:bg-blue-700"
            >
              <FontAwesomeIcon icon={faHouse} className="group-hover:-translate-x-0.5 transition-all text-lg" />
              <span className="ml-2">Home</span>
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
                  className="flex items-center space-x-2 group hover:text-yellow-200 transition px-3 py-2 rounded-lg hover:bg-blue-700"
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
                  <span className="text-base whitespace-nowrap">{item.title}</span>
                  {item.dropdown && (
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform ${openDropdown === item.title ? 'rotate-180' : ''}`} 
                    />
                  )}
                </button>

                {item.dropdown && openDropdown === item.title && (
                  <div className="absolute top-12 left-0 bg-white text-black shadow-xl rounded-lg p-4 grid gap-2 w-56 z-50 border border-blue-100">
                    {Object.entries(item.dropdown).map(([section, values]) => (
                      <div key={section}>
                        <p className="text-blue-700 font-bold text-base mb-2 border-b border-blue-100 pb-1">{section}</p>
                        <div className="space-y-1">
                          {values.map((val) => (
                            <button
                              key={val}
                              onClick={() => handleFilter(item.title, val)}
                              className="w-full text-left px-3 py-2.5 text-base rounded-lg hover:bg-blue-50 transition-all flex items-center group/item"
                            >
                              <span className="group-hover/item:translate-x-1 transition-transform">{val}</span>
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-4 w-4 ml-2 opacity-0 group-hover/item:opacity-100 transition-opacity" 
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

            {/* User Account / Login */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 group hover:text-yellow-200 transition px-3 py-2 rounded-lg hover:bg-blue-700">
                  <div className="transition-transform group-hover:scale-110">
                    <User size={20} />
                  </div>
                  <span className="text-base whitespace-nowrap">Hi, {user.firstName}</span>
                  <ChevronDown size={14} />
                </button>
                <div className="absolute top-12 right-0 bg-white text-black shadow-xl rounded-lg p-3 w-48 z-50 border border-blue-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
                    {user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2.5 text-base rounded-lg hover:bg-red-50 text-red-600 transition-all flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center space-x-2 group hover:text-yellow-200 transition px-3 py-2 rounded-lg hover:bg-blue-700"
              >
                <div className="transition-transform group-hover:scale-110">
                  <User size={20} />
                </div>
                <span className="text-base">Login</span>
              </button>
            )}

            {/* Cart */}
            <div
              className="flex items-center space-x-2 hover:text-yellow-200 cursor-pointer relative group px-3 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => {
                navigate('/cart');
                setIsOpen(false);
                scrollToTop();
              }}
            >
              <div className="transition-transform group-hover:scale-110">
                <ShoppingCart size={20} />
              </div>
              <span className="text-base">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs group-hover:animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
          </div>

          {/* Mobile Menu & Cart */}
          <div className="md:hidden flex items-center space-x-4">
            {/* User Greeting for Mobile - Now visible when logged in */}
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-blue-700 px-3 py-1.5 rounded-lg">
                  <User size={16} className="text-yellow-200" />
                  <span className="text-sm font-semibold text-white whitespace-nowrap">
                    Hi, {user.firstName}
                  </span>
                </div>
                <button 
                  className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to logout?')) {
                      handleLogout();
                    }
                  }}
                >
                  <LogOut size={18} className="text-red-200" />
                </button>
              </div>
            ) : (
              <button 
                className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
                onClick={() => setShowAuthModal(true)}
              >
                <User size={20} />
              </button>
            )}

            {/* Cart for Mobile */}
            <div
              className="relative cursor-pointer hover:text-yellow-200 p-2 rounded-lg hover:bg-blue-700"
              onClick={() => {
                navigate('/cart');
                setIsOpen(false);
                scrollToTop();
              }}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 bg-blue-600 space-y-2 text-lg">
            <button
              onClick={() => {
                navigate('/');
                setIsOpen(false);
                scrollToTop();
              }}
              className="flex items-center space-x-3 py-3 w-full hover:bg-blue-700 rounded-lg px-3 transition-colors"
            >
              <FontAwesomeIcon icon={faHouse} />
              <span>Home</span>
            </button>

            {menuItems.map((item) => (
              <div key={item.title} className="space-y-1">
                <button
                  className="flex justify-between items-center w-full py-3 px-3 hover:bg-blue-700 rounded-lg transition-colors"
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
                    <span>{item.title}</span>
                  </div>
                  {item.dropdown && (
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${openDropdown === item.title ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {item.dropdown && openDropdown === item.title && (
                  <div className="ml-6 space-y-1 mt-1 border-l-2 border-blue-500 pl-3">
                    {Object.entries(item.dropdown).map(([section, values]) => (
                      <div key={section}>
                        <p className="text-yellow-200 font-bold text-base">{section}</p>
                        <div className="space-y-1 mt-1">
                          {values.map((val) => (
                            <button
                              key={val}
                              onClick={() => {
                                handleFilter(item.title, val);
                              }}
                              className="w-full text-left px-3 py-2.5 hover:bg-blue-700 rounded-lg flex items-center transition-colors group/item"
                            >
                              <span className="group-hover/item:translate-x-1 transition-transform text-base">{val}</span>
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-4 w-4 ml-2 opacity-0 group-hover/item:opacity-100 transition-opacity" 
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

            {/* Mobile Login/Logout - Only show if not already showing user greeting */}
            {!user && (
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 py-3 w-full hover:bg-blue-700 rounded-lg px-3 transition-colors"
              >
                <User size={18} />
                <span className="text-base">Login / Register</span>
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button - Cross Icon */}
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={24} className="text-gray-500 hover:text-gray-700" />
            </button>

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {isLogin ? 'Welcome Back!' : 'Join Sir Apollo Men Wear'}
                </h2>
                <p className="text-gray-600 mt-3 text-lg">
                  {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
                </p>
              </div>

              {/* Error Message */}
              {authErrors.general && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-base">
                  {authErrors.general}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={authForm.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${
                          authErrors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John"
                      />
                      {authErrors.firstName && (
                        <p className="text-red-500 text-base mt-2">{authErrors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={authForm.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${
                          authErrors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Doe"
                      />
                      {authErrors.lastName && (
                        <p className="text-red-500 text-base mt-2">{authErrors.lastName}</p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={authForm.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${
                      authErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {authErrors.email && (
                    <p className="text-red-500 text-base mt-2">{authErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={authForm.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${
                      authErrors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                  />
                  {authErrors.password && (
                    <p className="text-red-500 text-base mt-2">{authErrors.password}</p>
                  )}
                  {!isLogin && (
                    <p className="text-gray-500 text-sm mt-2">
                      Must be at least 8 characters with uppercase, lowercase, and numbers
                    </p>
                  )}
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={authForm.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${
                        authErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    {authErrors.confirmPassword && (
                      <p className="text-red-500 text-base mt-2">{authErrors.confirmPassword}</p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {/* Toggle between login/register */}
              <div className="text-center mt-6">
                <p className="text-gray-600 text-base">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={handleAuthToggle}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-base"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
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