import React, { useState, useEffect } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import { MessageCircle, X, Send, User, Clock, Lock, Unlock, Shield } from 'lucide-react';

const Layout = ({ children }) => {
  const whatsappNumber = '254746311274';
  const prefilledMessage = encodeURIComponent(
    'Hello Sir Apollo, I want to clarify about your products'
  );

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [clientId, setClientId] = useState('');
  const [isAdminOnline, setIsAdminOnline] = useState(false);

  // Admin credentials (in a real app, this would be handled by a backend)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'sirApollo2025'
  };

  // Generate unique client ID on first load
  useEffect(() => {
    let savedClientId = localStorage.getItem('sirApolloClientId');
    if (!savedClientId) {
      savedClientId = 'client_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sirApolloClientId', savedClientId);
    }
    setClientId(savedClientId);
  }, []);

  // Load chat messages and admin status from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('sirApolloChat');
    const savedAdminStatus = localStorage.getItem('sirApolloAdmin');
    
    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages));
    }
    
    if (savedAdminStatus) {
      const adminStatus = JSON.parse(savedAdminStatus);
      setIsAdmin(adminStatus);
      setIsAdminOnline(adminStatus);
    }
  }, []);

  // Save chat messages and admin status to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sirApolloChat', JSON.stringify(chatMessages));
    localStorage.setItem('sirApolloAdmin', JSON.stringify(isAdmin));
  }, [chatMessages, isAdmin]);

  // Listen for storage changes to sync chat across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'sirApolloChat') {
        const newMessages = JSON.parse(e.newValue || '[]');
        setChatMessages(newMessages);
      }
      if (e.key === 'sirApolloAdmin') {
        const adminStatus = JSON.parse(e.newValue || 'false');
        setIsAdmin(adminStatus);
        setIsAdminOnline(adminStatus);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true);
      setIsAdminOnline(true);
      setAdminPassword('');
      setShowAdminLogin(false);
      // Add welcome message for admin
      const welcomeMessage = {
        id: Date.now(),
        text: "🔓 Admin mode activated. You can now view and respond to private client messages.",
        sender: 'system',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        visibleTo: ['admin']
      };
      setChatMessages(prev => [...prev, welcomeMessage]);
    } else {
      alert('Invalid admin password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setIsAdminOnline(false);
    // Add logout message
    const logoutMessage = {
      id: Date.now(),
      text: "🔒 Admin mode deactivated.",
      sender: 'system',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      visibleTo: ['admin']
    };
    setChatMessages(prev => [...prev, logoutMessage]);
  };

  // Instant AI-generated responses with specific pricing
  const generateAIResponse = (clientMessage) => {
    const message = clientMessage.toLowerCase();
    
    // Suits pricing
    if (message.includes('two piece') || message.includes('2 piece') || message.includes('twopiece')) {
      return "Two-piece suit: KES 11,000 🎩 Premium quality with perfect tailoring!";
    }
    
    if (message.includes('three piece') || message.includes('3 piece') || message.includes('threepiece')) {
      return "Three-piece suit: KES 13,000 👔 Includes vest for a complete elegant look!";
    }
    
    if (message.includes('kaunda')) {
      return "Kaunda suit: KES 14,000 🇰🇪 Traditional and stylish African wear!";
    }
    
    if (message.includes('tuxedo')) {
      return "Tuxedo: KES 15,000 🎭 Perfect for formal events and special occasions!";
    }
    
    // Shirts pricing
    if (message.includes('presidential') || message.includes('president')) {
      return "Presidential shirt: KES 3,000 👔 Premium formal shirt with excellent finish!";
    }
    
    if (message.includes('casual') || message.includes('casual shirt')) {
      return "Casual shirt: KES 1,250 😊 Comfortable and stylish for everyday wear!";
    }
    
    // Other items
    if (message.includes('jeans')) {
      return "Jeans: KES 1,850 👖 Durable and comfortable denim pants!";
    }
    
    if (message.includes('leather jacket') || message.includes('jacket')) {
      return "Leather jacket: KES 3,500 🧥 Premium quality leather, stylish and durable!";
    }
    
    if (message.includes('belt')) {
      return "Belt: KES 2,000 ⚡ Quality leather belts to complete your look!";
    }
    
    if (message.includes('tie')) {
      return "Tie: KES 800 🎀 Elegant ties to match your formal attire!";
    }
    
    if (message.includes('socks')) {
      return "Socks: KES 300 🧦 Comfortable and durable socks!";
    }
    
    // General suit inquiries
    if (message.includes('suit')) {
      return "We have various suits available:\n• Two-piece: KES 11,000\n• Three-piece: KES 13,000\n• Kaunda: KES 14,000\n• Tuxedo: KES 15,000\nWhich one interests you?";
    }
    
    // Shirt inquiries
    if (message.includes('shirt')) {
      return "We offer quality shirts:\n• Presidential shirt: KES 3,000\n• Casual shirt: KES 1,250\nWhich type are you looking for?";
    }
    
    // Accessories inquiries
    if (message.includes('accessory') || message.includes('accessories')) {
      return "Available accessories:\n• Belt: KES 2,000\n• Tie: KES 800\n• Socks: KES 300\n• Leather jacket: KES 3,500\n• Jeans: KES 1,850\nWhat would you like to know about?";
    }
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      const responses = [
        "Hello! Welcome to Sir Apollo's Menwear! 👋 We have suits, shirts, and accessories. How can I help you today?",
        "Hi there! 😊 Thank you for reaching out. We offer quality men's wear at affordable prices. What can I assist you with?",
        "Hey! Welcome! I'm here to help you find the perfect outfit. What are you looking for?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Pricing inquiries
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return "We have competitive prices! 🏷️\nSuits: KES 11,000-15,000\nShirts: KES 1,250-3,000\nAccessories: KES 300-3,500\nWhich specific item are you interested in?";
    }
    
    // Product inquiries
    if (message.includes('product') || message.includes('item') || message.includes('buy') || 
        message.includes('purchase')) {
      return "Great! We have:\n🎩 Suits (KES 11,000-15,000)\n👔 Shirts (KES 1,250-3,000)\n🧥 Jackets & Accessories (KES 300-3,500)\nWhat type of product are you looking for?";
    }
    
    // Sizing inquiries
    if (message.includes('size') || message.includes('fit') || message.includes('measure')) {
      const responses = [
        "We have sizes S-XXL and custom tailoring available! What's your measurement or usual size?",
        "Perfect fit guaranteed! Sizes S-XXL available with custom options. What's your size preference?",
        "We'll ensure great fit! Sizes S-XXL + custom tailoring. What are your measurements?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Shipping inquiries
    if (message.includes('shipping') || message.includes('delivery') || message.includes('ship')) {
      const responses = [
        "Fast delivery! Nairobi: 2-3 days, Nationwide: 3-5 days. Where are you located?",
        "Quick shipping! 2-3 days in Nairobi, 3-5 days elsewhere. What's your area?",
        "Reliable delivery! 2-5 days nationwide. Where should we deliver?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Quality inquiries
    if (message.includes('quality') || message.includes('material') || message.includes('fabric')) {
      const responses = [
        "Premium quality! High-grade fabrics and expert tailoring. Built to last!",
        "Exceptional quality! Durable materials and perfect craftsmanship.",
        "Top quality! Premium fabrics and excellent workmanship guaranteed."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // General responses
    const generalResponses = [
      "Thanks for your message! We offer quality suits, shirts, and accessories. How can I help you today?",
      "I'm here to assist with our men's wear collection! What do you need help with?",
      "Hello! What can I help you find from our collection today?",
      "How can I help you find the perfect outfit from Sir Apollo's?",
      "What brings you to Sir Apollo's menwear today?",
      "I'd love to help you explore our collection! What are you looking for?",
      "Great to hear from you! We have suits, shirts, and accessories. How can I assist?",
      "Welcome! What can I help you with from our quality men's wear collection?"
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  // Client sends message to admin - GUARANTEED INSTANT REPLY
  const handleClientSendMessage = () => {
    if (message.trim() === '') return;

    const clientMessage = {
      id: Date.now(),
      text: message,
      sender: 'client',
      clientId: clientId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      visibleTo: [clientId, 'admin']
    };

    // Add client message immediately
    const updatedMessages = [...chatMessages, clientMessage];
    setChatMessages(updatedMessages);
    setMessage('');
    
    // Save client message to localStorage
    localStorage.setItem('sirApolloChat', JSON.stringify(updatedMessages));
    window.dispatchEvent(new Event('storage'));

    // GUARANTEED INSTANT AI RESPONSE - ALWAYS TRIGGERS WHEN ADMIN OFFLINE
    // Check if admin is actually online by looking at localStorage
    const currentAdminStatus = localStorage.getItem('sirApolloAdmin') === 'true';
    
    if (!currentAdminStatus) {
      console.log('Admin offline - triggering AI response');
      
      // Show typing indicator immediately
      setIsTyping(true);
      
      // AI responds in 500ms (INSTANT)
      setTimeout(() => {
        console.log('AI responding to:', message);
        const aiResponse = generateAIResponse(message);
        
        const aiMessage = {
          id: Date.now() + 1,
          text: aiResponse,
          sender: 'admin', // Same as real admin
          clientId: clientId,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          visibleTo: [clientId, 'admin']
        };

        // Add AI response to messages
        const finalMessages = [...updatedMessages, aiMessage];
        setChatMessages(finalMessages);
        setIsTyping(false);
        
        // Save AI response to localStorage
        localStorage.setItem('sirApolloChat', JSON.stringify(finalMessages));
        window.dispatchEvent(new Event('storage'));
        
        console.log('AI response sent:', aiResponse);
      }, 500); // 0.5 SECOND DELAY - INSTANT
    } else {
      console.log('Admin online - no AI response needed');
      // If admin is online, they will respond manually
    }
  };

  // Admin sends message to specific client
  const handleAdminSendMessage = () => {
    if (message.trim() === '') return;

    // Find the last client message to get the clientId
    const lastClientMessage = [...chatMessages]
      .reverse()
      .find(msg => msg.sender === 'client');
    
    const targetClientId = lastClientMessage ? lastClientMessage.clientId : '';

    const adminMessage = {
      id: Date.now(),
      text: message,
      sender: 'admin',
      clientId: targetClientId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      visibleTo: [targetClientId, 'admin']
    };

    const updatedMessages = [...chatMessages, adminMessage];
    setChatMessages(updatedMessages);
    setMessage('');
    setIsTyping(false);
    
    // Save to localStorage and trigger storage event for cross-tab sync
    localStorage.setItem('sirApolloChat', JSON.stringify(updatedMessages));
    window.dispatchEvent(new Event('storage'));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isAdmin) {
        handleAdminSendMessage();
      } else {
        handleClientSendMessage();
      }
    }
  };

  const clearChat = () => {
    if (isAdmin) {
      // Admin can clear all chats
      if (window.confirm('Are you sure you want to clear ALL chat history?')) {
        setChatMessages([]);
        localStorage.removeItem('sirApolloChat');
        window.dispatchEvent(new Event('storage'));
      }
    } else {
      // Client can only clear their own chats
      if (window.confirm('Are you sure you want to clear your chat history?')) {
        const filteredMessages = chatMessages.filter(msg => 
          !msg.visibleTo?.includes(clientId)
        );
        setChatMessages(filteredMessages);
        localStorage.setItem('sirApolloChat', JSON.stringify(filteredMessages));
        window.dispatchEvent(new Event('storage'));
      }
    }
  };

  // Filter messages based on viewer and privacy
  const getVisibleMessages = () => {
    return chatMessages.filter(msg => {
      if (isAdmin) {
        // Admin can see all messages from all clients and system messages
        return msg.visibleTo?.includes('admin') || msg.sender === 'system';
      } else {
        // Client can only see messages visible to their clientId
        return msg.visibleTo?.includes(clientId) && msg.sender !== 'system';
      }
    });
  };

  const visibleMessages = getVisibleMessages();

  // Get active clients for admin view
  const getActiveClients = () => {
    const clients = new Set();
    chatMessages.forEach(msg => {
      if (msg.sender === 'client' && msg.clientId) {
        clients.add(msg.clientId);
      }
    });
    return Array.from(clients);
  };

  const activeClients = getActiveClients();

  // Count unread messages for admin (messages from all clients)
  const unreadClientMessages = isAdmin 
    ? chatMessages.filter(msg => 
        msg.sender === 'client' && 
        msg.visibleTo?.includes('admin') &&
        !isChatOpen
      ).length 
    : 0;

  // Count messages for current client
  const clientMessageCount = visibleMessages.filter(msg => 
    msg.sender !== 'system'
  ).length;

  return (
    <div className="min-h-screen text-gray-900">
      {/* Background with gradient and pattern */}
      <div className="fixed inset-0 -z-10">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)
            `,
            backgroundSize: '50px 50px, 30px 30px',
            backgroundPosition: '0 0, 25px 25px'
          }}
        ></div>
        
        {/* Animated floating elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #3b82f6 1px, transparent 1px),
              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content with enhanced background */}
      <main className="relative z-10">
        <div className="relative">
          {/* Content wrapper with subtle glass effect */}
          <div className="min-h-screen">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Customer Care Chat Bot */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-5 z-[999] w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col backdrop-blur-sm bg-white/95">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Sir Apollo Support</h3>
                <p className="text-xs text-blue-100">
                  {isAdmin ? (
                    <span>🔓 Admin - {activeClients.length} active client(s)</span>
                  ) : (
                    <span>💬 We're online - Quick responses</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <button
                  onClick={handleAdminLogout}
                  className="text-white hover:text-gray-200 transition-colors text-xs bg-red-600 px-2 py-1 rounded"
                  title="Logout from Admin"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="text-white hover:text-gray-200 transition-colors"
                  title="Admin Login"
                >
                  <Lock className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Admin Login Modal */}
          {showAdminLogin && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
              <div className="bg-white p-6 rounded-lg shadow-xl w-64 backdrop-blur-sm bg-white/95">
                <h3 className="font-semibold mb-4">Admin Login</h3>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAdminLogin}
                    className="flex-1 bg-blue-600 text-white rounded-lg px-3 py-2 text-sm hover:bg-blue-700"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowAdminLogin(false)}
                    className="flex-1 bg-gray-500 text-white rounded-lg px-3 py-2 text-sm hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50/80">
            {visibleMessages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <Shield className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">
                  {isAdmin ? 'No client messages yet' : 'Start a conversation'}
                </p>
                <p className="text-xs mt-1">
                  {isAdmin 
                    ? 'Client messages will appear here' 
                    : 'We respond instantly to all messages'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {visibleMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === 'client' 
                        ? 'justify-end' 
                        : msg.sender === 'admin' 
                        ? 'justify-start' 
                        : 'justify-center'
                    }`}
                  >
                    {msg.sender === 'system' ? (
                      <div className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 max-w-[90%]">
                        <p className="text-xs text-gray-600 text-center">{msg.text}</p>
                        <p className="text-xs text-gray-400 text-center mt-1">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {msg.timestamp}
                        </p>
                      </div>
                    ) : (
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender === 'client'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-green-600 text-white rounded-bl-none'
                        } ${isAdmin && msg.sender === 'client' ? 'ring-2 ring-yellow-400' : ''}`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <div className={`text-xs mt-1 flex items-center gap-1 ${
                          msg.sender === 'client' ? 'text-blue-100' : 'text-green-100'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {msg.timestamp}
                          {isAdmin && msg.sender === 'admin' && (
                            <span className="bg-yellow-500 text-white px-1 rounded text-xs">You</span>
                          )}
                          {isAdmin && msg.sender === 'client' && (
                            <span className="bg-purple-500 text-white px-1 rounded text-xs">
                              Client {msg.clientId?.substr(0, 4)}
                            </span>
                          )}
                          {!isAdmin && msg.sender === 'admin' && (
                            <span className="bg-green-500 text-white px-1 rounded text-xs">Support</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Support is typing...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-3 bg-white/95">
            <div className="flex gap-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  isAdmin 
                    ? "Type your response to client..." 
                    : "Type your message here..."
                }
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                rows="1"
                style={{ 
                  minHeight: '44px', 
                  maxHeight: '120px',
                  lineHeight: '1.4'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
              />
              <button
                onClick={isAdmin ? handleAdminSendMessage : handleClientSendMessage}
                disabled={message.trim() === ''}
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-1 min-h-[44px]"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={clearChat}
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                {isAdmin ? 'Clear all chats' : 'Clear my chat'}
              </button>
              <p className="text-xs text-gray-500">
                {isAdmin 
                  ? `${chatMessages.filter(msg => msg.sender !== 'system').length} total messages` 
                  : `${clientMessageCount} messages`
                }
              </p>
            </div>
            {isAdmin ? (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                <p className="text-xs text-green-700 text-center">
                  🔓 Private Mode: Each client sees only their own conversation
                </p>
              </div>
            ) : (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                <p className="text-xs text-blue-700 text-center">
                  💬 Instant replies guaranteed
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`fixed bottom-5 right-5 z-[998] hover:scale-110 transition-transform ${
          isChatOpen ? 'right-80' : 'right-5'
        }`}
        aria-label="Customer Care Chat"
      >
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4 shadow-lg border border-white/20 backdrop-blur-sm">
          <MessageCircle className="w-6 h-6 text-white" />
          {((!isAdmin && clientMessageCount > 0) || (isAdmin && unreadClientMessages > 0)) && !isChatOpen && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {isAdmin ? unreadClientMessages : clientMessageCount}
            </span>
          )}
          {isAdmin && (
            <span className="absolute -top-1 -left-1 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              A
            </span>
          )}
        </div>
      </button>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${prefilledMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-5 z-[998] hover:scale-110 transition-transform ${
          isChatOpen ? 'right-24' : 'right-20'
        }`}
        aria-label="Chat with Sir Apollo on WhatsApp"
      >
        <div className="relative bg-green-500 rounded-full p-3 shadow-lg border border-white/20 backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            className="drop-shadow-lg text-white"
          >
            <path d="M20.52 3.48A11.787 11.787 0 0012.01 0C5.38 0 .01 5.37.01 12c0 2.11.55 4.16 1.59 5.97L0 24l6.19-1.58A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12a11.94 11.94 0 00-3.48-8.52zM12 22.02c-1.81 0-3.57-.48-5.1-1.37l-.36-.21-3.67.93.97-3.57-.24-.37A9.944 9.944 0 012.02 12C2.02 6.49 6.5 2 12.01 2c2.67 0 5.18 1.04 7.07 2.93A9.944 9.944 0 0122 12c0 5.51-4.48 10.02-10 10.02z" />
            <path d="M17.49 14.89l-2.53-.72a.999.999 0 00-.97.26l-.73.75a7.064 7.064 0 01-3.36-3.35l.75-.73a1 1 0 00.26-.97l-.72-2.53a1 1 0 00-1.2-.7C7.35 7.26 6.5 8.94 6.5 10.75c0 .2.01.4.04.6a10.1 10.1 0 005.59 7.68c.16.07.33.13.5.18.4.1.8.15 1.2.15 1.81 0 3.49-.85 4.26-2.26a1 1 0 00-.7-1.2z" />
          </svg>
        </div>
      </a>
    </div>
  );
};

export default Layout;