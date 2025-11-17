import React, { useState, useEffect } from 'react';
import { CheckCircle, ChevronRight, ShoppingCart, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Import all images as needed
import Photo1 from '../Assests/Appolo/photo1.jpeg';
import Photo2 from '../Assests/Appolo/photo2.jpeg';
import Photo3 from '../Assests/Appolo/photo3.jpeg';
import Photo4 from '../Assests/Appolo/photo4.jpg';

import ThreePiece1 from '../Assests/Suits/threepiece1.jpg';
import ThreePiece2 from '../Assests/Suits/threepiece2.jpg';
import ThreePiece3 from '../Assests/Suits/threepiece3.jpg';
import ThreePiece4 from '../Assests/Suits/threepiece4.jpg';
import ThreePiece5 from '../Assests/Suits/threepiece5.jpg';
import ThreePiece6 from '../Assests/Suits/threepiece6.jpg';
import ThreePiece7 from '../Assests/Suits/threepiece7.jpg';
import ThreePiece9 from '../Assests/Suits/threepiece9.jpg';
import ThreePiece10 from '../Assests/Suits/threepiece10.jpg';
import ThreePiece11 from '../Assests/Suits/threepiece11.jpg';
import ThreePiece12 from '../Assests/Suits/threepiece12.jpg';
import ThreePiece14 from '../Assests/Suits/threepiece14.jpg';
import ThreePiece15 from '../Assests/Suits/threepiece15.jpg';
import ThreePiece16 from '../Assests/Suits/threepiece16.jpg';
import ThreePiece17 from '../Assests/Suits/threepiece17.jpg';
import ThreePiece18 from '../Assests/Suits/threepiece18.jpg';
import ThreePiece19 from '../Assests/Suits/threepiece19.jpg';
import ThreePiece21 from '../Assests/Suits/threepiece21.jpg';
import ThreePiece22 from '../Assests/Suits/threepiece22.jpg';
import ThreePiece23 from '../Assests/Suits/threepiece23.jpg';
import ThreePiece24 from '../Assests/Suits/threepiece24.jpg';
import ThreePiece25 from '../Assests/Suits/threepiece25.jpg';
import ThreePiece26 from '../Assests/Suits/threepiece26.jpg';
import ThreePiece27 from '../Assests/Suits/threepiece27.jpg';
import ThreePiece28 from '../Assests/Suits/threepiece28.jpg';
import ThreePiece29 from '../Assests/Suits/threepiece29.jpg';
import ThreePiece30 from '../Assests/Suits/threepiece30.jpg';
import ThreePiece31 from '../Assests/Suits/threepiece31.jpg';
import ThreePiece32 from '../Assests/Suits/threepiece32.jpg';
import ThreePiece33 from '../Assests/Suits/threepiece33.jpg';
import ThreePiece34 from '../Assests/Suits/threepiece34.jpg';
import ThreePiece35 from '../Assests/Suits/threepiece35.jpg';
import ThreePiece36 from '../Assests/Suits/threepiece36.jpg';
import ThreePiece37 from '../Assests/Suits/threepiece37.jpg';
import ThreePiece38 from '../Assests/Suits/threepiece38.jpg';
import ThreePiece39 from '../Assests/Suits/threepiece39.jpg';
import ThreePiece40 from '../Assests/Suits/threepiece40.jpg';
import ThreePiece41 from '../Assests/Suits/threepiece41.jpg';
import ThreePiece42 from '../Assests/Suits/threepiece42.jpg';
import ThreePiece43 from '../Assests/Suits/threepiece43.jpg';
import ThreePiece44 from '../Assests/Suits/threepiece44.jpg';
// Remove ThreePiece45 import since the file doesn't exist
import ThreePiece45 from '../Assests/Suits/threepiece45.jpg';
import ThreePiece46 from '../Assests/Suits/threepiece46.jpg';
import ThreePiece47 from '../Assests/Suits/threepiece47.jpg';
import ThreePiece48 from '../Assests/Suits/threepiece48.jpg';
import ThreePiece49 from '../Assests/Suits/threepiece49.jpg';
import ThreePiece50 from '../Assests/Suits/threepiece50.jpg';


import DoubleBreast1 from '../Assests/Suits/doubleBreast1.jpg';
import DoubleBreast2 from '../Assests/Suits/doubleBreast2.jpg';

import TwoPiece1 from '../Assests/Suits/twopiece1.jpg';
import TwoPiece2 from '../Assests/Suits/twopiece2.jpg';
import TwoPiece3 from '../Assests/Suits/twopiece3.jpg';
import TwoPiece4 from '../Assests/Suits/twopiece4.jpg';
import TwoPiece5 from '../Assests/Suits/twopiece5.jpg';
import TwoPiece7 from '../Assests/Suits/twopiece7.jpg';
import TwoPiece8 from '../Assests/Suits/twopiece8.jpg';
import TwoPiece9 from '../Assests/Suits/twopiece9.jpg';

import Tuxedo1 from '../Assests/Suits/tuxedo1.jpg';
import Tuxedo2 from '../Assests/Suits/tuxedo2.jpg';
import Tuxedo3 from '../Assests/Suits/tuxedo3.jpg';
import Tuxedo4 from '../Assests/Suits/tuxedo4.jpg';
import Tuxedo5 from '../Assests/Suits/tuxedo5.jpg';
import Tuxedo6 from '../Assests/Suits/tuxedo6.jpg';
import Tuxedo7 from '../Assests/Suits/tuxedo7.jpg';
import Tuxedo8 from '../Assests/Suits/tuxedo8.jpg';

import Kaunda1 from '../Assests/Suits/Kaunda1.jpg';
import Kaunda2 from '../Assests/Suits/kaunda2.jpg';
import Kaunda3 from '../Assests/Suits/kaunda3.jpg';
import Kaunda4 from '../Assests/Suits/kaunda4.jpg';

import Official1 from '../Assests/Official/official1.jpg';
import Official2 from '../Assests/Official/official2.jpg';
import Official3 from '../Assests/Official/official3.jpg';
import Official4 from '../Assests/Official/official4.jpg';
import Official5 from '../Assests/Official/official5.jpg';
import Official6 from '../Assests/Official/official6.jpg';
import Official7 from '../Assests/Official/official7.jpg';
import Official8 from '../Assests/Official/official8.jpg';
import Official9 from '../Assests/Official/official9.jpg';
import Official10 from '../Assests/Official/official10.jpg';
import Official11 from '../Assests/Official/official11.jpg';
import Official12 from '../Assests/Official/official12.jpg';
import Official13 from '../Assests/Official/official13.jpg';
import Official14 from '../Assests/Official/official14.jpg';
import Official15 from '../Assests/Official/official15.jpg';
import Official16 from '../Assests/Official/official16.jpg';

import Cassual1 from '../Assests/Cassual/cassual1.jpg';
import Cassual2 from '../Assests/Cassual/cassual2.jpg';
import Cassual3 from '../Assests/Cassual/cassual3.jpg';
import Cassual4 from '../Assests/Cassual/cassual4.jpg';
import Cassual5 from '../Assests/Cassual/cassual5.jpg';
import Cassual6 from '../Assests/Cassual/cassual6.jpg';

import Jean1 from '../Assests/Jeans/jean1.jpeg';
import Jean2 from '../Assests/Jeans/jean2.jpeg';
import Jean3 from '../Assests/Jeans/jean3.jpeg';
import Jean4 from '../Assests/Jeans/jean4.jpg';
import Jean5 from '../Assests/Jeans/jean5.jpg';
import Jean6 from '../Assests/Jeans/jean6.jpg';
import Jean7 from '../Assests/Jeans/jean7.jpg';
import Jean8 from '../Assests/Jeans/jean8.jpg';
import Jean9 from '../Assests/Jeans/jean9.jpg';
import jean10 from '../Assests/Jeans/jean10.jpg';
import Jean11 from '../Assests/Jeans/jean11.jpg';
import Jean12 from '../Assests/Jeans/jean12.jpg';
import jean13 from '../Assests/Jeans/jean14.jpg';
import jean14 from '../Assests/Jeans/jean14.jpg';
import jean15 from '../Assests/Jeans/jean15.jpg';
import jean16 from '../Assests/Jeans/jean16.jpg';
import jean17 from '../Assests/Jeans/jean17.jpg';
import jean18 from '../Assests/Jeans/jean18.jpg';
import jean19 from '../Assests/Jeans/jean19.jpg';
import jean20 from '../Assests/Jeans/jean20.jpg';
import jean21 from '../Assests/Jeans/jean21.jpg';
import jean22 from '../Assests/Jeans/jean22.jpg';
import jean23 from '../Assests/Jeans/jean23.jpg';
import jean24 from '../Assests/Jeans/jean24.jpg';

import Jacket1 from '../Assests/Jackets/jacket1.jpg';
import Jacket2 from '../Assests/Jackets/jacket2.jpg';
import Jacket3 from '../Assests/Jackets/jacket3.jpg';
import Jacket4 from '../Assests/Jackets/jacket4.webp';

import Belt1 from '../Assests/Accessories/belt1.jpg';
import Belt2 from '../Assests/Accessories/belt2.jpg';
import Belt3 from '../Assests/Accessories/belt3.jpg';
import Belt4 from '../Assests/Accessories/belt4.jpg';
import Belt5 from '../Assests/Accessories/belt5.jpg';
import Belt6 from '../Assests/Accessories/belt6.jpg';
import Belt7 from '../Assests/Accessories/belt7.jpg';
import Belt8 from '../Assests/Accessories/belt8.jpg';

const Home = () => {
  const [selectedSizeForSuit, setSelectedSizeForSuit] = useState({});
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [sizeError, setSizeError] = useState({});
  const [showSizeAlert, setShowSizeAlert] = useState(false);
  const navigate = useNavigate();

  const Sizes = ['44', '46', '48', '50', '52', '54', '56', '58', '60'];

  // Check if item requires size selection
  const requiresSize = (item) => {
    return item.category !== 'jeans' && item.category !== 'jacket' && item.category !== 'belt' && item.category !== 'shirt';
  };

  // Handle adding to cart
  const handleAddToCart = (item, event) => {
    if (event) event.preventDefault();
    
    // Check if size is required but not selected
    if (requiresSize(item) && !selectedSizeForSuit[item.id]) {
      setSizeError(prev => ({ ...prev, [item.id]: true }));
      setShowSizeAlert(true);
      setTimeout(() => setShowSizeAlert(false), 3000);
      
      // Highlight the size selection container
      setTimeout(() => {
        setSizeError(prev => ({ ...prev, [item.id]: false }));
      }, 3000);
      return;
    }
    
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = {
      ...item,
      size: requiresSize(item) ? (selectedSizeForSuit[item.id] || 'Not Selected') : 'N/A',
      addedAt: new Date().toISOString(),
    };
    localStorage.setItem('cart', JSON.stringify([...storedCart, newItem]));
    window.dispatchEvent(new Event('storage'));
    alert(`${item.name} added to cart`);
    
    // Reset the size for this specific item
    setSelectedSizeForSuit(prev => ({ ...prev, [item.id]: undefined }));
    setSizeError(prev => ({ ...prev, [item.id]: false }));
  };

  // Handle purchase click - Navigate to checkout
  const handlePurchaseClick = (item, event) => {
    if (event) event.preventDefault();
    
    // Check if size is required but not selected
    if (requiresSize(item) && !selectedSizeForSuit[item.id]) {
      setSizeError(prev => ({ ...prev, [item.id]: true }));
      setShowSizeAlert(true);
      setTimeout(() => setShowSizeAlert(false), 3000);
      
      // Highlight the size selection container
      setTimeout(() => {
        setSizeError(prev => ({ ...prev, [item.id]: false }));
      }, 3000);
      return;
    }
    
    // Prepare purchase data
    const purchaseData = {
      ...item,
      size: requiresSize(item) ? (selectedSizeForSuit[item.id] || 'Not Selected') : 'N/A',
      quantity: 1
    };
    
    // Store in localStorage as fallback
    localStorage.setItem('directPurchase', JSON.stringify(purchaseData));
    
    // Navigate to checkout with the purchase data
    navigate('/checkout', { 
      state: { 
        purchaseItem: purchaseData, 
        isDirectPurchase: true 
      } 
    });
    
    // Reset the size error for this specific item
    setSizeError(prev => ({ ...prev, [item.id]: false }));
  };

  // Update cart count
  useEffect(() => {
    const updateCart = () => {
      // Simply parse the cart to trigger the storage event listener
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      // cart is now used, no unused variable warning
      return cart;
    };
    updateCart();
    window.addEventListener('storage', updateCart);
    return () => window.removeEventListener('storage', updateCart);
  }, []);
  
  // Data arrays for products
  const threePieceSuits = [
    { id: 1, name: 'Executive Three-Piece Suit ⭐⭐⭐⭐⭐', image: Photo1, price: 13000, category: 'three-piece' },
    { id: 2, name: 'Elegance Three-Piece Suit ⭐⭐⭐⭐⭐', image: Photo2, price: 13000, category: 'three-piece' },
    { id: 3, name: 'Premium Three-Piece Suit ⭐⭐⭐⭐⭐', image: Photo3, price: 13000, category: 'three-piece' },
    { id: 4, name: 'Classic Pinstripe Ensemble ⭐⭐⭐⭐⭐', image: Photo4, price: 13000, category: 'three-piece' },
    { id: 5, name: 'Modern-Fit Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece1, price: 13000, category: 'three-piece' },
    { id: 6, name: 'Royal Navy Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece2, price: 13000, category: 'three-piece' },
    { id: 7, name: 'Luxury Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece3, price: 13000, category: 'three-piece' },
    { id: 8, name: 'Modern Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece4, price: 13000, category: 'three-piece' },
    { id: 9, name: 'Elite Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece5, price: 13000, category: 'three-piece' },
    { id: 10, name: 'Prestige Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece6, price: 13000, category: 'three-piece' },
    { id: 11, name: 'Imperial Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece7, price: 13000, category: 'three-piece' },
    { id: 12, name: 'LuxeLine Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece9, price: 13000, category: 'three-piece' },
    { id: 13, name: 'Sovereign Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece10, price: 13000, category: 'three-piece' },
    { id: 14, name: 'Heritage Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece11, price: 13000, category: 'three-piece' },
    { id: 15, name: 'Legacy Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece12, price: 13000, category: 'three-piece' },
    { id: 16, name: 'Opulence Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece14, price: 13000, category: 'three-piece' },
    { id: 17, name: 'Sophistication Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece15, price: 13000, category: 'three-piece' },
    { id: 18, name: 'Couture ClassicsThree-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece16, price: 13000, category: 'three-piece' },
    { id: 20, name: 'Dignity Collection Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece17, price: 13000, category: 'three-piece' },
    { id: 21, name: 'Vanguard Elite Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece18, price: 13000, category: 'three-piece' },
    { id: 22, name: 'Summit Suits Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece19, price: 13000, category: 'three-piece' },
    { id: 23, name: 'Executive Edge Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece33, price: 13000, category: 'three-piece' },
    { id: 24, name: 'Eminence Collection Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece21, price: 13000, category: 'three-piece' },
    { id: 25, name: 'Refined Royalty Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece22, price: 13000, category: 'three-piece' },
    { id: 26, name: 'Pinnacle Series Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece23, price: 13000, category: 'three-piece' },
    { id: 27, name: 'Urban Aristocrat Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece24, price: 13000, category: 'three-piece' },
    { id: 28, name: 'Noble AttireThree-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece25, price: 13000, category: 'three-piece' },
    { id: 29, name: 'Legacy Luxe Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece26, price: 13000, category: 'three-piece' },
    { id: 30, name: 'Signature Sovereign Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece27, price: 13000, category: 'three-piece' },
    { id: 31, name: 'Majesty Mode Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece28, price: 13000, category: 'three-piece' },
    { id: 32, name: 'Imperial Attire Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece29, price: 13000, category: 'three-piece' },
    { id: 33, name: 'Monarch Line Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece30, price: 13000, category: 'three-piece' },
    { id: 34, name: 'Crown & Confidence Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece31, price: 13000, category: 'three-piece' },
    { id: 35, name: 'Virtue Vogue Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece32, price: 13000, category: 'three-piece' },
    { id: 36, name: 'Business Titan Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece34, price: 13000, category: 'three-piece' },
    { id: 37, name: 'Leadership Edition Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece35, price: 13000, category: 'three-piece' },
    { id: 38, name: 'Professional Peak Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece36, price: 13000, category: 'three-piece' },
    { id: 39, name: 'Authority Attire Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece37, price: 13000, category: 'three-piece' },
    { id: 40, name: 'Success Suit Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece38, price: 13000, category: 'three-piece' },
    { id: 41, name: 'Urban Sophisticate Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece39, price: 13000, category: 'three-piece' },
    { id: 42, name: 'Contemporary Classic Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece40, price: 13000, category: 'three-piece' },
    { id: 43, name: 'Trendsetter Edition Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece41, price: 13000, category: 'three-piece' },
    { id: 44, name: 'Fashion Forward Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece42, price: 13000, category: 'three-piece' },
    { id: 46, name: 'New Age Aristocrat Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece43, price: 13000, category: 'three-piece' },
    { id: 47, name: 'Modern Maverick Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece44, price: 13000, category: 'three-piece' },
    { id: 48, name: 'Vintage Charm Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece45, price: 13000, category: 'three-piece' },
    { id: 49, name: 'Legacy Collection Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece46, price: 13000, category: 'three-piece' },
    { id: 50, name: 'Master Tailor Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece47, price: 13000, category: 'three-piece' },
    { id: 51, name: 'Ultimate Collection Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece48, price: 13000, category: 'three-piece' },
    { id: 52, name: 'New Age Aristocrat Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece49, price: 13000, category: 'three-piece' },
    { id: 53, name: 'Century Classic Three-Piece Suit⭐⭐⭐⭐⭐', image: ThreePiece50, price: 13000, category: 'three-piece' },

    
    { id: 54, name: 'Premium Double Breast Suit⭐⭐⭐⭐⭐', image: DoubleBreast1, price: 13500, category: 'double-breast' },
    { id: 55, name: 'Elegant Double Breast Suit⭐⭐⭐⭐⭐', image: DoubleBreast2, price: 13500, category: 'double-breast' },
  ];

  const twoPieceSuits = [
    { id: 56, name: 'Executive Two-Piece Suit 💯', image: TwoPiece1, price: 11000, category: 'two-piece' },
    { id: 57, name: 'Modern Classic Two-Piece Suit💯', image: TwoPiece2, price: 11000, category: 'two-piece' },
    { id: 58, name: 'Premium Two-Piece Suit💯', image: TwoPiece3, price: 11000, category: 'two-piece' },
    { id: 59, name: 'Business Two-Piece Suit💯', image: TwoPiece4, price: 11000, category: 'two-piece' },
    { id: 60, name: 'Super Classic Two-Piece Suit💯', image: TwoPiece5, price: 11000, category: 'two-piece' },
    { id: 61, name: 'Modern Two-Piece Suit💯', image: TwoPiece7, price: 11000, category: 'two-piece' },
    { id: 62, name: 'Premium Two-Piece Suit💯', image: TwoPiece8, price: 11000, category: 'two-piece' },
    { id: 63, name: 'Elegant Two-Piece Suit💯', image: TwoPiece9, price: 11000, category: 'two-piece' },
  ];

  const tuxedoSuits = [
    { id: 64, name: 'Velvet Tuxedo Suit⭐⭐⭐⭐⭐', image: Tuxedo1, price: 15000, category: 'tuxedo' },
    { id: 65, name: 'Midnight Tuxedo Suit⭐⭐⭐⭐⭐', image: Tuxedo2, price: 15000, category: 'tuxedo' },
    { id: 66, name: 'Ensemble Tuxedo Suit⭐⭐⭐⭐⭐', image: Tuxedo3, price: 15000, category: 'tuxedo' },
    { id: 67, name: 'Classic Tuxedo Suit⭐⭐⭐⭐⭐', image: Tuxedo4, price: 15000, category: 'tuxedo' },
    { id: 68, name: 'Slim Tuxedo Suit⭐⭐⭐⭐⭐', image: Tuxedo5, price: 15000, category: 'tuxedo' },
    { id: 69, name: 'Designer Tuxedo Set⭐⭐⭐⭐⭐', image: Tuxedo6, price: 15000, category: 'tuxedo' },
    { id: 70, name: 'Royal Dinner Suit⭐⭐⭐⭐⭐', image: Tuxedo7, price: 15000, category: 'tuxedo' },
    { id: 71, name: 'Premium Tuxedo Suit⭐⭐⭐⭐⭐', image: Tuxedo8, price: 15000, category: 'tuxedo' },
  ];

  const kaundaSuits = [
    { id: 72, name: 'Classic Kaunda Suit⭐⭐⭐⭐⭐', image: Kaunda1, price: 14000, category: 'kaunda' },
    { id: 73, name: 'Royal Kaunda Suit⭐⭐⭐⭐⭐', image: Kaunda2, price: 14000, category: 'kaunda' },
    { id: 74, name: 'Modern Kaunda Suit⭐⭐⭐⭐⭐', image: Kaunda3, price: 14000, category: 'kaunda' },
    { id: 75, name: 'Elegant Kaunda Suit⭐⭐⭐⭐⭐', image: Kaunda4, price: 14000, category: 'kaunda' },
  ];

  const officialShirts = [
    { id: 76, name: 'Presidential Shirt⭐⭐⭐⭐⭐', image: Official1, price: 3000, category: 'shirt' },
    { id: 77, name: 'Presidential Shirt⭐⭐⭐⭐⭐', image: Official2, price: 3000, category: 'shirt' },
    { id: 78, name: 'Presidential Shirt⭐⭐⭐⭐⭐', image: Official3, price: 3000, category: 'shirt' },
    { id: 79, name: 'Presidential Shirt⭐⭐⭐⭐⭐', image: Official4, price: 3000, category: 'shirt' },
    { id: 80, name: 'French Cuff Formal⭐⭐⭐⭐⭐', image: Official5, price: 1800, category: 'shirt' },
    { id: 81, name: 'Slim Fit Office Shirt⭐⭐⭐⭐⭐', image: Official6, price: 1800, category: 'shirt' },
    { id: 82, name: 'Double Cuff Business⭐⭐⭐⭐⭐', image: Official7, price: 1800, category: 'shirt' },
    { id: 83, name: 'Designer Collar Shirt⭐⭐⭐⭐⭐', image: Official8, price: 1800, category: 'shirt' },
    { id: 84, name: 'Executive Fit Shirt⭐⭐⭐⭐⭐', image: Official9, price: 1800, category: 'shirt' },
    { id: 86, name: 'Premium Cotton Shirt⭐⭐⭐⭐⭐', image: Official10, price: 1800, category: 'shirt' },
    { id: 87, name: 'Business Classic Shirt⭐⭐⭐⭐⭐', image: Official11, price: 1800, category: 'shirt' },
    { id: 88, name: 'Formal Elegance Shirt⭐⭐⭐⭐⭐', image: Official12, price: 1800, category: 'shirt' },
    { id: 89, name: 'Professional Style Shirt⭐⭐⭐⭐⭐', image: Official13, price: 1800, category: 'shirt' },
    { id: 90, name: 'Office Essential Shirt⭐⭐⭐⭐⭐', image: Official14, price: 1800, category: 'shirt' },
    { id: 91, name: 'Corporate Collection Shirt⭐⭐⭐⭐⭐', image: Official15, price: 1800, category: 'shirt' },
    { id: 92, name: 'Signature Dress Shirt⭐⭐⭐⭐⭐', image: Official16, price: 1800, category: 'shirt' },
  ];

  const poloShirts = [
    { id: 93, name: 'The Executive Polo ⭐⭐⭐⭐⭐', image: Cassual1, price: 1800, category: 'shirt' },
    { id: 94, name: 'Premium Cotton Classic ⭐⭐⭐⭐⭐', image: Cassual2, price: 1800, category: 'shirt' },
    { id: 95, name: 'Modern Fit Performance Polo ⭐⭐⭐⭐⭐', image: Cassual3, price: 1800, category: 'shirt' },
    { id: 96, name: 'Athletic Fit Performance Polo ⭐⭐⭐⭐⭐', image: Cassual4, price: 1800, category: 'shirt' },
    { id: 97, name: 'Boutique Collection Polo ⭐⭐⭐⭐⭐', image: Cassual5, price: 1800, category: 'shirt' },
    { id: 98, name: 'Essential Everyday Polo ⭐⭐⭐⭐⭐', image: Cassual6, price: 1800, category: 'shirt' },
  ];

  const jeans = [
    { id: 99, name: 'Slim Fit jean 👖', image: Jean1, price: 1850, category: 'jeans' },
    { id: 100, name: 'Vintage Jean👖', image: Jean2, price: 1850, category: 'jeans' },
    { id: 101, name: 'Ripped Skinny Jean👖', image: Jean3, price: 1850, category: 'jeans' },
    { id: 102, name: 'Classic Straight Leg👖', image: Jean4, price: 1850, category: 'jeans' },
    { id: 103, name: 'High Super Jean👖', image: Jean5, price: 1850, category: 'jeans' },
    { id: 104, name: 'Black Stretch jean👖', image: Jean6, price: 1850, category: 'jeans' },
    { id: 105, name: 'Classic Jean👖', image: Jean7, price: 1850, category: 'jeans' },
    { id: 106, name: 'Tapered Cargo Jeans👖', image: Jean8, price: 1850, category: 'jeans' },
    { id: 107, name: '💯Flare Jeans👖', image: Jean9, price: 1850, category: 'jeans' },
    { id: 108, name: 'Selvedge Denim👖', image: jean10, price: 1850, category: 'jeans' },
    { id: 109, name: '💯 Super Jean👖', image: Jean11, price: 1850, category: 'jeans' },
    { id: 110, name: 'Stretch Skinny Fit👖', image: Jean12, price: 1850, category: 'jeans' },
    { id: 111, name: ' Heritage Fit👖', image: jean13, price: 1850, category: 'jeans' },
    { id: 112, name: 'Foundation Jean👖', image: jean14, price: 1850, category: 'jeans' },
    { id: 113, name: 'The Original Fit👖', image: jean15, price: 1850, category: 'jeans' },
    { id: 114, name: 'The Standard Fit👖', image: jean16, price: 1850, category: 'jeans' },
    { id: 115, name: 'The Athletic Taper👖', image: jean17, price: 1850, category: 'jeans' },
    { id: 116, name: 'Slim Utility👖', image: jean18, price: 1850, category: 'jeans' },
    { id: 117, name: 'Commuter Jean👖', image: jean19, price: 1850, category: 'jeans' },
    { id: 118, name: 'Weeknight Jean👖', image: jean20, price: 1850, category: 'jeans' },
    { id: 119, name: 'The Modern Straight👖', image: jean21, price: 1850, category: 'jeans' },
    { id: 120, name: 'The All-Day Jean👖', image: jean22, price: 1850, category: 'jeans' },
    { id: 121, name: 'The Craftsman👖', image: jean23, price: 1850, category: 'jeans' },
    { id: 122, name: 'The Brawny Utility Fit👖', image: jean24, price: 1850, category: 'jeans' },
  ];

  const leatherJackets = [
    { id: 123, name: '🔥Leather Jacket - Classic', image: Jacket1, price: 3500, category: 'jacket' },
    { id: 124, name: '🔥Leather Jacket - Premium', image: Jacket2, price: 3500, category: 'jacket' },
    { id: 125, name: '🔥Leather Jacket - Modern Fit', image: Jacket3, price: 3500, category: 'jacket' },
    { id: 126, name: '🔥Leather Jacket - Elegant Fit', image: Jacket4, price: 3500, category: 'jacket' },
  ];

  const belts = [
    { id: 127, name: '💯Premium Leather Belt', image: Belt1, price: 2000, category: 'belt' },
    { id: 128, name: '💯Premium Leather Belt', image: Belt2, price: 2000, category: 'belt' },
    { id: 129, name: '💯Premium Leather Belt', image: Belt3, price: 2000, category: 'belt' },
    { id: 130, name: '💯Premium Leather Belt', image: Belt4, price: 2000, category: 'belt' },
    { id: 131, name: '💯Premium Leather Belt', image: Belt5, price: 2000, category: 'belt' },
    { id: 132, name: '💯Premium Leather Belt', image: Belt6, price: 2000, category: 'belt' },
    { id: 133, name: '💯Stylish Brown Belt', image: Belt7, price: 2000, category: 'belt' },
    { id: 134, name: '💯Elegant Black Belt', image: Belt8, price: 2000, category: 'belt' },
  ];

  // Categories for display
  const categories = [
    { title: 'Three-Piece Suits', items: threePieceSuits, link: '/suits/3piecesuits' },
    { title: 'Two-Piece Suits', items: twoPieceSuits, link: '/suits/2piecesuits' },
    { title: 'Tuxedo Dinner Suits', items: tuxedoSuits, link: '/suits/tuxedo' },
    { title: 'Kaunda Suits', items: kaundaSuits, link: '/suits/kaunda' },
    { title: 'Official Shirts', items: officialShirts, link: '/shirts/official' },
    { title: 'Polo Shirts', items: poloShirts, link: '/shirts/polo' },
    { title: 'Jeans', items: jeans, link: '/jeans' },
    { title: 'Leather Jackets', items: leatherJackets, link: '/jackets/leather' },
    { title: 'Belts', items: belts, link: '/accessories/belt' },
  ];

  // Handle mouse hover to zoom item
  const handleMouseEnter = (id) => {
    setHoveredItemId(id);
  };

  // Handle mouse leave to remove zoom effect
  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  return (
    <div className="overflow-x-hidden">
      <section className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen overflow-y-auto">
        {/* Size Alert */}
        {showSizeAlert && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center z-50 shadow-lg">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Please select a size before proceeding!</span>
          </div>
        )}

        {/* Categories */}
        {categories.map((category) => (
          <div key={category.title} className="mb-12">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-lg sm:text-xl p-4 sm:p-6 text-center font-bold rounded-xl mb-6 mt-16 mx-2 sm:mx-4 animate-pulse">
              <p>{category.title} – 🔥 Hurry Up!! 🚀 Limited Time Offers! 💯 Wool Fading Free </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={`w-full bg-gray-100 p-4 flex items-center justify-center transition-all duration-300 ${hoveredItemId === item.id ? 'transform scale-105' : ''}`}>
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 sm:h-52 object-contain rounded-lg transition-all duration-300"
                        loading="lazy"
                      />
                    </Link>
                  </div>

                  {/* View More Button (visible on hover) */}
                  {hoveredItemId === item.id && (
                    <div className="absolute top-3 right-3">
                      <Link
                        to={category.link}
                        className="bg-blue-600 text-white py-1 px-3 text-xs sm:text-sm rounded-lg font-semibold hover:bg-blue-700 transition-all"
                      >
                        View More
                      </Link>
                    </div>
                  )}

                  <div className="p-4 text-center space-y-3">
                    <h3 className="text-base sm:text-lg font-bold line-clamp-2">{item.name}</h3>
                    <div className="flex justify-center">
                      <span className="text-blue-600 font-bold text-lg sm:text-xl">Ksh {item.price.toLocaleString()}</span>
                    </div>

                    {/* Sizes - Always visible scrollable container */}
                    {requiresSize(item) && (
                      <div className="flex flex-col items-start space-y-2">
                        <span className={`text-sm font-medium ${sizeError[item.id] ? 'text-red-600' : 'text-gray-700'}`}>
                          {sizeError[item.id] ? 'Select Size (Required)' : 'Select Size'}
                        </span>
                        <div 
                          className={`w-full overflow-x-auto pb-2 permanent-scrollbar ${
                            sizeError[item.id] ? 'border-2 border-red-500 rounded-lg p-1 animate-pulse' : 'border border-gray-200 rounded-lg p-1'
                          }`}
                          style={{ 
                            maxHeight: 'none',
                            minHeight: '60px',
                            display: 'block'
                          }}
                        >
                          <div className="flex space-x-2 min-w-max px-1">
                            {Sizes.map((size) => (
                              <button
                                key={size}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedSizeForSuit((prev) => ({ ...prev, [item.id]: prev[item.id] === size ? undefined : size }));
                                  setSizeError(prev => ({ ...prev, [item.id]: false }));
                                }}
                                className={`px-3 py-2 rounded border text-sm font-medium min-w-[40px] transition-all duration-200 ${
                                  selectedSizeForSuit[item.id] === size
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-400'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="space-y-2 mt-3">
                      <button
                        onClick={(e) => handlePurchaseClick(item, e)}
                        className="w-full bg-green-700 hover:bg-green-800 text-white py-2 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-1 sm:gap-2 transition text-sm sm:text-base"
                      >
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> Purchase
                      </button>
                      <button
                        onClick={(e) => handleAddToCart(item, e)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-1 sm:gap-2 transition text-sm sm:text-base"
                      >
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6 mb-8 px-2 sm:px-0">
              <Link
                to={category.link}
                className="text-lg sm:text-xl font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-2"
              >
                <span>View More</span> <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;