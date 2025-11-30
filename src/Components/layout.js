import React, { useState, useEffect } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import { MessageCircle, X, Send, User, Clock, Lock, Unlock } from 'lucide-react';

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

  // Admin credentials (in a real app, this would be handled by a backend)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'sirApollo2025'
  };

  // Load chat messages and admin status from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('sirApolloChat');
    const savedAdminStatus = localStorage.getItem('sirApolloAdmin');
    
    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages));
    }
    
    if (savedAdminStatus) {
      setIsAdmin(JSON.parse(savedAdminStatus));
    }
  }, []);

  // Save chat messages and admin status to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sirApolloChat', JSON.stringify(chatMessages));
    localStorage.setItem('sirApolloAdmin', JSON.stringify(isAdmin));
  }, [chatMessages, isAdmin]);

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true);
      setAdminPassword('');
      setShowAdminLogin(false);
    } else {
      alert('Invalid admin password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('sirApolloAdmin');
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      visibleTo: ['user', 'admin'] // Only user and admin can see this
    };

    setChatMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate admin response after 2 seconds
    setTimeout(() => {
      const adminResponses = [
        "Hello! Thank you for contacting Sir Apollo's Menwear. How can I assist you today?",
        "We're here to help! Could you please provide more details about your inquiry?",
        "Thank you for your message. Our team will get back to you shortly.",
        "For immediate assistance, you can also reach us via WhatsApp for faster response.",
        "We appreciate your interest in our products. Is there anything specific you'd like to know?",
        "Our customer care team is available to help you with sizing, pricing, and order information."
      ];

      const randomResponse = adminResponses[Math.floor(Math.random() * adminResponses.length)];
      
      const adminMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'admin',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        visibleTo: ['user', 'admin'] // Only user and admin can see this
      };

      setChatMessages(prev => [...prev, adminMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    if (isAdmin || window.confirm('Are you sure you want to clear the chat history?')) {
      setChatMessages([]);
      localStorage.removeItem('sirApolloChat');
    }
  };

  // Filter messages based on viewer (user sees all, admin sees all, others see nothing)
  const getVisibleMessages = () => {
    // Always show messages to user and admin
    return chatMessages.filter(msg => 
      msg.visibleTo?.includes('user') || isAdmin
    );
  };

  const visibleMessages = getVisibleMessages();

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
                  {isAdmin ? 'Admin Mode 🔒' : "We're online 👋"}
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
                <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Start a conversation with our support team</p>
                <p className="text-xs mt-1">We're here to help you!</p>
                {isAdmin && (
                  <p className="text-xs mt-2 text-blue-600">Admin Mode Active</p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {visibleMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                      } ${isAdmin ? 'ring-2 ring-yellow-400' : ''}`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <div className={`text-xs mt-1 flex items-center gap-1 ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <Clock className="w-3 h-3" />
                        {msg.timestamp}
                        {isAdmin && msg.sender === 'admin' && (
                          <span className="bg-yellow-500 text-white px-1 rounded text-xs">Admin</span>
                        )}
                      </div>
                    </div>
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
                placeholder={isAdmin ? "Admin: Type your response..." : "Type your message..."}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="1"
                style={{ minHeight: '40px', maxHeight: '100px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={message.trim() === ''}
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
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
                {visibleMessages.length} messages
                {isAdmin && ` (Admin View)`}
              </p>
            </div>
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
        <div className="relative bg-yellow-400 rounded-full p-3 shadow-lg border border-gray-200 backdrop-blur-sm bg-white/90">
          <MessageCircle className="w-6 h-6 text-blue-600" />
          {visibleMessages.length > 0 && !isChatOpen && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
              {visibleMessages.length}
            </span>
          )}
          {isAdmin && (
            <span className="absolute -top-1 -left-1 bg-yellow-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
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
        <div className="relative bg-green-800 rounded-full p-2 shadow-lg border border-blue-600 backdrop-blur-sm bg-blue/90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            className="drop-shadow-lg text-green-500"
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



