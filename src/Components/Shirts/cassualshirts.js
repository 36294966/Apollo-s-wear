import { CheckCircle, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cassual1 from '../../Assests/Cassual/cassual1.jpg';
import Cassual2 from '../../Assests/Cassual/cassual2.jpg';
import Cassual3 from '../../Assests/Cassual/cassual3.jpg';
import Cassual4 from '../../Assests/Cassual/cassual4.jpg';
import Cassual5 from '../../Assests/Cassual/cassual5.jpg';
import Cassual6 from '../../Assests/Cassual/cassual6.jpg';

const Cassual = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('Cassual component mounted');
    console.log('Current path:', window.location.pathname);
  }, []);

  // Cart synchronization
  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(storedCart.length);
    };
    
    updateCart();
    window.addEventListener('storage', updateCart);
    window.addEventListener('cartUpdated', updateCart);
    
    return () => {
      window.removeEventListener('storage', updateCart);
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  // Casual shirts data matching the IDs from your ProductDetail component
  const casualShirts = [
    {
      id: 93,
      name: 'Urban Streetwear Shirt ⭐⭐⭐⭐⭐',
      image: Cassual1,
      price: 1250,
      description: '🔥 Trendy urban streetwear shirt for casual occasions',
      category: 'casual',
      colors: ['Black', 'Navy', 'Gray']
    },
    {
      id: 94,
      name: 'Designer Denim Casual ⭐⭐⭐⭐⭐',
      image: Cassual2,
      price: 1250,
      description: '🔥 Premium designer denim shirt for a stylish look',
      category: 'casual', 
      colors: ['Blue', 'Light Blue', 'Black']
    },
    {
      id: 95,
      name: 'Premium Linen Blend ⭐⭐⭐⭐⭐',
      image: Cassual3,
      price: 1250,
      description: '🔥 Comfortable linen blend shirt perfect for casual wear',
      category: 'casual',
      colors: ['White', 'Beige', 'Light Gray']
    },
    {
      id: 96,
      name: 'Classic Cotton Casual ⭐⭐⭐⭐⭐',
      image: Cassual4,
      price: 1250,
      description: '🔥 Classic cotton casual shirt for everyday comfort',
      category: 'casual',
      colors: ['White', 'Blue', 'Gray']
    },
    {
      id: 97,
      name: 'Modern Pattern Shirt ⭐⭐⭐⭐⭐',
      image: Cassual5,
      price: 1250,
      description: '🔥 Modern patterned shirt for a contemporary look',
      category: 'casual',
      colors: ['Multi-color', 'Blue', 'Black']
    },
    {
      id: 98,
      name: 'Elegant Casual Wear ⭐⭐⭐⭐⭐',
      image: Cassual6,
      price: 1250,
      description: '🔥 Elegant casual shirt perfect for smart-casual occasions',
      category: 'casual',
      colors: ['Navy', 'White', 'Burgundy']
    }
  ];

  const handleAddToCart = (shirt) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = {
      id: shirt.id,
      name: shirt.name,
      price: shirt.price,
      image: shirt.image,
      description: shirt.description,
      category: shirt.category,
      size: 'M', // Default size
      quantity: 1,
      addedAt: new Date().toLocaleString()
    };
    const updatedCart = [...storedCart, newItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Dispatch multiple events to ensure all components update
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new Event('cartCleared'));
    
    alert(`${shirt.name} added to cart`);
  };

  const handlePurchase = (shirt) => {
    console.log('Purchase clicked for shirt:', shirt.id);
    
    // Prepare product data to pass to checkout
    const productData = {
      id: shirt.id,
      name: shirt.name,
      price: shirt.price,
      image: shirt.image,
      description: shirt.description,
      category: shirt.category,
      size: 'Not Selected',
      quantity: 1
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
    return storedCart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };

  const handleProductClick = (shirt) => {
    console.log('Product clicked:', shirt.id);
    
    // Navigate to product detail page
    navigate(`/product/${shirt.id}`, {
      state: {
        product: shirt
      }
    });
  };

  const handleCheckout = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    
    // Navigate to checkout page with cart items
    navigate('/checkout', { 
      state: { 
        cartItems: cartItems,
        total: total,
        isDirectPurchase: false 
      } 
    });
  };

  const removeFromCart = (index) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = storedCart.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Dispatch events to update all components
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <section className="p-6 sm:p-10 bg-gray-100 min-h-screen relative">
      {/* Advertisement Card */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-center text-xl sm:text-2xl font-bold text-white p-6 rounded-xl mb-8 animate-pulse mt-24 mx-4">
        <p>Hurry up! Limited time Pick Premium Casual Shirt Today. 💯 Super wool fading free!</p>
      </div>

      {/* Cart Indicator */}
      <div className="fixed top-4 right-4 z-40">
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
                    <div key={index} className="pb-2 border-b">
                      <div className="flex justify-between items-start">
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
                              Size: {item.size || 'M'}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity || 1}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">Ksh {((item.price || 0) * (item.quantity || 1)).toLocaleString()}</p>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-xs text-red-500 hover:text-red-700 mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold">Subtotal:</span>
                    <span className="font-bold">Ksh {cartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className='font-semibold'>Shipping:</span>
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

      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Premium Casual Shirts</h1>
        <p className="text-gray-600 text-lg">Discover our collection of stylish and comfortable casual shirts</p>
      </div>

      {/* Shirt Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {casualShirts.map((shirt) => (
          <div
            key={shirt.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transform transition duration-300 group overflow-hidden"
          >
            <div 
              className="h-64 w-full bg-gray-200 p-4 flex items-center justify-center cursor-pointer"
              onClick={() => handleProductClick(shirt)}
            >
              <img
                src={shirt.image}
                alt={shirt.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-5 text-center space-y-3">
              <h3 
                className="text-xl sm:text-lg font-bold text-gray-900 cursor-pointer hover:text-blue-600"
                onClick={() => handleProductClick(shirt)}
              >
                {shirt.name}
              </h3>
              <p className="text-sm text-gray-600">{shirt.description}</p>
              
              <p className="text-lg font-semibold text-blue-600">Ksh {shirt.price.toLocaleString()}</p>
              
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
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Casual Shirts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">✓</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
            <p className="text-gray-600">Made from high-quality materials for lasting comfort and style</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Perfect Fit</h3>
            <p className="text-gray-600">Available in multiple sizes to ensure the perfect fit for everyone</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 font-bold">✓</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
            <p className="text-gray-600">Quick delivery across Kenya with secure payment options</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cassual;
