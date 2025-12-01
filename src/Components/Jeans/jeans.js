import React, { useState, useEffect } from 'react';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import jean images
import Jean1 from '../../Assests/Jeans/jean1.jpeg';
import Jean2 from '../../Assests/Jeans/jean2.jpeg';
import Jean3 from '../../Assests/Jeans/jean3.jpeg';
import Jean4 from '../../Assests/Jeans/jean4.jpg';
import Jean5 from '../../Assests/Jeans/jean5.jpg';
import Jean6 from '../../Assests/Jeans/jean6.jpg';
import Jean7 from '../../Assests/Jeans/jean7.jpg';
import Jean8 from '../../Assests/Jeans/jean8.jpg';
import Jean9 from '../../Assests/Jeans/jean9.jpg';
import Jean10 from '../../Assests/Jeans/jean10.jpg';
import Jean11 from '../../Assests/Jeans/jean11.jpg';
import Jean12 from '../../Assests/Jeans/jean12.jpg';
import Jean13 from '../../Assests/Jeans/jean13.jpg';
import Jean14 from '../../Assests/Jeans/jean14.jpg';
import Jean15 from '../../Assests/Jeans/jean15.jpg';
import Jean16 from '../../Assests/Jeans/jean16.jpg';
import Jean17 from '../../Assests/Jeans/jean17.jpg';
import Jean18 from '../../Assests/Jeans/jean18.jpg';
import Jean19 from '../../Assests/Jeans/jean19.jpg';
import Jean20 from '../../Assests/Jeans/jean20.jpg';
import Jean21 from '../../Assests/Jeans/jean21.jpg';
import Jean22 from '../../Assests/Jeans/jean22.jpg';
import Jean23 from '../../Assests/Jeans/jean23.jpg';
import Jean24 from '../../Assests/Jeans/jean24.jpg';

const Jeans = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(storedCart.length);
    };

    updateCart();
    window.addEventListener('storage', updateCart);
    return () => window.removeEventListener('storage', updateCart);
  }, []);

  // List of all jeans with IDs starting from 74
  const jeansProducts = [
    { 
      id: 99, 
      image: Jean1, 
      name: 'Slim Fit Jean', 
      price: 1850, 
      description: '🌟 Premium slim fit jeans for a modern look',
      category: 'Jeans' 
    },
    { 
      id: 100, 
      image: Jean2, 
      name: 'Vintage Jean', 
      price: 1850, 
      description: '🌟 Classic vintage style jeans with retro appeal',
      category: 'Jeans' 
    },
    { 
      id: 101, 
      image: Jean3, 
      name: 'Ripped Skinny Jean', 
      price: 1850, 
      description: '🌟 Trendy ripped skinny jeans for a bold statement',
      category: 'Jeans' 
    },
    { 
      id: 102, 
      image: Jean4, 
      name: 'Classic Straight Jean', 
      price: 1850, 
      description: '🌟 Timeless straight leg jeans for everyday wear',
      category: 'Jeans' 
    },
    { 
      id: 103, 
      image: Jean5, 
      name: 'High Super Jean', 
      price: 1850, 
      description: '🌟 High-waisted super comfortable jeans',
      category: 'Jeans' 
    },
    { 
      id: 104, 
      image: Jean6, 
      name: 'Black Stretch Jean', 
      price: 1850, 
      description: '🌟 Stretchy black jeans for maximum comfort',
      category: 'Jeans' 
    },
    { 
      id: 105, 
      image: Jean7, 
      name: 'Classic Jean', 
      price: 1850, 
      description: '🌟 Classic blue jeans that never go out of style',
      category: 'Jeans' 
    },
    { 
      id: 106, 
      image: Jean8, 
      name: 'Tapered Cargo Jean', 
      price: 1850, 
      description: '🌟 Practical cargo jeans with tapered fit',
      category: 'Jeans' 
    },
    { 
      id: 107, 
      image: Jean9, 
      name: 'Flare Jean', 
      price: 1850, 
      description: '🌟 Stylish flare jeans for a retro vibe',
      category: 'Jeans' 
    },
    { 
      id: 108, 
      image: Jean10, 
      name: 'Selvedge Denim Jean', 
      price: 1850, 
      description: '🌟 Premium selvedge denim for denim enthusiasts',
      category: 'Jeans' 
    },
    { 
      id: 109, 
      image: Jean11, 
      name: 'Super Jean', 
      price: 1850, 
      description: '🌟 Super comfortable jeans for all-day wear',
      category: 'Jeans' 
    },
    { 
      id: 110, 
      image: Jean12, 
      name: 'Stretch Skinny Fit Jean', 
      price: 1850, 
      description: '🌟 Skinny fit jeans with stretch for comfort',
      category: 'Jeans' 
    },
    { 
      id: 111, 
      image: Jean13, 
      name: 'Mid Wash Jean', 
      price: 1850, 
      description: '🌟 Medium wash jeans for a casual look',
      category: 'Jeans' 
    },
    { 
      id: 112, 
      image: Jean14, 
      name: 'Slim Fit Jean', 
      price: 1850, 
      description: '🌟 Slim fit design for a modern silhouette',
      category: 'Jeans' 
    },
    { 
      id: 113, 
      image: Jean15, 
      name: 'Premium Jean', 
      price: 2000, 
      description: '🌟 High-quality premium jeans for discerning taste',
      category: 'Jeans' 
    },
    { 
      id: 114, 
      image: Jean16, 
      name: 'Dark Blue Jean', 
      price: 1850, 
      description: '🌟 Dark blue jeans for a sophisticated look',
      category: 'Jeans' 
    },
    { 
      id: 115, 
      name: 'The Athletic Taper👖', 
      image: Jean17, 
      price: 1850, 
      category: 'jeans',
      description: '🌟 Athletic taper fit for active lifestyle'
    },
    { 
      id: 116, 
      name: 'Slim Utility👖', 
      image: Jean18, 
      price: 1850, 
      category: 'jeans',
      description: '🌟 Slim utility jeans for practical style'
    },
    { 
      id: 117, 
      name: 'Commuter Jean👖', 
      image: Jean19, 
      price: 1850, 
      category: 'jeans',
      description: '🌟 Comfortable commuter jeans for daily wear'
    },
    { 
      id: 118, 
      name: 'Weeknight Jean👖', 
      image: Jean20, 
      price: 1850, 
      category: 'jeans',
      description: '🌟 Perfect weeknight jeans for casual outings'
    },
    { 
      id: 119, 
      name: 'The Modern Straight👖', 
      image: Jean21, 
      price: 1850, 
      category: 'jeans',
      description: '🌟 Modern straight cut for contemporary style'
    },
    { 
      id: 120, 
      name: 'The All-Day Jean👖', 
      image: Jean22, 
      price: 1850, 
      category: 'jeans',
      description: '🌟 All-day comfort jeans for extended wear'
    },
    { 
      id: 121, 
      name: 'The Craftsman👖', 
      image: Jean23, 
      price: 1850, 
      category: 'jeans',
      description: '🌟 Craftsman style jeans for durable quality'
    },
    { 
      id: 122, 
      name: 'The Brawny Utility Fit👖', 
      image: Jean24, 
      price: 1850, 
      category: 'jeans',
      description: '🌟 Brawny utility fit for rugged appeal'
    },
  ];

  const handleAddToCart = (item, e = null) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = storedCart.findIndex(cartItem => cartItem.id === item.id);
    
    let newCart;
    if (existingItemIndex >= 0) {
      // Item already in cart, update quantity
      newCart = [...storedCart];
      newCart[existingItemIndex].quantity = (newCart[existingItemIndex].quantity || 1) + 1;
    } else {
      // Item not in cart, add new item
      const newItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        addedAt: new Date().toISOString(),
      };
      newCart = [...storedCart, newItem];
    }
    
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
    
    alert(`${item.name} ${existingItemIndex >= 0 ? 'quantity updated in' : 'added to'} cart`);
  };

  const handlePurchase = (item, e = null) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Save the direct purchase to localStorage
    const purchaseData = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      category: item.category,
      quantity: 1
    };
    
    localStorage.setItem('directPurchase', JSON.stringify(purchaseData));
    
    // Navigate to checkout page with proper state
    navigate('/checkout', { 
      state: { 
        purchaseItem: purchaseData,
        isDirectPurchase: true 
      } 
    });
  };

  const cartTotal = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    return storedCart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };

  // Check if item is in cart
  const isItemInCart = (itemId) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    return storedCart.some(item => item.id === itemId);
  };

  const handleProductClick = (item) => {
    navigate(`/product/${item.id}`);
  };

  return (
    <section className="p-10 bg-gray-100 min-h-screen relative">
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
                          <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold">Ksh {(item.price * (item.quantity || 1)).toLocaleString()}</p>
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
                      alert('Proceed to checkout');
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

      {/* Advertisement Card */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-black p-6 rounded-xl mb-8 animate-pulse mt-24">
        <p className="text-sm sm:text-base md:text-lg lg:text-2xl">Hurry up! Limited time. 💯 Super wool fading free premium Jean collection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {jeansProducts.map((jean) => (
          <div
            key={jean.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            onClick={() => handleProductClick(jean)}
          >
            <div className="h-64 p-4 flex items-center justify-center bg-gray-50">
              <img
                src={jean.image}
                alt={jean.name}
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-6 text-center space-y-2" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold mb-1">{jean.name}</h3>
              <p className="text-lg font-bold text-blue-600 mb-2">Ksh {jean.price.toLocaleString()}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{jean.description}</p>
              
              <div className="space-y-2 pt-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePurchase(jean, e); }}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 sm:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <CheckCircle className="w-5 h-5" />
                  Purchase Now
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(jean, e); }}
                  className={`w-full py-2 sm:py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${
                    isItemInCart(jean.id) 
                      ? 'bg-green-700 text-white hover:bg-green-800' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isItemInCart(jean.id) ? 'In Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Jeans;
