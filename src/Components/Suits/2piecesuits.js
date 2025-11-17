import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ShoppingCart, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import TwoPiece1 from '../../Assests/Suits/twopiece1.jpg';
import TwoPiece2 from '../../Assests/Suits/twopiece2.jpg';
import TwoPiece3 from '../../Assests/Suits/twopiece3.jpg';
import TwoPiece4 from '../../Assests/Suits/twopiece4.jpg';
import TwoPiece5 from '../../Assests/Suits/twopiece5.jpg';
import TwoPiece6 from '../../Assests/Suits/twopiece6.jpg';
import TwoPiece7 from '../../Assests/Suits/twopiece7.jpg';
import TwoPiece8 from '../../Assests/Suits/twopiece8.jpg';
import TwoPiece9 from '../../Assests/Suits/twopiece9.jpg';

const TwoPieceSuits = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizeForSuit, setSelectedSizeForSuit] = useState({});
  const [showSizeError, setShowSizeError] = useState(false);
  const [errorSuitId, setErrorSuitId] = useState(null);
  const [lastSelectedItem, setLastSelectedItem] = useState(null);
  const [deselectionTimers, setDeselectionTimers] = useState({});

  const twoPieceSuits = [
    { id: 56, name: 'Executive Two-Piece Suit', price: 11000, description: 'A classic two-piece suit with a modern twist.', category: 'TwoPiece Suits', image: TwoPiece1, rating: 5 },
    { id: 57, name: 'Modern Classic Two-Piece Suit', price: 11000, description: 'Modern Classic Two-Piece suit.', category: 'TwoPiece Suits', image: TwoPiece2, rating: 5 },
    { id: 58, name: 'Slim Two-Piece Suit', price: 11000, description: 'Slim, modern two-piece.', category: 'TwoPiece Suits', image: TwoPiece3, rating: 5 },
    { id: 59, name: 'Heritage Two-Piece Suit', price: 11000, description: 'Heritage two-piece design.', category: 'TwoPiece Suits', image: TwoPiece4, rating: 5 },
    { id: 60, name: 'Super Classic Two-Piece Suit', price: 11000, description: 'Super Classic two-piece design.', category: 'TwoPiece Suits', image: TwoPiece5, rating: 5 },
    { id: 61, name: 'Modern Two Two-Piece Suit', price: 11000, description: 'Modern two-piece design.', category: 'TwoPiece Suits', image: TwoPiece7, rating: 5 },
    { id: 62, name: 'Premium Two-Piece Suit', price: 11000, description: 'Premium two-piece design.', category: 'TwoPiece Suits', image: TwoPiece8, rating: 5 },
    { id: 63, name: 'Elegant Two-Piece Suit', price: 11000, description: 'Elegant two-piece design.', category: 'TwoPiece Suits', image: TwoPiece9, rating: 5 },
  ];

  const sizes = ['44', '46', '48', '50', '52', '54', '56', '58', '60'];

  // Function to calculate cart total
  const cartTotal = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    return storedCart.reduce((sum, item) => sum + item.price, 0);
  };

  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(storedCart.length);
    };

    updateCart();
    window.addEventListener('storage', updateCart);
    return () => window.removeEventListener('storage', updateCart);
  }, []);

  // Auto-deselect size after 30 seconds of inactivity
  useEffect(() => {
    // Clear any existing timers
    Object.values(deselectionTimers).forEach(timer => clearTimeout(timer));
    
    const newTimers = {};
    
    // Set new timers for each selected size
    Object.keys(selectedSizeForSuit).forEach(itemId => {
      if (selectedSizeForSuit[itemId]) {
        newTimers[itemId] = setTimeout(() => {
          setSelectedSizeForSuit(prev => {
            const updated = {...prev};
            delete updated[itemId];
            return updated;
          });
        }, 30000); // 30 seconds
      }
    });
    
    setDeselectionTimers(newTimers);
    
    return () => {
      Object.values(newTimers).forEach(timer => clearTimeout(timer));
    };
  }, [selectedSizeForSuit]);

  // Function to render star ratings
  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  const validateSizeSelection = (itemId) => {
    if (!selectedSizeForSuit[itemId]) {
      // Highlight the size boxes in red
      setErrorSuitId(itemId);
      
      // Show validation popup
      setShowSizeError(true);
      
      // Reset the highlighting after 3 seconds
      setTimeout(() => {
        setShowSizeError(false);
        setErrorSuitId(null);
      }, 3000);
      
      return false;
    }
    return true;
  };

  const handleSizeSelection = (itemId, size) => {
    // Clear any existing timer for this item
    if (deselectionTimers[itemId]) {
      clearTimeout(deselectionTimers[itemId]);
    }
    
    // If selecting a size on a different item, deselect the previous item's size
    if (lastSelectedItem && lastSelectedItem !== itemId) {
      setSelectedSizeForSuit(prev => {
        const updated = {...prev};
        delete updated[lastSelectedItem];
        return updated;
      });
    }
    
    // Set the new selected size
    setSelectedSizeForSuit(prev => ({ ...prev, [itemId]: size }));
    setLastSelectedItem(itemId);
    
    // Set a new timer for auto-deselection
    const timerId = setTimeout(() => {
      setSelectedSizeForSuit(prev => {
        const updated = {...prev};
        delete updated[itemId];
        return updated;
      });
    }, 30000); // 30 seconds
    
    // Update the timers state
    setDeselectionTimers(prev => ({ ...prev, [itemId]: timerId }));
  };

  const handleAddToCart = (item) => {
    if (!validateSizeSelection(item.id)) return;
    
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: selectedSizeForSuit[item.id] || 'Not Selected',
      addedAt: new Date().toISOString(),
    };
    const updatedCart = [...storedCart, newItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
    alert(`${item.name} added to cart`);
    
    // Clear the selection after adding to cart
    setSelectedSizeForSuit(prev => {
      const updated = {...prev};
      delete updated[item.id];
      return updated;
    });
  };

  const handlePurchase = (item) => {
    if (!validateSizeSelection(item.id)) return;
    
    // Prepare product data to pass to checkout
    const productData = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      size: selectedSizeForSuit[item.id]
    };
    
    // Navigate to checkout page with product data
    navigate('/checkout', { 
      state: { 
        purchaseItem: productData,
        isDirectPurchase: true 
      } 
    });
  };

  const handleProductClick = (item) => {
    navigate(`/product/${item.id}`);
  };

  const handlePrevClick = (id) => {
    const sizeSelector = document.getElementById(`size-selector-${id}`);
    if (sizeSelector) {
      sizeSelector.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const handleNextClick = (id) => {
    const sizeSelector = document.getElementById(`size-selector-${id}`);
    if (sizeSelector) {
      sizeSelector.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  const handleCheckout = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Navigate to checkout page with cart items
    navigate('/checkout', { 
      state: { 
        cartItems: cartItems,
        isDirectPurchase: false 
      } 
    });
  };

  return (
    <section className="p-5 sm:p-7 bg-gray-50 min-h-screen">
      {/* Size Error Popup */}
      {showSizeError && (
        <div className="fixed top-18 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm">
          <AlertCircle className="w-5 h-5" />
          <span>Please select a size before proceeding!</span>
        </div>
      )}

      {/* Blinking Banner */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-center text-base font-bold p-5 rounded-xl mb-7 animate-pulse mt-24 mx-3">
        <p>Hurry up! Limited time offer! Get your premium two-piece suits today! 💯 super wool fading free</p>
      </div>

      {/* Cart Button */}
      <div className="fixed top-16 right-5 z-40">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition"
        >
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white w-80 max-h-[80vh] overflow-y-auto p-5 rounded-lg shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setIsCartOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              Your Cart ({cartCount})
            </h3>
            {cartCount === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4">
                  {JSON.parse(localStorage.getItem('cart') || '[]').map((item, index) => (
                    <div key={index} className="pb-3 border-b flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">Size: {item.size}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold">Ksh {item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold">Subtotal:</span>
                    <span className="font-bold">Ksh {cartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold">Shipping:</span>
                    <span className="font-bold">Ksh 200</span>
                  </div>
                  <div className="flex justify-between mb-3 text-base">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold">Ksh {(cartTotal() + 200).toLocaleString()}</span>
                  </div>
                  <button
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded transition text-sm"
                    onClick={() => {
                      handleCheckout();
                      setIsCartOpen(false);
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* List of suits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
        {twoPieceSuits.map((suit) => (
          <div
            key={suit.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative cursor-pointer overflow-hidden"
            onClick={() => handleProductClick(suit)}
          >
            {/* Image container */}
            <div className="aspect-square bg-gray-100 p-4 flex items-center justify-center">
              <img
                src={suit.image}
                alt={suit.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            {/* Content */}
            <div className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-base font-bold text-gray-900 line-clamp-2 h-12 overflow-hidden mb-1">{suit.name}</h3>
              <div className="text-sm text-yellow-500 mb-1">{renderStars(suit.rating)}</div>
              <p className="text-base text-blue-600 font-bold mb-3">Ksh {suit.price.toLocaleString()}</p>
              
              {/* Size Selector */}
              <div className="text-sm font-semibold mb-1">Select Size:</div>
              <div className="flex justify-center items-center mb-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevClick(suit.id);
                  }}
                  className="text-base text-gray-600 hover:text-gray-800 p-1"
                >
                  <ChevronLeft size={18} />
                </button>
                <div
                  id={`size-selector-${suit.id}`}
                  className="size-selector flex gap-1.5 overflow-x-auto py-2 max-w-[220px] scrollbar-hide"
                >
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSizeSelection(suit.id, size);
                      }}
                      className={`px-3 py-2 rounded-lg border-2 min-w-[36px] text-sm transition-all ${
                        selectedSizeForSuit[suit.id] === size 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : errorSuitId === suit.id 
                            ? 'border-red-500 bg-red-50 animate-pulse' 
                            : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextClick(suit.id);
                  }}
                  className="text-base text-gray-600 hover:text-gray-800 p-1"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              
              {/* Buttons */}
              <div className="space-y-2 mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePurchase(suit);
                  }}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <CheckCircle size={16} />
                  Purchase Now
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(suit);
                  }}
                  className="w-full bg-green-600 hover:bg-green-800 text-white py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TwoPieceSuits;