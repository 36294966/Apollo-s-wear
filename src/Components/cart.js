import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft, CheckCircle, Plus, Minus, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);
  const [selectedSizeForSuit, setSelectedSizeForSuit] = useState({});
  const [lastSelectedItem, setLastSelectedItem] = useState(null);
  const [deselectionTimers, setDeselectionTimers] = useState({});

  const sizes = ['44', '46', '48', '50', '52', '54', '56', '58', '60'];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load cart data from localStorage and keep sync across tabs
  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      // Ensure each item has a unique identifier
      const cartWithIds = storedCart.map((item, index) => ({
        ...item,
        // Use existing ID or create a unique one
        uniqueId: item.id ? `${item.id}-${index}` : `item-${Date.now()}-${index}`
      }));
      setCartItems(cartWithIds);
    };
    updateCart();
    window.addEventListener('storage', updateCart);
    return () => window.removeEventListener('storage', updateCart);
  }, []);

  // Calculate total whenever cartItems change
  useEffect(() => {
    const cartTotal = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return sum + (price * quantity);
    }, 0);
    setTotal(cartTotal);
  }, [cartItems]);

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

  const handleRemoveItem = (uniqueId) => {
    const newCart = cartItems.filter(item => item.uniqueId !== uniqueId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(newCart);
    // Trigger re-render across tabs
    window.dispatchEvent(new Event('storage'));
  };

  const handleUpdateQuantity = (uniqueId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const newCart = cartItems.map(item => {
      if (item.uniqueId === uniqueId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const validateSizeSelection = () => {
    // Get the latest cart items from localStorage to ensure we have the most current data
    const latestCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if any suit items don't have sizes selected
    const suitItemsWithoutSizes = latestCart.filter(item => 
      (item.category === 'TwoPiece Suits' || item.category === 'Three-Piece Suits' || item.category === 'Kaunda Suits' || item.category === 'Tuxedo Dinner Suits' || item.category === 'DoubleBreast Suits') && 
      (!item.size || item.size === 'Not Selected')
    );
    
    if (suitItemsWithoutSizes.length > 0) {
      // Show validation popup
      setShowSizeError(true);
      
      // Reset the highlighting after 3 seconds
      setTimeout(() => {
        setShowSizeError(false);
      }, 3000);
      
      return false;
    }
    return true;
  };

  const handleSizeSelection = (uniqueId, size) => {
    // Clear any existing timer for this item
    if (deselectionTimers[uniqueId]) {
      clearTimeout(deselectionTimers[uniqueId]);
    }
    
    // If selecting a size on a different item, deselect the previous item's size
    if (lastSelectedItem && lastSelectedItem !== uniqueId) {
      setSelectedSizeForSuit(prev => {
        const updated = {...prev};
        delete updated[lastSelectedItem];
        return updated;
      });
    }
    
    // Set the new selected size
    setSelectedSizeForSuit(prev => ({ ...prev, [uniqueId]: size }));
    setLastSelectedItem(uniqueId);
    
    // Update the item in cart with the selected size
    const updatedCart = cartItems.map(item => {
      if (item.uniqueId === uniqueId) {
        return { ...item, size };
      }
      return item;
    });
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Set a new timer for auto-deselection
    const timerId = setTimeout(() => {
      setSelectedSizeForSuit(prev => {
        const updated = {...prev};
        delete updated[uniqueId];
        return updated;
      });
    }, 30000); // 30 seconds
    
    // Update the timers state
    setDeselectionTimers(prev => ({ ...prev, [uniqueId]: timerId }));
  };

  const handleProceedToCheckout = () => {
    // Get the latest cart items from localStorage to ensure we have the most current data
    const latestCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if all suit items have sizes selected
    if (!validateSizeSelection()) {
      return;
    }

    // Calculate total from the latest cart
    const cartTotal = latestCart.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return sum + (price * quantity);
    }, 0);

    // Ensure all items have proper quantity values
    const itemsWithQuantity = latestCart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));

    // Navigate to checkout with ALL cart data and total
    navigate('/checkout', { 
      state: { 
        cartItems: itemsWithQuantity,
        total: cartTotal,
        isDirectPurchase: false
      } 
    });
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handlePrevClick = (uniqueId) => {
    const sizeSelector = document.getElementById(`size-selector-${uniqueId}`);
    if (sizeSelector) {
      sizeSelector.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const handleNextClick = (uniqueId) => {
    const sizeSelector = document.getElementById(`size-selector-${uniqueId}`);
    if (sizeSelector) {
      sizeSelector.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  // Function to calculate cart total for the cart modal
  const cartModalTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return sum + (price * quantity);
    }, 0);
  };

  // Check if an item is a suit (needs size selection)
  const isSuitItem = (item) => {
    return item.category === 'TwoPiece Suits' || 
           item.category === 'Three-Piece Suits' || 
           item.category === 'Kaunda Suits' || 
           item.category === 'Tuxedo Dinner Suits' || 
           item.category === 'DoubleBreast Suits';
  };

  // Scroll to top when cart modal is opened
  useEffect(() => {
    if (isCartOpen) {
      window.scrollTo(0, 0);
    }
  }, [isCartOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6 pt-20">
      {/* Size Error Popup */}
      {showSizeError && (
        <div className="fixed top-18 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm">
          <AlertCircle className="w-5 h-5" />
          <span>Please select sizes for all suit items before proceeding!</span>
        </div>
      )}

      {/* Cart Button - Only show if there are items in cart */}
      {cartItems.length > 0 && (
        <div className="fixed top-16 right-5 z-40">
          <button
            onClick={() => {
              setIsCartOpen(true);
              window.scrollTo(0, 0);
            }}
            className="relative bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Your Shopping Cart</h2>
        
        {isPurchased ? (
          // Show confirmation message when the cart is empty after purchase
          <div className="text-center py-12">
            <CheckCircle className="mx-auto h-16 w-16 mb-6 text-green-500" />
            <p className="text-xl text-gray-700 mb-2">Thank you for your purchase!</p>
            <p className="text-gray-500 mb-6">Your order has been confirmed.</p>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 mb-6 text-gray-400" />
            <p className="text-xl text-gray-500 mb-2">Your shopping cart is empty</p>
            <p className="text-gray-400 mb-6">Start adding items to see them here</p>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div>
            <ul className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <li
                  key={item.uniqueId}
                  className="bg-gray-50 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between border border-gray-200"
                >
                  <div className="flex items-start space-x-4 mb-4 sm:mb-0 flex-1">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-blue-600 font-medium mt-1">KES {item.price} each</p>
                      
                      {/* Size Selector - Only for suits */}
                      {isSuitItem(item) && (
                        <div className="mt-3">
                          <div className="text-sm font-semibold mb-1">Select Size:</div>
                          <div className="flex justify-start items-center mb-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePrevClick(item.uniqueId);
                              }}
                              className="text-base text-gray-600 hover:text-gray-800 p-1"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            <div
                              id={`size-selector-${item.uniqueId}`}
                              className="size-selector flex gap-1.5 overflow-x-auto py-2 max-w-[220px] scrollbar-hide"
                            >
                              {sizes.map((size) => (
                                <button
                                  key={size}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSizeSelection(item.uniqueId, size);
                                  }}
                                  className={`px-3 py-2 rounded-lg border-2 min-w-[36px] text-sm transition-all ${
                                    item.size === size 
                                      ? 'bg-blue-600 text-white border-blue-600' 
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
                                handleNextClick(item.uniqueId);
                              }}
                              className="text-base text-gray-600 hover:text-gray-800 p-1"
                            >
                              <ChevronRight size={18} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between w-full sm:w-auto">
                    <div className="flex items-center mr-4">
                      <button 
                        onClick={() => handleUpdateQuantity(item.uniqueId, (item.quantity || 1) - 1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-3 font-medium">{item.quantity || 1}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.uniqueId, (item.quantity || 1) + 1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="font-medium text-gray-800">
                      KES {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </div>
                    
                    <button
                      onClick={() => handleRemoveItem(item.uniqueId)}
                      className="text-red-500 hover:bg-red-100 p-2 ml-4 rounded-full transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Total:</h3>
                <span className="text-2xl font-bold text-blue-700">
                  KES {total.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-xl transition-all flex-1"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all flex-1"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
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
              Your Cart ({cartItems.length})
            </h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.uniqueId} className="pb-3 border-b flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          {item.size && (
                            <p className="text-xs text-gray-500">Size: {item.size}</p>
                          )}
                          <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold">KES {((item.price || 0) * (item.quantity || 1)).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold">Subtotal:</span>
                    <span className="font-bold">KES {cartModalTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold">Shipping:</span>
                    <span className="font-bold">KES 200</span>
                  </div>
                  <div className="flex justify-between mb-3 text-base">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold">KES {(cartModalTotal() + 200).toLocaleString()}</span>
                  </div>
                  <button
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded transition text-sm"
                    onClick={() => {
                      setIsCartOpen(false);
                      handleProceedToCheckout();
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
    </div>
  );
};

export default Cart;