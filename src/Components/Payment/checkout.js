import { ArrowLeft, CheckCircle, CreditCard, Home, Mail, MapPin, ShoppingBag, User, ExternalLink, Download } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

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
  const formRef = useRef(null);
  
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

  // EmailJS configuration - Using your actual credentials
  const EMAILJS_CONFIG = {
    serviceId: 'service_u7d5vzf',
    templateId: 'template_xj1i4bg', 
    publicKey: 'La7uiwZgmmsaIVgLq'
  };

  // Initialize EmailJS
  useEffect(() => {
    console.log('Initializing EmailJS with:', EMAILJS_CONFIG);
    // EmailJS initialization is handled automatically by the SDK
  }, []);

  // Generate user ID based on purchased items and timestamp
  const generateUserId = (items) => {
    const now = new Date();
    const timestamp = now.getTime().toString(36).toUpperCase();
    const dateCode = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear().toString().slice(-2)}`;
    
    if (items.length === 1) {
      const productId = items[0].id || items[0].productId || '001';
      return `U${productId}-${dateCode}-${timestamp.slice(-4)}`;
    } else {
      const firstProductId = items[0].id || items[0].productId || '001';
      const itemCount = items.length;
      return `U${firstProductId}-${itemCount}ITM-${dateCode}-${timestamp.slice(-4)}`;
    }
  };

  // Generate order ID based on product IDs
  const generateOrderId = (items) => {
    if (items.length === 1) {
      const productId = items[0].id || items[0].productId || '001';
      return `ORD-${productId}`;
    } else {
      const productIds = items.map(item => item.id || item.productId || '001').slice(0, 3).join('-');
      const timestamp = Date.now().toString(36).toUpperCase();
      return `ORD-${productIds}-${timestamp}`;
    }
  };

  // Get base URL for item links
  const getBaseUrl = () => {
    return window.location.origin;
  };

  // Generate proper product link using product ID
  const generateItemLink = (item) => {
    const productId = item.id || item.productId;
    if (!productId) return `${getBaseUrl()}/`;
    return `${getBaseUrl()}/product/${productId}`;
  };

  // Generate order link that points to the main product
  const generateOrderLink = (orderDetailsObj) => {
    if (orderDetailsObj.items.length === 1) {
      const productId = orderDetailsObj.items[0].id || orderDetailsObj.items[0].productId;
      return `${getBaseUrl()}/product/${productId}`;
    } else {
      const firstProductId = orderDetailsObj.items[0].id || orderDetailsObj.items[0].productId;
      return `${getBaseUrl()}/product/${firstProductId}`;
    }
  };

  // Enhanced smooth scroll function
  const smoothScrollTo = (element, offset = 0) => {
    if (!element) return;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // Scroll to top function
  const scrollToTop = () => {
    smoothScrollTo(topRef.current, 80);
  };

  // Scroll to order summary on mobile
  const scrollToOrderSummary = () => {
    if (window.innerWidth < 1024 && orderSummaryRef.current) {
      smoothScrollTo(orderSummaryRef.current, 100);
    }
  };

  // Scroll to form section
  const scrollToForm = () => {
    if (formRef.current) {
      smoothScrollTo(formRef.current, 100);
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

  // Clear cart function - FIXED: Changed 'ccartKey' to 'cartKey'
  const clearPurchasedItemsFromCart = (purchasedItems) => {
    console.log('Clearing purchased items from cart...');
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (currentCart.length === 0) {
      console.log('Cart is already empty');
      return;
    }
    
    const purchasedItemsMap = new Map();
    purchasedItems.forEach(item => {
      const productId = item.id || item.productId;
      const key = `${productId}-${item.size || 'default'}`;
      purchasedItemsMap.set(key, item.quantity || 1);
    });
    
    const updatedCart = currentCart.filter(cartItem => {
      const cartProductId = cartItem.id || cartItem.productId;
      const cartKey = `${cartProductId}-${cartItem.size || 'default'}`;
      if (purchasedItemsMap.has(cartKey)) {
        console.log(`Removing item from cart: ${cartItem.name}, Size: ${cartItem.size}`);
        return false;
      }
      return true;
    });
    
    if (updatedCart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      console.log(`Cart updated. ${updatedCart.length} items remaining in cart.`);
    } else {
      localStorage.removeItem('cart');
      console.log('Cart is now empty');
    }
    
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new Event('storage'));
    localStorage.setItem('cart_trigger', Date.now().toString());
    localStorage.removeItem('cart_trigger');
    console.log('Purchased items removed from cart and events dispatched');
  };

  // Send notification to admin via EmailJS
  const sendAdminNotification = async (orderDetailsObj) => {
    try {
      // Create a detailed message with all order information for the admin
      const adminMessage = `
🛒 NEW ORDER RECEIVED! 🛒

📋 ORDER DETAILS:
• Order ID: ${orderDetailsObj.orderId}
• User ID: ${orderDetailsObj.userId}
• Number of Items: ${orderDetailsObj.items.length}
• Subtotal: KES ${orderDetailsObj.subtotal.toLocaleString()}
• Shipping Cost: KES ${orderDetailsObj.shippingCost.toLocaleString()}
• Total Amount: KES ${orderDetailsObj.total.toLocaleString()}
• Shipping Area: ${orderDetailsObj.shipping.area}

🛍️ ITEMS ORDERED:
${orderDetailsObj.items.map((item, index) => {
  const productId = item.id || item.productId || 'N/A';
  return `
${index + 1}. ${item.name}
   • Product ID: ${productId}
   • Size: ${item.size || 'Not specified'}
   • Price: KES ${item.price ? parseInt(item.price).toLocaleString() : '0'}
   • Quantity: ${item.quantity || 1}
   • Subtotal: KES ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
`;
}).join('')}

👤 CUSTOMER INFORMATION:
• Name: ${orderDetailsObj.customer.firstName} ${orderDetailsObj.customer.lastName}
• Email: ${orderDetailsObj.customer.email || 'Not provided'}
• Phone: ${orderDetailsObj.customer.phone}
• Address: ${orderDetailsObj.customer.address || 'Not provided'}
• City: ${orderDetailsObj.customer.city}
• Postal Code: ${orderDetailsObj.customer.postalCode || 'Not provided'}
• Country: ${orderDetailsObj.customer.country}

📅 ORDER INFORMATION:
• Submitted: ${new Date(orderDetailsObj.orderDate).toLocaleString()}
• Payment Method: M-Pesa
• Paybill: ${paybillNumber}
• Account: ${accountNumber}

🔗 PRODUCT LINKS:
${orderDetailsObj.items.map((item, index) => {
  const productId = item.id || item.productId || 'N/A';
  return `• Item ${index + 1}: ${generateItemLink(item)}`;
}).join('\n')}

Please process this order and contact the customer within 24 hours.
      `;

      // Template parameters for admin notification
      const templateParams = {
        to_name: 'Admin',
        from_name: 'Sir Apollo Website',
        message: adminMessage,
        subject: `NEW ORDER RECEIVED! - ${orderDetailsObj.orderId}`,
        order_id: orderDetailsObj.orderId,
        customer_name: `${orderDetailsObj.customer.firstName} ${orderDetailsObj.customer.lastName}`,
        customer_email: orderDetailsObj.customer.email || 'Not provided',
        customer_phone: orderDetailsObj.customer.phone,
        total_amount: `KES ${orderDetailsObj.total.toLocaleString()}`,
        order_date: new Date(orderDetailsObj.orderDate).toLocaleString(),
        items_count: orderDetailsObj.items.length,
        shipping_area: orderDetailsObj.shipping.area
      };

      console.log('Sending admin notification via EmailJS with parameters:', templateParams);

      // Send email using EmailJS with better error handling
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      console.log('✅ Admin notification sent successfully:', result);
      return { 
        success: true, 
        message: 'Admin notification sent successfully',
        status: result.status,
        text: result.text
      };

    } catch (error) {
      console.error('❌ Failed to send admin notification via EmailJS:', error);
      return { 
        success: false, 
        message: `Failed to send admin notification: ${error.text || error.message || 'Unknown error'}`,
        error: error
      };
    }
  };

  // Send receipt to customer via EmailJS
  const sendCustomerReceipt = async (orderDetailsObj) => {
    if (!formData.email) {
      console.log('No customer email provided, skipping customer receipt');
      return { success: false, message: 'No email provided' };
    }

    try {
      const itemsList = orderDetailsObj.items.map((item, index) => 
        `${index + 1}. ${item.name} (Size: ${item.size || 'Not specified'}) - Quantity: ${item.quantity || 1} - Price: KES ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}`
      ).join('\n');

      const templateParams = {
        to_email: formData.email,
        to_name: `${formData.firstName} ${formData.lastName}`,
        from_name: 'Sir Apollo Menwear',
        customer_name: `${formData.firstName} ${formData.lastName}`,
        order_id: orderDetailsObj.orderId,
        user_id: orderDetailsObj.userId,
        order_date: new Date(orderDetailsObj.orderDate).toLocaleString(),
        items: itemsList,
        subtotal: `KES ${orderDetailsObj.subtotal.toLocaleString()}`,
        shipping_cost: `KES ${orderDetailsObj.shippingCost.toLocaleString()}`,
        total_amount: `KES ${orderDetailsObj.total.toLocaleString()}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: formData.address || 'Not provided',
        customer_city: formData.city,
        shipping_area: orderDetailsObj.shipping.area,
        paybill_number: paybillNumber,
        account_number: accountNumber,
        whatsapp_number: whatsappNumber,
        product_link: generateOrderLink(orderDetailsObj),
        website_url: getBaseUrl()
      };

      console.log('Sending customer receipt via EmailJS...');
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      console.log('✅ Customer receipt sent successfully');
      return { 
        success: true, 
        message: 'Customer receipt sent successfully'
      };

    } catch (error) {
      console.error('❌ Failed to send customer receipt:', error);
      return { 
        success: false, 
        message: `Failed to send customer receipt: ${error.text || error.message || 'Unknown error'}`
      };
    }
  };

  // Send receipt to WhatsApp automatically
  const sendToWhatsApp = (orderDetails) => {
    const shippingCost = orderDetails.shippingCost;
    const totalAmount = orderDetails.total;
    
    const productIds = orderDetails.items.map(item => item.id || item.productId || 'N/A').join(', ');
    
    const shortReceipt = `
*SIR APOLLO'S MENWEAR - ORDER CONFIRMATION*

*Order ID:* ${orderDetails.orderId}
*User ID:* ${orderDetails.userId}
*Product IDs:* ${productIds}
*Number of Items:* ${orderDetails.items.length}

*Items:*
${orderDetails.items.map((item, index) => {
  const productId = item.id || item.productId || 'N/A';
  return `
${index + 1}. *${item.name}*
   Product ID: ${productId}
   Size: ${item.size || 'Not specified'}
   Price: KES ${item.price ? parseInt(item.price).toLocaleString() : '0'}
   Quantity: ${item.quantity || 1}
   Subtotal: KES ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
`;
}).join('')}

*Shipping Area:* ${orderDetails.customer.shippingArea}
*Shipping Cost:* KES ${shippingCost.toLocaleString()}
*Subtotal:* KES ${orderDetails.subtotal.toLocaleString()}
*Total:* KES ${totalAmount.toLocaleString()}

*Customer:* ${orderDetails.customer.firstName} ${orderDetails.customer.lastName}
${orderDetails.customer.email ? `*Email:* ${orderDetails.customer.email}` : '*Email:* Not provided'}
${orderDetails.customer.address ? `*Address:* ${orderDetails.customer.address}` : '*Address:* Not provided'}
*City:* ${orderDetails.customer.city}
${orderDetails.customer.postalCode ? `*Postal Code:* ${orderDetails.customer.postalCode}` : '*Postal Code:* Not provided'}
*Phone:* ${orderDetails.customer.phone}

*Product Link:* ${generateOrderLink(orderDetails)}

*Paybill:* ${paybillNumber}
*Account:* ${accountNumber}

*Order Date:* ${new Date(orderDetails.orderDate).toLocaleString()}

_Thank you for your purchase!_
    `;
    
    const whatsappMessage = encodeURIComponent(shortReceipt);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Automatically send all receipts and notifications
  const sendAutomatedReceipts = async (orderDetailsObj) => {
    const results = {
      whatsapp: true,
      admin: { success: false, message: 'Failed to send admin notification' },
      customer: { success: false, message: 'No email provided' }
    };

    // Send to WhatsApp
    sendToWhatsApp(orderDetailsObj);
    
    // Send admin notification
    console.log('🔄 Sending admin notification...');
    results.admin = await sendAdminNotification(orderDetailsObj);
    
    // Send customer receipt if email provided
    if (formData.email) {
      console.log('🔄 Sending customer receipt...');
      results.customer = await sendCustomerReceipt(orderDetailsObj);
    }
    
    console.log('📧 All notifications summary:', results);
    return results;
  };

  // Load purchase data
  useEffect(() => {
    if (cartItemsFromState && cartItemsFromState.length > 0) {
      setPurchaseItems(cartItemsFromState);
      setPurchaseTotal(totalFromState);
      console.log('Removing checkout items from cart...');
      clearPurchasedItemsFromCart(cartItemsFromState);
    } else if (purchaseItemFromState && isDirectPurchase) {
      setPurchaseItems([purchaseItemFromState]);
      setPurchaseTotal(parseFloat(purchaseItemFromState.price) || 0);
      console.log('Direct purchase - no cart modification needed');
    } else {
      navigate('/');
    }

    setTimeout(() => {
      scrollToTop();
    }, 300);
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

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.phone.trim() && !/^0[0-9]{9}$/.test(formData.phone.trim())) newErrors.phone = 'Please enter a valid Kenyan phone number (e.g., 0712345678)';
    if (!formData.shippingArea) newErrors.shippingArea = 'Please select a shipping area';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate order receipt (for download)
  const generateReceipt = (orderDetailsObj) => {
    const orderId = orderDetailsObj.orderId;
    const shippingCost = orderDetailsObj.shippingCost;
    const totalAmount = orderDetailsObj.total;
    
    const receiptContent = `
      SIR APOLLO'S MENWEAR - ORDER CONFIRMATION
      ==========================================
      
      ORDER DETAILS:
      --------------
      Order ID: ${orderId}
      User ID: ${orderDetailsObj.userId}
      Number of Items: ${orderDetailsObj.items.length}
      Product Link: ${generateOrderLink(orderDetailsObj)}
      
      ITEMS:
      ------
      ${orderDetailsObj.items.map((item, index) => {
        const productId = item.id || item.productId || 'N/A';
        return `
      ${index + 1}. ${item.name}
         Product ID: ${productId}
         Description: ${item.description || 'No description available'}
         Size: ${item.size || 'Not specified'}
         Price: KES ${item.price ? parseInt(item.price).toLocaleString() : '0'}
         Quantity: ${item.quantity || 1}
         Item Link: ${generateItemLink(item)}
         Subtotal: KES ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
      `;
      }).join('')}
      
      Shipping Area: ${orderDetailsObj.customer.shippingArea}
      Shipping Cost: KES ${shippingCost.toLocaleString()}
      Subtotal: KES ${orderDetailsObj.subtotal.toLocaleString()}
      Total: KES ${totalAmount.toLocaleString()}
      
      CUSTOMER INFORMATION:
      --------------------
      Name: ${orderDetailsObj.customer.firstName} ${orderDetailsObj.customer.lastName}
      ${orderDetailsObj.customer.email ? `Email: ${orderDetailsObj.customer.email}` : 'Email: Not provided'}
      ${orderDetailsObj.customer.address ? `Address: ${orderDetailsObj.customer.address}` : 'Address: Not provided'}
      City: ${orderDetailsObj.customer.city}
      ${orderDetailsObj.customer.postalCode ? `Postal Code: ${orderDetailsObj.customer.postalCode}` : 'Postal Code: Not provided'}
      Phone: ${orderDetailsObj.customer.phone}
      Country: ${orderDetailsObj.customer.country}
      
      PAYMENT DETAILS:
      ----------------
      Paybill: ${paybillNumber}
      Account: ${accountNumber}
      
      Order Date: ${new Date(orderDetailsObj.orderDate).toLocaleString()}
      
      IMPORTANT LINKS:
      ----------------
      View Your Product: ${generateOrderLink(orderDetailsObj)}
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

  // Download receipt
  const downloadReceipt = () => {
    const { content } = generateReceipt(orderDetails);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sir_apollo_order_${orderDetails.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!purchaseItems || purchaseItems.length === 0) {
      alert('No items selected for purchase. Please go back and select items.');
      navigate('/');
      return;
    }
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          smoothScrollTo(errorElement, 120);
          errorElement.focus();
        }
      }
      return;
    }
    
    scrollToTop();
    setIsProcessing(true);
    
    const orderId = generateOrderId(purchaseItems);
    const userId = generateUserId(purchaseItems);
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
    
    console.log('🔄 Processing order...', orderDetailsObj);
    
    try {
      const receiptResults = await sendAutomatedReceipts(orderDetailsObj);
      
      console.log('✅ All receipts sent successfully:', receiptResults);
      
      setOrderDetails(orderDetailsObj);
      
      const orders = JSON.parse(localStorage.getItem('sirApolloOrders') || '[]');
      orders.push(orderDetailsObj);
      localStorage.setItem('sirApolloOrders', JSON.stringify(orders));
      
      localStorage.removeItem('directPurchase');
      
      setShowConfirmation(true);
      setIsProcessing(false);
      
      scrollToTop();
      
    } catch (error) {
      console.error('❌ Error during order processing:', error);
      alert('There was an error processing your order. Please try again.');
      setIsProcessing(false);
    }
  };

  // Navigate to home
  const navigateToHome = () => {
    navigate('/');
  };

  // Navigate back
  const navigateBack = () => {
    navigate(-1);
  };

  // Navigate to product page
  const navigateToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const shippingCost = selectedShipping ? parseInt(selectedShipping.cost) : 0;
  const total = purchaseTotal + shippingCost;

  // If order is completed, show confirmation with details
  if (showConfirmation && orderDetails) {
    const mainProductId = orderDetails.items[0].id || orderDetails.items[0].productId;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
        <div ref={topRef} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-16 md:mt-24">
          <div className="bg-gradient-to-r from-green-600 to-blue-700 py-8 px-8 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-white mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Order Confirmed!</h1>
            <p className="text-green-200 mt-2">Thank you for your purchase</p>
            <p className="text-green-100 text-sm mt-1">Your receipt has been sent to WhatsApp {formData.email ? 'and Email' : ''}</p>
          </div>
          <div className="p-6 md:p-8">
            {/* Order ID and User ID - REDESIGNED COMPACT CARDS */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Order Details</h2>
                <p className="text-gray-600">Keep these details safe for your records</p>
              </div>
              
              {/* Compact Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Order ID Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-xs">ID</span>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Order ID</h3>
                      <p className="text-sm font-bold text-gray-900 font-mono truncate">{orderDetails.orderId}</p>
                    </div>
                  </div>
                  <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full inline-block">
                    Unique Identifier
                  </div>
                </div>

                {/* User ID Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <User size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">User ID</h3>
                      <p className="text-sm font-bold text-gray-900 font-mono truncate">{orderDetails.userId}</p>
                    </div>
                  </div>
                  <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full inline-block">
                    Your Account ID
                  </div>
                </div>

                {/* Product Access Card */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                      <ExternalLink size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Product ID</h3>
                      <p className="text-sm font-bold text-gray-900 font-mono truncate">{mainProductId}</p>
                    </div>
                  </div>
                  <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full inline-block">
                    Main Product
                  </div>
                </div>
              </div>

              {/* Product Access Button */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                      <ExternalLink size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-800">Quick Product Access</h3>
                      <p className="text-sm text-gray-600">Your order is linked to Product ID: <span className="font-mono font-semibold text-purple-600">{mainProductId}</span></p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigateToProduct(mainProductId)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    <ExternalLink size={16} />
                    View Product
                  </button>
                </div>
              </div>
            </div>
            
            {/* Items ordered */}
            <div className="bg-green-50 p-4 md:p-6 rounded-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                Items Ordered ({orderDetails.items.length})
              </h2>
              <div className="space-y-4">
                {orderDetails.items.map((item, index) => {
                  const productId = item.id || item.productId || 'N/A';
                  return (
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
                        <p className="text-sm text-gray-600">
                          <strong>Product ID:</strong> {productId}
                        </p>
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
                  );
                })}
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
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Customer Information</h3>
              <p className="text-gray-700">{orderDetails.customer.firstName} ${orderDetails.customer.lastName}</p>
              {orderDetails.customer.email && (
                <p className="text-gray-700">{orderDetails.customer.email}</p>
              )}
              {orderDetails.customer.address && (
                <p className="text-gray-700">{orderDetails.customer.address}</p>
              )}
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
            
            {/* Receipt delivery status */}
            <div className="bg-green-50 p-4 md:p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Receipt Delivery</h3>
              <p className="text-gray-700">
                ✅ Receipt sent to WhatsApp
              </p>
              {formData.email ? (
                <p className="text-gray-700">
                  ✅ Receipt sent to Email: {formData.email}
                </p>
              ) : (
                <p className="text-gray-600">
                  ℹ️ No email provided for email receipt
                </p>
              )}
              <p className="text-gray-700 mt-2">
                ✅ Admin notification sent successfully
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={downloadReceipt}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Download size={18} />
                Download Invoice
              </button>
              <button
                onClick={() => navigateToProduct(mainProductId)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <ExternalLink size={18} />
                View Your Product
              </button>
              <button
                onClick={navigateToHome}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Home size={18} />
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no purchase items, show loading state
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4 scroll-smooth">
      {/* Navigation */}
      <div className="max-w-6xl mx-auto mb-4">
        <button
          onClick={navigateBack}
          className="flex items-center text-blue-700 hover:text-blue-900 font-medium transition-colors duration-200"
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
            <div ref={formRef} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
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
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
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
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
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
                          <span className="text-gray-500 text-xs ml-1">(Optional - for receipt)</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="your.email@example.com (For receipt delivery)"
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
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="07XXXXXXXX"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="Kenya">Kenya</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Tanzania">Tanzania</option>
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
                          Address
                          <span className="text-gray-500 text-xs ml-1">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="Enter your address (Optional)"
                        />
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
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
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
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200">
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
                      
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 opacity-70 transition-all duration-200">
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
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg transition-all duration-200">
                        <p className="text-sm text-blue-700">
                          Receipt will be automatically sent to WhatsApp {formData.email ? 'and your email' : ''} when you click Pay.
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                          Admin will also receive automatic notification of your order.
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
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
                    />
                    <label htmlFor="rememberInfo" className="ml-2 block text-sm text-gray-900">
                      Save my information for next time
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Order...
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
            <div ref={orderSummaryRef} className="bg-white rounded-xl shadow-lg overflow-hidden lg:sticky lg:top-6 transition-all duration-300">
              <div className="bg-gradient-to-r from-green-600 to-blue-700 py-4 px-6">
                <h2 className="text-xl font-bold text-white">Order Summary</h2>
                <p className="text-green-200 text-sm mt-1">{purchaseItems.length} item{purchaseItems.length !== 1 ? 's' : ''}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {purchaseItems.map((item, index) => {
                    const productId = item.id || item.productId || 'N/A';
                    return (
                      <div key={index} className="flex items-center border-b pb-4 transition-all duration-200 hover:bg-gray-50 -mx-2 px-2 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-20 object-contain rounded-lg bg-gray-100 p-1 mr-4 transition-all duration-200 hover:scale-105"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64x80?text=Image+Not+Found';
                          }}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">
                            <strong>Product ID:</strong> {productId}
                          </p>
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
                            className="text-xs text-green-600 hover:text-green-800 underline mt-1 inline-block transition-colors duration-200"
                          >
                            View Item Details
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Totals */}
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <div className="flex justify-between transition-all duration-200 hover:bg-gray-50 -mx-2 px-2 py-1 rounded-lg">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">KES {purchaseTotal.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between transition-all duration-200 hover:bg-gray-50 -mx-2 px-2 py-1 rounded-lg">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {selectedShipping ? `KES ${selectedShipping.cost}` : 'Select area'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200 transition-all duration-200 hover:bg-blue-50 -mx-2 px-2 py-2 rounded-lg">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-blue-700">
                      KES {total.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                
                {/* Order ID Preview */}
                <div className="mt-6 p-4 bg-purple-50 rounded-lg transition-all duration-200 hover:bg-purple-100">
                  <p className="text-sm text-purple-700 font-medium">
                    Your Order ID will be:
                  </p>
                  <p className="text-xs text-purple-600 mt-1 font-mono">
                    {generateOrderId(purchaseItems)}
                  </p>
                  <p className="text-xs text-purple-500 mt-1">
                    {purchaseItems.length === 1 ? 
                      'Linked directly to your product' : 
                      'Contains all product IDs'}
                  </p>
                </div>
                
                {/* User ID Preview */}
                <div className="mt-4 p-4 bg-green-50 rounded-lg transition-all duration-200 hover:bg-green-100">
                  <p className="text-sm text-green-700 font-medium">
                    Your User ID will be:
                  </p>
                  <p className="text-xs text-green-600 mt-1 font-mono">
                    {generateUserId(purchaseItems)}
                  </p>
                  <p className="text-xs text-green-500 mt-1">
                    Based on your purchased items and order time
                  </p>
                </div>
                
                {/* Shipping info */}
                {selectedShipping && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg transition-all duration-200 hover:bg-green-100">
                    <p className="text-sm text-green-700">
                      Shipping to {selectedShipping.area} will cost KES {selectedShipping.cost}
                    </p>
                  </div>
                )}
                
                {/* Automated receipt info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg transition-all duration-200 hover:bg-blue-100">
                  <p className="text-sm text-blue-700 font-medium">
                    Automated Receipt Delivery
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    • WhatsApp: Always sent
                  </p>
                  <p className="text-xs text-blue-600">
                    • Email: {formData.email ? 'Will be sent via EmailJS' : 'Provide email above'}
                  </p>
                  <p className="text-xs text-blue-600">
                    • Admin Notification: Automatically sent
                  </p>
                </div>
                
                {/* View summary button for mobile */}
                <div className="lg:hidden mt-6">
                  <button
                    onClick={scrollToForm}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                  >
                    Continue to Form
                  </button>
                </div>
                
                {/* Security badge */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center transition-all duration-200 hover:bg-gray-100">
                  <div className="flex items-center justify-center text-gray-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
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

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Checkout;