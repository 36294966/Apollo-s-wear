import { ArrowLeft, CheckCircle, CreditCard, Home, Mail, MapPin, ShoppingBag, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Shipping options data
const shippingOptions = [
  { area: 'Nairobi', cost: '300' },
  { area: 'Gatundu', cost: '350' },
  { area: 'Gilgil', cost: '350' },
  { area: 'Githunguri', cost: '350' },
  { area: 'Kangari', cost: '350' },
  { area: 'Kiambu', cost: '350' },
  { area: 'Kijabe', cost: '350' },
  { area: 'Kikuyu', cost: '350' },
  { area: 'Limuru', cost: '350' },
  { area: 'Naivasha', cost: '350' },
  { area: 'Ngong', cost: '350' },
  { area: 'Ongata Rongai', cost: '350' },
  { area: 'Athi River', cost: '360' },
  { area: 'Makuyu', cost: '360' },
  { area: 'Nakuru', cost: '360' },
  { area: 'Ruiru', cost: '360' },
  { area: 'Sabasaba', cost: '360' },
  { area: 'Thika', cost: '360' },
  { area: 'Juja', cost: '380' },
  { area: 'Engineer', cost: '400' },
  { area: 'Kagio', cost: '400' },
  { area: 'Kangundo', cost: '400' },
  { area: 'Karatina', cost: '400' },
  { area: 'Kerungoya', cost: '400' },
  { area: 'Kiganjo', cost: '410' },
  { area: 'Kutus', cost: '410' },
  { area: 'Mukurweni', cost: '400' },
  { area: 'Mwea', cost: '410' },
  { area: 'Chuka', cost: '420' },
  { area: 'Embu', cost: '420' },
  { area: 'Isinya', cost: '420' },
  { area: 'Kajiando', cost: '420' },
  { area: 'Kangema', cost: '420' },
  { area: 'Machakos', cost: '420' },
  { area: 'Matuu', cost: '420' },
  { area: 'Muranga', cost: '420' },
  { area: 'Murarandia', cost: '420' },
  { area: 'Narok', cost: '420' },
  { area: 'Nyeri', cost: '420' },
  { area: 'Runyenjes', cost: '420' },
  { area: 'Tala', cost: '420' },
  { area: 'Eldoret', cost: '450' },
  { area: 'Iten', cost: '450' },
  { area: 'Kitiui', cost: '450' },
  { area: 'Turbo', cost: '450' },
  { area: 'Makutano', cost: '460' },
  { area: 'Nkubu', cost: '460' },
  { area: 'Eldama Ravine', cost: '470' },
  { area: 'Chogoria', cost: '480' },
  { area: 'Kakamega', cost: '480' },
  { area: 'Kericho', cost: '480' },
  { area: 'Mbale', cost: '480' },
  { area: 'Meru', cost: '480' },
  { area: 'Molo', cost: '480' },
  { area: 'Njoro', cost: '480' },
  { area: 'Nyahururu', cost: '480' },
  { area: 'Olkalou', cost: '480' },
  { area: 'Sabatia', cost: '480' },
  { area: 'Sagana', cost: '480' },
  { area: 'Bomet', cost: '500' },
  { area: 'Kisii', cost: '500' },
  { area: 'Kisumu', cost: '500' },
  { area: 'Litein', cost: '500' },
  { area: 'Maseno', cost: '500' },
  { area: 'Masil', cost: '500' },
  { area: 'Nyamira', cost: '500' },
  { area: 'Sotik', cost: '500' },
  { area: 'Burnt Forest', cost: '520' },
  { area: 'Kitale', cost: '520' },
  { area: 'Nanyuki', cost: '520' },
  { area: 'Narumoru', cost: '520' },
  { area: 'Timau', cost: '520' },
  { area: 'Moi Bridge', cost: '530' },
  { area: 'Mwingi', cost: '550' },
  { area: 'Emali', cost: '580' },
  { area: 'Kabarnet', cost: '580' },
  { area: 'Kibwezi', cost: '580' },
  { area: 'Makindu', cost: '580' },
  { area: 'Sultan Hamud', cost: '580' },
  { area: 'Awendo', cost: '600' },
  { area: 'Bungoma', cost: '600' },
  { area: 'Chwele', cost: '600' },
  { area: 'Keroka', cost: '600' },
  { area: 'Kilgoris', cost: '600' },
  { area: 'Kimili', cost: '600' },
  { area: 'Lugari', cost: '600' },
  { area: 'Malaba', cost: '600' },
  { area: 'Migori', cost: '600' },
  { area: 'Mtito Andei', cost: '600' },
  { area: 'Mumias', cost: '600' },
  { area: 'Mwala', cost: '600' },
  { area: 'Ogembo', cost: '600' },
  { area: 'Oyugis', cost: '600' },
  { area: 'Rongo', cost: '600' },
  { area: 'Voi', cost: '600' },
  { area: 'Webuye', cost: '600' },
  { area: 'Wote', cost: '600' },
  { area: 'Kapsabet', cost: '620' },
  { area: 'Nandi Hills', cost: '620' },
  { area: 'Ahero', cost: '640' },
  { area: 'Bondo', cost: '640' },
  { area: 'Mariakani', cost: '640' },
  { area: 'Mombasa', cost: '640' },
  { area: 'Mtwapa', cost: '640' },
  { area: 'Isiolo', cost: '650' },
  { area: 'Maua', cost: '650' },
  { area: 'Siaya', cost: '650' },
  { area: 'Ugunja', cost: '650' },
  { area: 'Busia', cost: '660' },
  { area: 'Luanda', cost: '660' },
  { area: 'Muhoroni', cost: '660' },
  { area: 'Nambale', cost: '670' },
  { area: 'Oloitoktok', cost: '670' },
  { area: 'Baraton', cost: '700' },
  { area: 'Homabay', cost: '700' },
  { area: 'Nzoia', cost: '700' },
  { area: 'Mbita', cost: '720' },
  { area: 'Isebania', cost: '740' },
  { area: 'Kehancha', cost: '740' },
  { area: 'Garissa', cost: '750' },
  { area: 'Kendubay', cost: '750' },
  { area: 'Rechuonyo', cost: '750' },
  { area: 'Diani', cost: '770' },
  { area: 'Kapenguria', cost: '780' },
  { area: 'Kilifi', cost: '800' },
  { area: 'Malindi', cost: '840' },
  { area: 'Mwatate', cost: '840' },
  { area: 'Taveta', cost: '850' },
  { area: 'Watamu', cost: '850' },
  { area: 'Marsabit', cost: '950' },
  { area: 'Maralal', cost: '1100' },
  { area: 'Lamu', cost: '2050' },
  { area: 'Lodwar', cost: '2050' },
  { area: 'Lokichogio', cost: '2850' }
];

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const topRef = useRef(null);
  const orderSummaryRef = useRef(null);
  
  // Get purchase data from navigation state
  const purchaseItemFromState = location.state?.purchaseItem || null;
  const cartItemsFromState = location.state?.cartItems || [];
  const isDirectPurchase = location.state?.isDirectPurchase || false;
  const totalFromState = location.state?.total || 0;
  
  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    country: 'Kenya',
    shippingArea: '',
    rememberInfo: false
  });

  // State for purchase items
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [purchaseTotal, setPurchaseTotal] = useState(0);
  
  // State for shipping options
  const [selectedShipping, setSelectedShipping] = useState(null);
  
  // State for validation errors
  const [errors, setErrors] = useState({});
  const [orderDetails, setOrderDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // State to toggle confirmation view
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('mpesa');

  // Environment variables for payment details
  const paybillNumber = process.env.REACT_APP_PAYBILL_NUMBER || '542542';
  const accountNumber = process.env.REACT_APP_ACCOUNT_NUMBER || '378179';

  // WhatsApp number for receipt
  const whatsappNumber = '+254746311274';

  // Generate unique user ID
  const generateUserId = () => {
    return `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const [userId] = useState(generateUserId());

  // Get base URL for item links
  const getBaseUrl = () => {
    return window.location.origin;
  };

  // Generate proper product link using product ID
  const generateItemLink = (item) => {
    if (!item || !item.id) return `${getBaseUrl()}/`;
    
    // Use the product ID to create the link in the format: http://localhost:3000/product/3
    return `${getBaseUrl()}/product/${item.id}`;
  };

  // Scroll to top function
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll to order summary on mobile
  const scrollToOrderSummary = () => {
    if (window.innerWidth < 1024 && orderSummaryRef.current) {
      orderSummaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Calculate total from items
  const calculateTotal = (items) => {
    return items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return sum + (price * quantity);
    }, 0);
  };

  // Load purchase data
  useEffect(() => {
    // Check if we have cart items from state (multiple items from cart)
    if (cartItemsFromState && cartItemsFromState.length > 0) {
      setPurchaseItems(cartItemsFromState);
      setPurchaseTotal(totalFromState);
    }
    // Check if we have a single purchase item in state (direct purchase)
    else if (purchaseItemFromState && isDirectPurchase) {
      setPurchaseItems([purchaseItemFromState]);
      setPurchaseTotal(parseFloat(purchaseItemFromState.price) || 0);
    } else {
      // If no purchase data at all, redirect to home
      navigate('/');
    }

    // Scroll to top after a short delay to ensure DOM is ready
    setTimeout(() => {
      scrollToTop();
    }, 100);
  }, [purchaseItemFromState, cartItemsFromState, isDirectPurchase, totalFromState, navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (value.trim() !== '') {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle shipping selection
  const handleShippingChange = (e) => {
    const selectedArea = e.target.value;
    const shipping = shippingOptions.find(option => option.area === selectedArea);
    setSelectedShipping(shipping);
    setFormData({
      ...formData,
      shippingArea: selectedArea
    });
    if (selectedArea) {
      setErrors({
        ...errors,
        shippingArea: ''
      });
    }
  };

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Validate form - Email is completely optional, no validation at all
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    // No email validation - completely optional
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.phone.trim() && !/^0[0-9]{9}$/.test(formData.phone.trim())) newErrors.phone = 'Please enter a valid Kenyan phone number (e.g., 0712345678)';
    if (!formData.shippingArea) newErrors.shippingArea = 'Please select a shipping area';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate order receipt (for download)
  const generateReceipt = () => {
    const orderId = `ORDER_${Date.now()}`;
    const shippingCost = selectedShipping ? parseInt(selectedShipping.cost) : 0;
    const totalAmount = purchaseTotal + shippingCost;
    
    const receiptContent = `
      SIR APOLLO'S MENWEAR - ORDER CONFIRMATION
      ==========================================
      
      ORDER DETAILS:
      --------------
      Order ID: ${orderId}
      User ID: ${userId}
      Number of Items: ${purchaseItems.length}
      
      ITEMS:
      ------
      ${purchaseItems.map((item, index) => `
      ${index + 1}. ${item.name}
         Description: ${item.description || 'No description available'}
         Size: ${item.size || 'Not specified'}
         Price: KES ${item.price ? parseInt(item.price).toLocaleString() : '0'}
         Quantity: ${item.quantity || 1}
         Item Link: ${generateItemLink(item)}
         Subtotal: KES ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
      `).join('')}
      
      Shipping Area: ${formData.shippingArea}
      Shipping Cost: KES ${shippingCost.toLocaleString()}
      Subtotal: KES ${purchaseTotal.toLocaleString()}
      Total: KES ${totalAmount.toLocaleString()}
      
      CUSTOMER INFORMATION:
      --------------------
      Name: ${formData.firstName} ${formData.lastName}
      ${formData.email ? `Email: ${formData.email}` : 'Email: Not provided'}
      Address: ${formData.address}
      City: ${formData.city}
      ${formData.postalCode ? `Postal Code: ${formData.postalCode}` : 'Postal Code: Not provided'}
      Phone: ${formData.phone}
      Country: ${formData.country}
      
      PAYMENT DETAILS:
      ----------------
      Paybill: ${paybillNumber}
      Account: ${accountNumber}
      
      Order Date: ${new Date().toLocaleString()}
      
      IMPORTANT LINKS:
      ----------------
      Customer Support: https://wa.me/${whatsappNumber}
      Website: ${getBaseUrl()}
      
      Thank you for your purchase!
      
      ==========================================
      Customer Support: ${whatsappNumber}
      Email: support@sir-apollos.com
      Website: ${getBaseUrl()}
    `;
    return { content: receiptContent, orderId };
  };

  // Send receipt to WhatsApp automatically
  const sendToWhatsApp = () => {
    const shippingCost = selectedShipping ? parseInt(selectedShipping.cost) : 0;
    const totalAmount = purchaseTotal + shippingCost;
    
    // Create a shorter version of the receipt for WhatsApp
    const shortReceipt = `
*SIR APOLLO'S MENWEAR - ORDER CONFIRMATION*

*Order ID:* ${orderDetails?.orderId || 'N/A'}
*User ID:* ${userId}
*Number of Items:* ${purchaseItems.length}

*Items:*
${purchaseItems.map((item, index) => `
${index + 1}. *${item.name}*
   Size: ${item.size || 'Not specified'}
   Price: KES ${item.price ? parseInt(item.price).toLocaleString() : '0'}
   Quantity: ${item.quantity || 1}
   Subtotal: KES ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
`).join('')}

*Shipping Area:* ${formData.shippingArea}
*Shipping Cost:* KES ${shippingCost.toLocaleString()}
*Subtotal:* KES ${purchaseTotal.toLocaleString()}
*Total:* KES ${totalAmount.toLocaleString()}

*Customer:* ${formData.firstName} ${formData.lastName}
${formData.email ? `*Email:* ${formData.email}` : '*Email:* Not provided'}
*Phone:* ${formData.phone}

*Paybill:* ${paybillNumber}
*Account:* ${accountNumber}

*Order Date:* ${new Date().toLocaleString()}

_Thank you for your purchase!_
    `;
    
    const whatsappMessage = encodeURIComponent(shortReceipt);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  // Download receipt
  const downloadReceipt = () => {
    const { content } = generateReceipt();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sir_apollo_order_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Send to WhatsApp after download
    sendToWhatsApp();
  };

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent submission if no purchase items
    if (!purchaseItems || purchaseItems.length === 0) {
      alert('No items selected for purchase. Please go back and select items.');
      navigate('/');
      return;
    }
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.querySelector(`[name="${firstErrorField}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Scroll to top before processing
    scrollToTop();
    
    setIsProcessing(true);
    // Generate order details
    const { orderId } = generateReceipt();
    const shippingCost = selectedShipping ? parseInt(selectedShipping.cost) : 0;
    const totalAmount = purchaseTotal + shippingCost;
    
    const orderDetailsObj = {
      items: purchaseItems,
      customer: formData,
      shipping: selectedShipping,
      subtotal: purchaseTotal,
      shippingCost,
      total: totalAmount,
      orderDate: new Date().toISOString(),
      orderId,
      userId
    };
    setOrderDetails(orderDetailsObj);
    // Simulate order processing
    setTimeout(() => {
      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('sirApolloOrders') || '[]');
      orders.push(orderDetailsObj);
      localStorage.setItem('sirApolloOrders', JSON.stringify(orders));
      
      // Clear cart from localStorage if this was a cart purchase
      if (cartItemsFromState && cartItemsFromState.length > 0) {
        localStorage.removeItem('cart');
        // Trigger cart update across tabs
        window.dispatchEvent(new Event('storage'));
      }
      
      // Clear direct purchase from localStorage
      localStorage.removeItem('directPurchase');
      
      // Show confirmation view
      setShowConfirmation(true);
      setIsProcessing(false);
      // Scroll to top again to ensure user sees the confirmation from the top
      scrollToTop();
    }, 2000);
  };

  // Navigate to home
  const navigateToHome = () => {
    navigate('/');
  };

  // Navigate back
  const navigateBack = () => {
    navigate(-1);
  };

  const shippingCost = selectedShipping ? parseInt(selectedShipping.cost) : 0;
  const total = purchaseTotal + shippingCost;

  // If order is completed, show confirmation with details
  if (showConfirmation && orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
        <div ref={topRef} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-16 md:mt-24">
          <div className="bg-gradient-to-r from-green-600 to-blue-700 py-8 px-8 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-white mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Order Confirmed!</h1>
            <p className="text-green-200 mt-2">Thank you for your purchase</p>
            <p className="text-green-100 text-sm mt-1">Download your Invoice and automate it to our Customer Care WhatsApp</p>
          </div>
          <div className="p-6 md:p-8">
            {/* Order ID and User ID */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6 text-center">
              <p className="text-blue-800 font-medium">Order ID: {orderDetails.orderId}</p>
              <p className="text-blue-800 font-medium">User ID: {orderDetails.userId}</p>
              <p className="text-blue-600 text-sm mt-1">Keep these for your records</p>
            </div>
            
            {/* Items ordered */}
            <div className="bg-green-50 p-4 md:p-6 rounded-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                Items Ordered ({orderDetails.items.length})
              </h2>
              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex items-start border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 md:w-20 md:h-24 object-contain rounded-lg bg-gray-100 p-1 mr-4"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x96?text=Image+Not+Found';
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      {item.size && item.size !== 'Not Selected' && (
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                      )}
                      <p className="text-sm text-gray-600">Quantity: {item.quantity || 1}</p>
                      <p className="text-sm text-blue-600 font-medium">
                        KES {((item.price || 0) * (item.quantity || 1)).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                      </p>
                      <a 
                        href={generateItemLink(item)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-green-600 hover:text-green-800 underline mt-1 inline-block"
                      >
                        View Item Details
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order summary */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Summary</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">KES {orderDetails.subtotal.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">KES {orderDetails.shippingCost.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-green-700">
                    KES {orderDetails.total.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Shipping info */}
            <div className="bg-blue-50 p-4 md:p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Shipping Information</h3>
              <p className="text-gray-700">{orderDetails.customer.firstName} {orderDetails.customer.lastName}</p>
              {orderDetails.customer.email && (
                <p className="text-gray-700">{orderDetails.customer.email}</p>
              )}
              <p className="text-gray-700">{orderDetails.customer.address}</p>
              <p className="text-gray-700">{orderDetails.customer.city}{orderDetails.customer.postalCode ? `, ${orderDetails.customer.postalCode}` : ''}</p>
              <p className="text-gray-700">{orderDetails.customer.phone}</p>
              <p className="text-gray-700">{orderDetails.customer.country}</p>
              <p className="text-gray-700 mt-2">Shipping to: {orderDetails.shipping.area}</p>
            </div>
            
            {/* Payment instructions */}
            <div className="bg-yellow-50 p-4 md:p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Instructions</h3>
              <p className="text-gray-700">
                Please complete your payment via M-Pesa using the following details:
              </p>
              <div className="mt-3 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-800">
                  <strong>Paybill:</strong> {paybillNumber}<br />
                  <strong>Account:</strong> {accountNumber}<br />
                  <strong>Amount:</strong> KES {orderDetails.total.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Once payment is confirmed, your order will be processed and shipped within 1-2 business days.
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={downloadReceipt}
                className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium flex items-center justify-center"
              >
               Click to Download Invoice & to automate it to our CustomerCare WhatsApp
              </button>
              <button
                onClick={navigateToHome}
                className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-medium flex items-center justify-center"
              >
                <Home className="mr-2 h-5 w-5" />
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no purchase items, show loading state instead of empty page
  if ((!purchaseItems || purchaseItems.length === 0) && !showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6 pt-20">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading Your Order...</h2>
          <p className="text-gray-600 mb-6">Please wait while we prepare your checkout.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Main checkout form view
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
      {/* Navigation */}
      <div className="max-w-6xl mx-auto mb-4">
        <button
          onClick={navigateBack}
          className="flex items-center text-blue-700 hover:text-blue-900 font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to {purchaseItems.length > 1 ? 'Cart' : 'Product'}
        </button>
      </div>
      
      <div ref={topRef} className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-purple-800 py-4 px-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Order Details
                </h2>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <User className="mr-2 h-5 w-5 text-blue-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-blue-600" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                          <span className="text-gray-500 text-xs ml-1">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="your.email@example.com (Optional)"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="07XXXXXXXX"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Kenya">Kenya</option>
                        <option value="Uganda">Uganda</option>
                        <option value ="Tanzania">Tanzania</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                      Shipping Address
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your address"
                        />
                        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.city ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your city"
                          />
                          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Postal Code
                            <span className="text-gray-500 text-xs ml-1">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter postal code (Optional)"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="shippingArea" className="block text-sm font-medium text-gray-700 mb-1">
                          Shipping Area *
                        </label>
                        <select
                          id="shippingArea"
                          name="shippingArea"
                          value={formData.shippingArea}
                          onChange={handleShippingChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.shippingArea ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select your area</option>
                          {shippingOptions.map((option, index) => (
                            <option key={index} value={option.area}>
                              {option.area} - KES {option.cost}
                            </option>
                          ))}
                        </select>
                        {errors.shippingArea && <p className="mt-1 text-sm text-red-600">{errors.shippingArea}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
                      Payment Method
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="mpesa"
                          checked={paymentMethod === 'mpesa'}
                          onChange={handlePaymentMethodChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700">M-Pesa</span>
                        <span className="ml-auto text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">Recommended</span>
                      </label>
                      
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 opacity-70">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={handlePaymentMethodChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          disabled
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700">Credit/Debit Card (Coming Soon)</span>
                      </label>
                    </div>
                    
                    {paymentMethod === 'mpesa' && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          You will receive M-Pesa payment instructions after submitting your order.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Remember info checkbox */}
                  <div className="flex items-center">
                    <input
                      id="rememberInfo"
                      name="rememberInfo"
                      type="checkbox"
                      checked={formData.rememberInfo}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="rememberInfo" className="ml-2 block text-sm text-gray-900">
                      Save my information for next time
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay KES ${total.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right column - Order Summary */}
          <div className="lg:w-1/3">
            <div ref={orderSummaryRef} className="bg-white rounded-xl shadow-lg overflow-hidden lg:sticky lg:top-6">
              <div className="bg-gradient-to-r from-green-600 to-blue-700 py-4 px-6">
                <h2 className="text-xl font-bold text-white">Order Summary</h2>
                <p className="text-green-200 text-sm mt-1">{purchaseItems.length} item{purchaseItems.length !== 1 ? 's' : ''}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {purchaseItems.map((item, index) => (
                    <div key={index} className="flex items-center border-b pb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 object-contain rounded-lg bg-gray-100 p-1 mr-4"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/64x80?text=Image+Not+Found';
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                        {item.size && item.size !== 'Not Selected' && (
                          <p className="text-xs text-gray-600">Size: {item.size}</p>
                        )}
                        <p className="text-xs text-gray-600">Quantity: {item.quantity || 1}</p>
                        <p className="text-sm font-medium text-blue-700 mt-1">
                          KES {((item.price || 0) * (item.quantity || 1)).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                        </p>
                        <a 
                          href={generateItemLink(item)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-green-600 hover:text-green-800 underline mt-1 inline-block"
                        >
                          View Item Details
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">KES {purchaseTotal.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {selectedShipping ? `KES ${selectedShipping.cost}` : 'Select area'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-blue-700">
                      KES {total.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                
                {/* Shipping info */}
                {selectedShipping && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      Shipping to {selectedShipping.area} will cost KES {selectedShipping.cost}
                    </p>
                  </div>
                )}
                
                {/* View summary button for mobile */}
                <div className="lg:hidden mt-6">
                  <button
                    onClick={scrollToOrderSummary}
                    className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 font-medium flex items-center justify-center"
                  >
                    View Order Summary
                  </button>
                </div>
                
                {/* Security badge */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                  <div className="flex items-center justify-center text-gray-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-gray-500">Your information is securely encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;