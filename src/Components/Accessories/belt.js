import React, { useState, useEffect } from 'react';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import belt images
import Belt1 from '../../Assests/Accessories/belt1.jpg';
import Belt2 from '../../Assests/Accessories/belt2.jpg';
import Belt3 from '../../Assests/Accessories/belt3.jpg';
import Belt4 from '../../Assests/Accessories/belt4.jpg';
import Belt5 from '../../Assests/Accessories/belt5.jpg';
import Belt6 from '../../Assests/Accessories/belt6.jpg';
import Belt7 from '../../Assests/Accessories/belt7.jpg';
import Belt8 from '../../Assests/Accessories/belt8.jpg';

const Belt = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const updateCart = () =>{
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(storedCart.length);
    };

    updateCart();
    window.addEventListener('storage', updateCart);
    return () => window.removeEventListener('storage', updateCart);
  }, []);

  const belts = [
    { 
      id: 127, 
      image: Belt1, 
      name: 'Premium Leather Belt ⭐⭐⭐⭐⭐', 
      price: 2000,
      description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.',
      category: 'Belt'
    },
    { 
      id: 128, 
      image: Belt2, 
      name: 'Premium Black Belt ⭐⭐⭐⭐⭐', 
      price: 2000,
      description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.',
      category: 'Belt'
    },
    { 
      id: 129, 
      image: Belt3, 
      name: 'Premium Leather Belt ⭐⭐⭐⭐⭐', 
      price: 2000,
      description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.',
      category: 'Belt'
    },
    { 
      id: 130, 
      image: Belt4, 
      name: 'Premium Leather Belt ⭐⭐⭐⭐⭐', 
      price: 2000,
      description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.',
      category: 'Belt'
    },
    { 
      id: 131, 
      image: Belt5, 
      name: 'Premium Leather Belt ⭐⭐⭐⭐⭐', 
      price: 2000,
      description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.',
      category: 'Belt'
    },
    { 
      id: 132, 
      image: Belt6, 
      name: 'Premium Leather Belt ⭐⭐⭐⭐⭐', 
      price: 2000,
      description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.',
      category: 'Belt'
    },
    { 
      id: 133, 
      image: Belt7, 
      name: 'Stylish Brown Belt ⭐⭐⭐⭐⭐', 
      price: 2000,
      description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.',
      category: 'Belt'
    },
    { 
      id: 134, 
      image: Belt8, 
      name: 'Elegant Black Belt ⭐⭐⭐⭐⭐', 
      price: 2000,
      description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.',
      category: 'Belt'
    },
  ];

  const handleAddToCart = (item) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      addedAt: new Date().toLocaleString(),
    };
    const updatedCart = [...storedCart, newItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
    alert(`${item.name} added to cart`);
  };

  const handlePurchase = (item) => {
    // Prepare product data to pass to checkout
    const productData = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    };
    
    // Navigate to checkout page with product data
    navigate('/checkout', { 
      state: { 
        purchaseItem: productData,
        isDirectPurchase: true 
      } 
    });
  };

  const cartTotal = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    return storedCart.reduce((sum, item) => sum + item.price, 0);
  };

  const handleProductClick = (item) => {
    navigate(`/product/${item.id}`);
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
    <section className="p-6 sm:p-10 bg-gray-50 min-h-screen">
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
                          <p className="text-xs text-gray-500">
                            Added: {new Date(item.addedAt).toLocaleDateString()}
                          </p>
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

      {/* Fixed Advertisement Card */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-black text-center font-bold text-xl p-6 rounded-xl mb-8 animate-pulse mt-24 mx-4">
        <p>Hurry up! Limited time offer! Get your premium leather belts today!</p>
      </div>

      {/* Belt Items */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {belts.map((belt) => (
          <article
            key={belt.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            onClick={() => handleProductClick(belt)}
          >
            <div className="h-48 sm:h-60 bg-gray-100 p-4 flex items-center justify-center">
              <img
                src={belt.image}
                alt={belt.name}
                className="w-full h-full object-contain rounded-t-lg hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-5 text-center space-y-4" onClick={(e) => e.stopPropagation()}>
              <h3 
                className="text-xl sm:text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                onClick={() => handleProductClick(belt)}
              >
                {belt.name}
              </h3>
              <p className="text-blue-600 font-bold text-xl">Ksh {belt.price.toLocaleString()}</p>
              <button
                onClick={() => handlePurchase(belt)}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <CheckCircle className="w-5 h-5" />
                Purchase Now
              </button>
              <button
                onClick={() => handleAddToCart(belt)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Belt;
