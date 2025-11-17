import { CheckCircle, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cassual1 from '../../Assests/Cassual/cassual1.jpg';
import Cassual2 from '../../Assests/Cassual/cassual2.jpg';
import Cassual3 from '../../Assests/Cassual/cassual3.jpg';

const Cassual = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart synchronization
  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(storedCart.length);
    };
    
    updateCart();
    window.addEventListener('storage', updateCart);
    return () => window.removeEventListener('storage', updateCart);
  }, []);

  // Casual shirts data matching the IDs from your ProductDetail component
  const casualShirts = [
    {
      id: 102,
      name: 'Urban Streetwear Shirt ⭐⭐⭐⭐⭐',
      image: Cassual1,
      price: 2000,
      description: '🔥 Trendy urban streetwear shirt for casual occasions'
    },
    {
      id: 103,
      name: 'Designer Denim Casual ⭐⭐⭐⭐⭐',
      image: Cassual2,
      price: 2000,
      description: '🔥 Premium designer denim shirt for a stylish look'
    },
    {
      id: 104,
      name: 'Premium Linen Blend ⭐⭐⭐⭐⭐',
      image: Cassual3,
      price: 2000,
      description: '🔥 Comfortable linen blend shirt perfect for casual wear'
    }
  ];

  const handleAddToCart = (shirt) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = {
      id: shirt.id,
      name: shirt.name,
      price: shirt.price,
      image: shirt.image,
      addedAt: new Date().toLocaleString()
    };
    const updatedCart = [...storedCart, newItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
    alert(`${shirt.name} added to cart`);
  };

  const handlePurchase = (shirt) => {
    // Prepare product data to pass to checkout
    const productData = {
      id: shirt.id,
      name: shirt.name,
      price: shirt.price,
      image: shirt.image,
      description: shirt.description
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

  const handleProductClick = (shirt) => {
    navigate(`/product/${shirt.id}`);
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
                    <span className ='font-semibold'>Shipping:</span>
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

      {/* Shirt Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
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
    </section>
  );
};

export default Cassual;
