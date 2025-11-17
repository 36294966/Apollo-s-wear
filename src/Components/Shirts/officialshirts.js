import React, { useState, useEffect } from 'react';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Official1 from '../../Assests/Official/official1.jpg';
import Official2 from '../../Assests/Official/official2.jpg';
import Official3 from '../../Assests/Official/official3.jpg';
import Official4 from '../../Assests/Official/official4.jpg';
import Official5 from '../../Assests/Official/official5.jpg';
import Official6 from '../../Assests/Official/official6.jpg';
import Official7 from '../../Assests/Official/official7.jpg';
import Official8 from '../../Assests/Official/official8.jpg';
import Official9 from '../../Assests/Official/official9.jpg';
import Official10 from '../../Assests/Official/official10.jpg';
import Official11 from '../../Assests/Official/official11.jpg';
import Official12 from '../../Assests/Official/official12.jpg';
import Official13 from '../../Assests/Official/official13.jpg';
import Official14 from '../../Assests/Official/official14.jpg';
import Official15 from '../../Assests/Official/official15.jpg';
import Official16 from '../../Assests/Official/official16.jpg';

// Main Official Component
const Official = () => {
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

  // Official shirts data matching the IDs from your ProductDetail component
  const shirts = [
    { id: 76, image: Official1, name: 'Presidential Shirt ⭐⭐⭐⭐⭐', price: 3000 },
    { id: 77, image: Official2, name: 'Presidential Shirt ⭐⭐⭐⭐⭐', price: 3000 },
    { id: 78, image: Official3, name: 'Presidential Shirt ⭐⭐⭐⭐⭐', price: 3000 },
    { id: 79, image: Official4, name: 'Presidential Shirt ⭐⭐⭐⭐⭐', price: 3000 },
    { id: 80, image: Official5, name: 'French Cuff Formal ⭐⭐⭐⭐⭐', price: 1800 },
    { id: 81, image: Official6, name: 'Slim Fit Office Shirt ⭐⭐⭐⭐⭐', price: 1800 },
    { id: 82, image: Official7, name: 'Double Cuff Business ⭐⭐⭐⭐⭐', price: 1800 },
    { id: 83, image: Official8, name: 'Designer Collar Shirt ⭐⭐⭐⭐⭐', price: 1800 },
    { id: 84, image: Official9, name: 'Executive Checkered ⭐⭐⭐⭐⭐', price: 1800 },
    { id: 85, image: Official10, name: 'Silk Blend Formal ⭐⭐⭐⭐⭐', price: 1800 },
    { id: 86, image: Official11, name: 'Premium Twill Shirt ⭐⭐⭐⭐⭐', price: 1800 },
    { id: 87, image: Official12, name: 'Classic Spread Collar ⭐⭐⭐⭐⭐', price: 1800 },
    { id: 88, image: Official13, name: 'Luxury Official Shirt ⭐⭐⭐⭐⭐', price: 1800 },
    { id: 89, image: Official14, name: 'Sophistic Official Shirt ⭐⭐⭐⭐⭐', price: 1800 },
    { id: 90, image: Official15, name: 'Classic Official Shirt ⭐⭐⭐⭐⭐', price: 1800},
    { id: 91, image: Official16, name: 'Exclusive Official Shirt ⭐⭐⭐⭐⭐', price: 1800}
  ];

  const handleAddToCart = (item) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      addedAt: new Date().toLocaleString()
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
      description: item.name // Using name as description since we don't have a separate description field
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
    <section className="p-4 sm:p-6 bg-gray-50 min-h-screen mt-8">
      {/* Cart Button */}
      <div className="fixed top-16 right-4 z-40">
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
          <div className="bg-white w-80 max-h-[80vh] overflow-y-auto p-4 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsCartOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              Your Cart ({cartCount})
            </h3>
            {cartCount === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4">
                  {JSON.parse(localStorage.getItem('cart') || '[]').map((item, index) => (
                    <div key={index} className="pb-2 border-b flex justify-between items-center">
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

      <header className="bg-gradient-to-r from-green-600 via-red-500 to-yellow-500 text-white p-6 mb-8 rounded-xl shadow-lg text-center mt-12">
        <h1 className="text-3xl sm:text-4xl font-bold">Welcome to Official Shirts Collection</h1>
        <p className="text-lg sm:text-xl mt-2">High-quality shirts for professional occasions 💯 super wool fading free</p>
      </header>

      {/* Shirt Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-6">
        {shirts.map((shirt) => (
          <article 
            key={shirt.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div 
              className="aspect-square bg-gray-100 p-5 flex items-center justify-center cursor-pointer"
              onClick={() => handleProductClick(shirt)}
            >
              <img
                src={shirt.image}
                alt={shirt.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-5 text-center space-y-4">
              <h3 
                className="text-xl sm:text-lg font-bold text-gray-900 cursor-pointer hover:text-blue-600"
                onClick={() => handleProductClick(shirt)}
              >
                {shirt.name}
              </h3>
              <p className="text-blue-600 font-bold text-xl">Ksh {shirt.price.toLocaleString()}</p>
              <div className="space-y-2">
                <button
                  onClick={() => handlePurchase(shirt)}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Purchase Now
                </button>
                <button
                  onClick={() => handleAddToCart(shirt)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Official;