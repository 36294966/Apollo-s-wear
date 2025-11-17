import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import tuxedo images
import Tuxedo1 from '../../Assests/Suits/tuxedo1.jpg';
import Tuxedo2 from '../../Assests/Suits/tuxedo2.jpg';
import Tuxedo3 from '../../Assests/Suits/tuxedo3.jpg';
import Tuxedo4 from '../../Assests/Suits/tuxedo4.jpg';
import Tuxedo5 from '../../Assests/Suits/tuxedo5.jpg';
import Tuxedo6 from '../../Assests/Suits/tuxedo6.jpg';
import Tuxedo7 from '../../Assests/Suits/tuxedo7.jpg';
import Tuxedo8 from '../../Assests/Suits/tuxedo8.jpg';
import Tuxedo9 from '../../Assests/Suits/tuxedo9.jpg';

const PaymentPopup = ({ item, selectedSize, onClose }) => {
  const [amount, setAmount] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const paymentDetails = {
    paybill: '542542',
    account: '378179',
    standardPrice: 12000,
  };

  const handlePaymentConfirmation = () => {
    const content = `TUXEDO DINNER PURCHASE\n-----------------------\nItem: ${item?.name}\nProduct ID: ${item?.id}\nSize: ${selectedSize}\nPaybill: ${paymentDetails.paybill}\nAccount: ${paymentDetails.account}\nAmount Paid: Ksh ${amount || '________'}\nStandard Price: Ksh ${paymentDetails.standardPrice.toLocaleString()}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tuxedo_payment_${item?.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setPaymentSuccess(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          {paymentSuccess ? (
            <>
              <CheckCircle className="w-8 h-8 text-green-500" />
              Payment Verified!
            </>
          ) : (
            'Tuxedo Dinner Purchase'
          )}
        </h2>

        {!paymentSuccess ? (
          <>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-sm">Paybill:</span>
                <span className="font-mono text-blue-600 font-bold">{paymentDetails.paybill}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-sm">Account:</span>
                <span className="font-mono text-blue-600 font-bold">{paymentDetails.account}</span>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">Standard Price:</span>
                  <span className="font-mono text-green-600 font-bold">Ksh {paymentDetails.standardPrice.toLocaleString()}</span>
                </div>
              </div>
              <input
                type="number"
                placeholder="Enter amount (Ksh)"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                min="12000"
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handlePaymentConfirmation}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Confirm Payment
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-green-600">
            <p>Transaction receipt downloaded successfully</p>
            <p className="text-sm text-gray-500 mt-2">Closing automatically...</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Size Validation Popup
const SizeValidationPopup = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
      <p className="font-semibold">Please select a size before proceeding!</p>
    </div>
  );
};

const Tuxedo = () => {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedTuxedo, setSelectedTuxedo] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizeForTuxedo, setSelectedSizeForTuxedo] = useState({});
  const [showSizeValidation, setShowSizeValidation] = useState(false);
  const [highlightedSizes, setHighlightedSizes] = useState({});
  const [lastSelectedItem, setLastSelectedItem] = useState(null);
  const [deselectionTimers, setDeselectionTimers] = useState({});

  const tuxedoSuits = [
 { id: 64, name: 'Velvet Tuxedo Suit ⭐⭐⭐⭐⭐', price: 15000, description: 'Gorgeous velvet tuxedo for formal events.', category: 'Tuxedo Dinner Suits', image: Tuxedo1 },
  { id: 65, name: 'Midnight Tuxedo Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Midnight tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo2 },
  { id: 66, name: 'Ensemble Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Ensemble tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo3 },
  { id: 67, name: 'Classic Tuxedo Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Classic tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo4 },
  { id: 68, name: 'Slim  Tuxedo Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Slim and stylish tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo5 },
  { id: 69, name: 'Designer Tuxedo Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Designer tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo6 },
  { id:70, name: 'Royal  Tuxedo Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Royal tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo7 },
  { id:71, name: 'Premium Tuxedo Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Slim and stylish tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo8 },
  
  ];

  const sizes = ['44', '46', '48', '50', '52', '54', '56', '58', '60'];

  // Function to calculate cart total
  const cartTotal = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    return storedCart.reduce((sum, item) => sum + item.price, 0);
  };

  // Function to render star ratings
  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
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
    Object.keys(selectedSizeForTuxedo).forEach(itemId => {
      if (selectedSizeForTuxedo[itemId]) {
        newTimers[itemId] = setTimeout(() => {
          setSelectedSizeForTuxedo(prev => {
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
  }, [selectedSizeForTuxedo]);

  const validateSizeSelection = (itemId) => {
    if (!selectedSizeForTuxedo[itemId]) {
      // Highlight the size boxes in red
      setHighlightedSizes(prev => ({ ...prev, [itemId]: true }));
      
      // Show validation popup
      setShowSizeValidation(true);
      
      // Reset the highlighting after 3 seconds
      setTimeout(() => {
        setHighlightedSizes(prev => ({ ...prev, [itemId]: false }));
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
      setSelectedSizeForTuxedo(prev => {
        const updated = {...prev};
        delete updated[lastSelectedItem];
        return updated;
      });
    }
    
    // Set the new selected size
    setSelectedSizeForTuxedo(prev => ({ ...prev, [itemId]: size }));
    setLastSelectedItem(itemId);
    
    // Set a new timer for auto-deselection
    const timerId = setTimeout(() => {
      setSelectedSizeForTuxedo(prev => {
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
      ...item,
      size: selectedSizeForTuxedo[item.id] || 'Not Selected',
      addedAt: new Date().toLocaleString(),
    };
    const updatedCart = [...storedCart, newItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
    alert(`${item.name} added to cart`);
    
    // Clear the selection after adding to cart
    setSelectedSizeForTuxedo(prev => {
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
      size: selectedSizeForTuxedo[item.id]
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
      {/* Size Validation Popup */}
      {showSizeValidation && (
        <SizeValidationPopup onClose={() => setShowSizeValidation(false)} />
      )}

      {/* Blinking Banner */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-center text-base font-bold p-5 rounded-xl mb-7 animate-pulse mt-24 mx-3">
        <p>Hurry up! Limited time offer! Get your premium tuxedo dinner suits today 💯 super wool fading free!</p>
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

      {/* Tuxedo Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
        {tuxedoSuits.map((suit) => (
          <div
            key={suit.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div 
              className="aspect-square bg-gray-100 p-4 flex items-center justify-center cursor-pointer"
              onClick={() => handleProductClick(suit)}
            >
              <img
                src={suit.image}
                alt={suit.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
              <h3 
                className="text-base font-bold text-gray-900 line-clamp-2 h-12 overflow-hidden mb-1 cursor-pointer hover:text-blue-600"
                onClick={() => handleProductClick(suit)}
              >
                {suit.name}
              </h3>
              <div className="text-sm text-yellow-500 mb-1">{renderStars(suit.rating)}</div>
              <p className="text-base text-blue-600 font-bold mb-3">Ksh {suit.price.toLocaleString()}</p>
              
              {/* Size Selection */}
              <div className="text-sm font-semibold mb-1">Select Size:</div>
              <div className="flex justify-center items-center mb-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevClick(suit.id); }}
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
                      onClick={(e) => { e.stopPropagation(); handleSizeSelection(suit.id, size); }}
                      className={`px-3 py-2 rounded-lg border-2 min-w-[36px] text-sm transition-all ${
                        selectedSizeForTuxedo[suit.id] === size 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : highlightedSizes[suit.id] 
                            ? 'border-red-500 bg-red-50 animate-pulse' 
                            : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextClick(suit.id); }}
                  className="text-base text-gray-600 hover:text-gray-800 p-1"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              
              {/* Buttons */}
              <div className="space-y-2 mt-3">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePurchase(suit); }}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <CheckCircle size={16} />
                  Purchase Now
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(suit); }}
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

      {showPayment && (
        <PaymentPopup 
          item={selectedTuxedo}
          selectedSize={selectedSizeForTuxedo[selectedTuxedo.id]}
          onClose={() => {
            setShowPayment(false);
            setSelectedTuxedo(null);
            setSelectedSizeForTuxedo({});
          }}
        />
      )}
    </section>
  ); 
};

export default Tuxedo;