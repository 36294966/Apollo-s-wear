import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingCart } from 'lucide-react';

/* ========================================================================
   ASSETS (Images)
   ------------------------------------------------------------------------ */
import Photo1 from '../../Assests/Appolo/photo1.jpeg';
import Photo2 from '../../Assests/Appolo/photo2.jpeg';
import Photo3 from '../../Assests/Appolo/photo3.jpeg';
import Photo4 from '../../Assests/Appolo/photo4.jpg';

// Three-Piece suites gallery
import ThreePiece1 from '../../Assests/Suits/threepiece1.jpg';
import ThreePiece2 from '../../Assests/Suits/threepiece2.jpg';
import ThreePiece3 from '../../Assests/Suits/threepiece3.jpg';
import ThreePiece4 from '../../Assests/Suits/threepiece4.jpg';
import ThreePiece5 from '../../Assests/Suits/threepiece5.jpg';
import ThreePiece6 from '../../Assests/Suits/threepiece6.jpg';
import ThreePiece7 from '../../Assests/Suits/threepiece7.jpg';
// ThreePiece8 removed since it's not used
import ThreePiece9 from '../../Assests/Suits/threepiece9.jpg';
import ThreePiece10 from '../../Assests/Suits/threepiece10.jpg';
import ThreePiece11 from '../../Assests/Suits/threepiece11.jpg';
import ThreePiece12 from '../../Assests/Suits/threepiece12.jpg';
import ThreePiece13 from '../../Assests/Suits/threepiece13.jpg';
import ThreePiece14 from '../../Assests/Suits/threepiece14.jpg';
import ThreePiece15 from '../../Assests/Suits/threepiece15.jpg';
import ThreePiece16 from '../../Assests/Suits/threepiece16.jpg';
import ThreePiece17 from '../../Assests/Suits/threepiece17.jpg';
import ThreePiece18 from '../../Assests/Suits/threepiece18.jpg';
import ThreePiece19 from '../../Assests/Suits/threepiece19.jpg';
import ThreePiece20 from '../../Assests/Suits/threepiece20.jpg';
import ThreePiece21 from '../../Assests/Suits/threepiece21.jpg';
import ThreePiece22 from '../../Assests/Suits/threepiece22.jpg';
import ThreePiece23 from '../../Assests/Suits/threepiece23.jpg';
import ThreePiece24 from '../../Assests/Suits/threepiece24.jpg';
import ThreePiece25 from '../../Assests/Suits/threepiece25.jpg';
import ThreePiece26 from '../../Assests/Suits/threepiece26.jpg';
import ThreePiece27 from '../../Assests/Suits/threepiece27.jpg';
import ThreePiece28 from '../../Assests/Suits/threepiece28.jpg';
import ThreePiece29 from '../../Assests/Suits/threepiece29.jpg';
import ThreePiece30 from '../../Assests/Suits/threepiece30.jpg';
import ThreePiece31 from '../../Assests/Suits/threepiece31.jpg';
import ThreePiece32 from '../../Assests/Suits/threepiece32.jpg';
import ThreePiece33 from '../../Assests/Suits/threepiece33.jpg';
import ThreePiece34 from '../../Assests/Suits/threepiece34.jpg';
import ThreePiece35 from '../../Assests/Suits/threepiece35.jpg';
import ThreePiece36 from '../../Assests/Suits/threepiece36.jpg';
import ThreePiece37 from '../../Assests/Suits/threepiece37.jpg';
import ThreePiece38 from '../../Assests/Suits/threepiece38.jpg';
import ThreePiece39 from '../../Assests/Suits/threepiece39.jpg';
import ThreePiece40 from '../../Assests/Suits/threepiece40.jpg';
import ThreePiece41 from '../../Assests/Suits/threepiece41.jpg';
import ThreePiece42 from '../../Assests/Suits/threepiece42.jpg';
import ThreePiece43 from '../../Assests/Suits/threepiece43.jpg';
import ThreePiece44 from '../../Assests/Suits/threepiece44.jpg';
import ThreePiece45 from '../../Assests/Suits/threepiece45.jpg';
import ThreePiece46 from '../../Assests/Suits/threepiece46.jpg';
import ThreePiece47 from '../../Assests/Suits/threepiece47.jpg';
import ThreePiece48 from '../../Assests/Suits/threepiece48.jpg';
import ThreePiece49 from '../../Assests/Suits/threepiece49.jpg';
import ThreePiece50 from '../../Assests/Suits/threepiece50.jpg';

// Two-Piece gallery
import TwoPiece1 from '../../Assests/Suits/twopiece1.jpg';
import TwoPiece2 from '../../Assests/Suits/twopiece2.jpg';
import TwoPiece3 from '../../Assests/Suits/twopiece3.jpg';
import TwoPiece4 from '../../Assests/Suits/twopiece4.jpg';
import TwoPiece5 from '../../Assests/Suits/twopiece5.jpg';
import TwoPiece7 from '../../Assests/Suits/twopiece7.jpg';
import TwoPiece8 from '../../Assests/Suits/twopiece8.jpg';
import TwoPiece9 from '../../Assests/Suits/twopiece9.jpg';

// Double-breast gallery
import DoubleBreast1 from '../../Assests/Suits/doubleBreast1.jpg';
import DoubleBreast2 from '../../Assests/Suits/doubleBreast2.jpg';

// Tuxedo gallery
import Tuxedo1 from '../../Assests/Suits/tuxedo1.jpg';
import Tuxedo2 from '../../Assests/Suits/tuxedo2.jpg';
import Tuxedo3 from '../../Assests/Suits/tuxedo3.jpg';
import Tuxedo4 from '../../Assests/Suits/tuxedo4.jpg';
import Tuxedo5 from '../../Assests/Suits/tuxedo5.jpg';
import Tuxedo6 from '../../Assests/Suits/tuxedo6.jpg';
import Tuxedo7 from '../../Assests/Suits/tuxedo7.jpg';
import Tuxedo8 from '../../Assests/Suits/tuxedo8.jpg';

// Other categories
import Kaunda1 from '../../Assests/Suits/Kaunda1.jpg';
import Kaunda2 from '../../Assests/Suits/kaunda2.jpg';
import Kaunda3 from '../../Assests/Suits/kaunda3.jpg';
import Kaunda4 from '../../Assests/Suits/kaunda4.jpg';

// Official shirts
import official1 from '../../Assests/Official/official1.jpg';
import official2 from '../../Assests/Official/official2.jpg';
import official3 from '../../Assests/Official/official3.jpg';
import official4 from '../../Assests/Official/official4.jpg';
import official5 from '../../Assests/Official/official5.jpg';
import official6 from '../../Assests/Official/official6.jpg';
import official7 from '../../Assests/Official/official7.jpg';
import official8 from '../../Assests/Official/official8.jpg';
import Official9 from '../../Assests/Official/official9.jpg';
import Official10 from '../../Assests/Official/official10.jpg';
import Official11 from '../../Assests/Official/official11.jpg';
import Official12 from '../../Assests/Official/official12.jpg';
import Official13 from '../../Assests/Official/official13.jpg';
import Official14 from '../../Assests/Official/official14.jpg';
import Official15 from '../../Assests/Official/official15.jpg';
import Official16 from '../../Assests/Official/official16.jpg';

// Jeans
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

// Jackets
import Jacket1 from '../../Assests/Jackets/jacket1.jpg';
import Jacket2 from '../../Assests/Jackets/jacket2.jpg';
import Jacket3 from '../../Assests/Jackets/jacket3.jpg';
import Jacket4 from '../../Assests/Jackets/jacket4.webp';

// Belt
import Belt1 from '../../Assests/Accessories/belt1.jpg';
import Belt2 from '../../Assests/Accessories/belt2.jpg';
import Belt3 from '../../Assests/Accessories/belt3.jpg';
import Belt4 from '../../Assests/Accessories/belt4.jpg';
import Belt5 from '../../Assests/Accessories/belt5.jpg';
import Belt6 from '../../Assests/Accessories/belt6.jpg';
import Belt7 from '../../Assests/Accessories/belt7.jpg';
import Belt8 from '../../Assests/Accessories/belt8.jpg';

// Casual
import Cassual1 from '../../Assests/Cassual/cassual1.jpg';
import Cassual2 from '../../Assests/Cassual/cassual2.jpg';
import Cassual3 from '../../Assests/Cassual/cassual3.jpg';
import Cassual4 from '../../Assests/Cassual/cassual4.jpg';
import Cassual5 from '../../Assests/Cassual/cassual5.jpg';
import Cassual6 from '../../Assests/Cassual/cassual6.jpg';

// Socks
import Socks1 from '../../Assests/Accessories/socks1.jpg';
import Socks2 from '../../Assests/Accessories/socks2.jpg';
import Socks3 from '../../Assests/Accessories/socks3.jpg';

// Ties
import Tie1 from '../../Assests/Ties/tie1.jpg';
import Tie2 from '../../Assests/Ties/tie2.jpg';
import Tie3 from '../../Assests/Ties/tie3.jpg';
import Tie4 from '../../Assests/Ties/tie4.jpg';
import Tie5 from '../../Assests/Ties/tie5.jpg';
import Tie6 from '../../Assests/Ties/tie6.jpg';
import Tie7 from '../../Assests/Ties/tie7.jpg';
import Tie8 from '../../Assests/Ties/tie8.jpg';
import Tie9 from '../../Assests/Ties/tie9.jpg';
import Tie10 from '../../Assests/Ties/tie10.jpg';
import Tie11 from '../../Assests/Ties/tie11.jpg';
import Tie12 from '../../Assests/Ties/tie12.jpg';

/* ========================================================================
   DATA: Products
   ====================================================================== */
const products = [
  // Three-Piece items (1 - 35)
  { id: 1, name: 'Executive Three-Piece Suit ⭐⭐⭐⭐⭐', price: 13000, description: 'A beautiful three-piece suit made from premium wool.', category: 'Three-Piece Suits', image: Photo1 },
  { id: 2, name: 'Elegance Fading Free Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Classic suit with a modern touch.', category: 'Three-Piece Suits', image: Photo2 },
  { id: 3, name: 'Premium Fading Free Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Classic suit with a modern touch.', category: 'Three-Piece Suits', image: Photo3 },
  { id: 4, name: 'Classic Pinstripe Ensemble⭐⭐⭐⭐⭐', price: 13000, description: 'A classic pinstripe ensemble for business meetings.', category: 'Three-Piece Suits', image: Photo4 },
  { id: 5, name: 'Modern-Fit Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'A modern, slim-fit three-piece suit with stylish cuts.', category: 'Three-Piece Suits', image: ThreePiece1 },
  { id: 6, name: 'Royal Navy Three-Piece Suit⭐⭐⭐⭐⭐', price: 14500, description: 'A navy blue three-piece suit with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece2 },
  { id: 7, name: 'Luxury Three-Piece Suit ⭐⭐⭐⭐⭐', price: 13000, description: 'Luxury three-piece suit with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece3 },
  { id: 8, name: 'Modern Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Modern three-piece suit with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece4 },
  { id: 9, name: 'Elite Three-Piece Suit ⭐⭐⭐⭐⭐', price: 13000, description: 'Elite three-piece suit with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece5 },
  { id: 10, name: 'Prestige Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Prestige Three-Piece Suit with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece6 },
  { id: 11, name: 'Imperial Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Imperial Three-Piece Suit with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece7 },
  { id: 12, name: 'LuxeLine Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'LuxeLine Three-Piece Suit with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece9 },
  { id: 13, name: 'Sovereign Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Sovereign Three-Piece Suit with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece10 },
  { id: 14, name: 'Heritage Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Heritage Three-Piece Suit with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece11 },
  { id: 15, name: 'Legacy Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Legacy Three-Piece Suit with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece12 },
  { id: 16, name: 'Opulence Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Opulence Heritage Three-Piece Suit with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece14 },
  { id: 17, name: 'Sophistication Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Sophistication Three-Piece Suit with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece15},
  { id: 18, name: 'Couture Classics Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Couture Classics Three-Piece Suit with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece13 },
  { id: 19, name: 'Dignity Collection Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Dignity Collection with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece16 },
  { id: 20, name: 'Vanguard Elite Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Vanguard Elite with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece17 },
  { id: 21, name: 'Summit Suits Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Summit Suits with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece18 },
  { id: 22, name: 'Executive Edge Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Executive Edge with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece19 },
  { id: 23, name: 'Eminence Collection Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Eminence Collection with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece20 },
  { id: 24, name: 'Refined Royalty Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Refined Royalty with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece21 },
  { id: 25, name: 'Pinnacle Series Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Pinnacle Series with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece22 },
  { id: 26, name: 'Urban Aristocrat Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Urban Aristocrat with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece23 },
  { id: 27, name: 'Noble Attire Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Noble Attire with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece24 },
  { id: 28, name: 'Legacy Luxe Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Legacy Luxe with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece25 },
  { id: 29, name: 'Signature Sovereign Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Signature Sovereign with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece26 },
  { id: 30, name: 'Majesty Mode Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Majesty Mode with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece27 },
  { id: 31, name: 'Imperial Attire Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Imperial Attire with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece28 },
  { id: 32, name: 'Monarch Line Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Monarch Line with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece29 },
  { id: 33, name: 'Crown & Confidence Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Crown & Confidence with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece30 },
  { id: 34, name: 'Virtue Vogue Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Virtue Vogue with an elegant finish.', category: 'Three-Piece Suits', image: ThreePiece31 },
  { id: 35, name: 'Couture Select Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece32 },
  { id: 36, name: 'Business Titan Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece33 },
  { id: 37, name: 'Leadership Edition Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece34 },
  { id: 38, name: 'Professional Peak Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece35 },
  { id: 39, name: 'Authority Attire Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece36 },
  { id: 40, name: 'Success Suit Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece37 },
  { id: 41, name: 'Urban Sophisticate Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece38 },
  { id: 42, name: 'Contemporary Classic Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece39 },
  { id: 43, name: 'Trendsetter Edition Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece40 },
  { id: 44, name: 'Fashion Forward Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece41 },
  { id: 45, name: 'New Age Aristocrat Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece42 },
  { id: 46, name: 'Modern Maverick Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece43},
  { id: 47, name: 'Vintage Charm Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece44 },
  { id: 48, name: 'Legacy Collection Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece45 },
  { id: 49, name: 'Master Tailor Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece46 },
  { id: 50, name: 'Ultimate Collection Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece47 },
  { id: 51, name: 'New Age Aristocrat Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece48 },
  { id: 52, name: 'Century Classic Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece49 },
  { id: 53, name: 'Couture Select Three-Piece Suit⭐⭐⭐⭐⭐', price: 13000, description: 'Select couture three-piece.', category: 'Three-Piece Suits', image: ThreePiece50 },


  { id: 54, name: 'Double-Breast Suit Black⭐⭐⭐⭐⭐', price: 13500, description: 'A classic double-breast suit with a modern twist.', category: 'DoubleBreast Suits', image: DoubleBreast1 },
  { id: 55, name: 'Double-Breast Suit Grey⭐⭐⭐⭐⭐', price: 13500, description: 'A refined double-breast suit.', category: 'DoubleBreast Suits', image: DoubleBreast2 },
  
  // Two-Piece items
  { id: 56, name: 'Executive Two-Piece Suit⭐⭐⭐⭐⭐', price: 11000, description: 'A classic two-piece suit with a modern twist.', category: 'TwoPiece Suits', image: TwoPiece1 },
  { id: 57, name: 'Modern Classic Two-Piece Suit⭐⭐⭐⭐⭐', price: 11000, description: 'Modern Classic Two-Piece suit.', category: 'TwoPiece Suits', image: TwoPiece2 },
  { id: 58, name: 'Slim Two-Piece Suit⭐⭐⭐⭐⭐', price: 11000, description: 'Slim, modern two-piece.', category: 'TwoPiece Suits', image: TwoPiece3 },
  { id: 59, name: 'Heritage Two-Piece Suit⭐⭐⭐⭐⭐', price: 11000, description: 'Heritage two-piece design.', category: 'TwoPiece Suits', image: TwoPiece4 },
  { id: 60, name: '💯 Super Classic Two-Piece Suit⭐⭐⭐⭐⭐', price: 11000, description: '💯 Super Classic two-piece design.', category: 'TwoPiece Suits', image: TwoPiece5 },
  { id: 61, name: 'Modern Two Two-Piece Suit⭐⭐⭐⭐⭐', price: 11000, description: 'Modern two-piece design.', category: 'TwoPiece Suits', image: TwoPiece7 },
  { id: 62, name: 'Premium Two-Piece Suit⭐⭐⭐⭐⭐', price: 11000, description: 'Premium two-piece design.', category: 'TwoPiece Suits', image: TwoPiece8},
  { id: 63, name: 'Elegant Two-Piece Suit⭐⭐⭐⭐⭐', price: 11000, description: 'Elegant two-piece design.', category: 'TwoPiece Suits', image: TwoPiece9},

  // Tuxedo items
  { id: 64, name: 'Velvet Tuxedo Suit ⭐⭐⭐⭐⭐', price: 15000, description: 'Gorgeous velvet tuxedo for formal events.', category: 'Tuxedo Dinner Suits', image: Tuxedo1 },
  { id: 65, name: 'Midnight Tuxedo Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Midnight tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo2 },
  { id: 66, name: 'Ensemble Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Ensemble tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo3 },
  { id: 67, name: 'Classic Tuxedo Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Classic tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo4 },
  { id: 68, name: 'Slim  Tuxedo Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Slim and stylish tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo5 },
  { id: 69, name: 'Designer Tuxedo Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Designer tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo6 },
  { id:70, name: 'Royal  Tuxedo Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Royal tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo7 },
  { id:71, name: 'Premium Tuxedo Suit⭐⭐⭐⭐⭐', price: 15000, description: 'Slim and stylish tuxedo, perfect for high-profile events.', category: 'Tuxedo Dinner Suits', image: Tuxedo8 },
  
  // Kaunda suits
  { id: 72, name: 'Classic Kaunda Suit', price: 14000, description: 'A stylish Kaunda suit perfect for formal African occasions.', category: 'Kaunda Suits', image: Kaunda1 },
  { id: 73, name: 'Royal Kaunda Suit', price: 14000, description: 'A stylish Kaunda suit perfect for formal African occasions.', category: 'Kaunda Suits', image: Kaunda2 },
  { id: 74, name: 'Modern Kaunda Suit', price: 14000, description: 'A stylish Kaunda suit perfect for formal African occasions.', category: 'Kaunda Suits', image: Kaunda3 },
  { id: 75, name: 'Elegant Kaunda Suit', price: 14000, description: 'A stylish Kaunda suit perfect for formal African occasions.', category: 'Kaunda Suits', image: Kaunda4 },
  
  // Official Shirts
  { id: 76, name: 'Presidential Shirt', price: 3000, description: '⭐⭐⭐⭐⭐ A Presidential Shirt perfect for formal African occasions.', category: 'Official Shirt', image: official1 },
  { id: 77, name: 'Presidential Shirt', price: 3000, description: '⭐⭐⭐⭐⭐ A Presidential Shirt perfect for formal African occasions.', category: 'Official Shirt', image: official2 },
  { id: 78, name: 'Presidential Shirt', price: 3000, description: '⭐⭐⭐⭐⭐ A Presidential Shirt perfect for formal African occasions.', category: 'Official Shirt', image: official3 },
  { id: 79, name: 'Presidential Shirt', price: 3000, description: '⭐⭐⭐⭐⭐ A Presidential Shirt perfect for formal African occasions.', category: 'Official Shirt', image: official4 },
  { id: 80, name: 'French Cuff Shirt', price: 1800, description: '⭐⭐⭐⭐⭐ Official Shirt perfect for formal African occasions.', category: 'Official Shirt', image: official5 },
  { id: 81, name: 'Slim Fit Shirt', price: 1800, description: '⭐⭐⭐⭐⭐ Official Shirt perfect for formal African occasions.', category: 'Official Shirt', image: official6 },
  { id: 82, name: 'Double Cuff Shirt', price: 1800, description: '⭐⭐⭐⭐⭐ Official Shirt perfect for formal African occasions.', category: 'Official Shirt', image: official7 },
  { id: 83, name: 'Designer Collar Shirt', price: 1800, description: '⭐⭐⭐⭐⭐ Official Shirt perfect for formal African occasions.', category: 'Official Shirt', image: official8 },
  { id: 84, name: 'Executive Checkered Shirt', price: 1800, description: '⭐⭐⭐⭐⭐ Official Shirt perfect for formal African occasions.', category: 'Official Shirt', image: Official9 },
  { id: 85, name: 'Silk Blend Formal', price: 1800, description: '⭐⭐⭐⭐⭐ Official Shirt perfect for formal African occasions.', category: 'Official Shirt', image: Official10 },
  { id: 86, name: 'Premium Twill Shirt', price: 1800, description: '⭐⭐⭐⭐⭐ Official Shirt perfect for formal African occasions.', category: 'Official Shirt', image: Official10 },
  { id: 87, name: 'Classic Spread Collar', price: 1800, description: '⭐⭐⭐⭐⭐ Official Shirt perfect for formal African occasions.', category: 'Official Shirt', image: Official11},
  { id: 88, name: 'Luxury Official Shirt', price: 1800, description: '⭐⭐⭐⭐⭐ Official Shirt perfect for formal African occasions.', category: 'Official Shirt', image: Official12},
  { id: 89, name: 'Sophistic Official Shirt', price: 1800, description: '⭐⭐⭐⭐⭐ Official Shirt perfect for formal African occasions.', category: 'Official Shirt', image: Official13 },
  { id: 90, name: 'Classic Official Shirt', price: 1800, description: '⭐⭐⭐⭐⭐ Official Shirt perfect for formal African occasions.', category: 'Official Shirt', image: Official14 },
  { id: 91, name: 'Exclusive Official Shirt', price: 1800, description: '⭐⭐⭐⭐⭐ Official Shirt perfect for formal African occasions.', category: 'Official Shirt', image: Official15},
  { id: 92, name: 'Signature Dress Shirt', price: 1800, description: '⭐⭐⭐⭐⭐ Official Shirt perfect for formal African occasions.', category: 'Official Shirt', image: Official16},


  { id: 93, name: '🔥Urban Streetwear Shirt', price: 1700, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Cassual Shirt', image: Cassual1},
  { id: 94, name: '🔥Designer Denim Casual', price: 1700, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Cassual Shirt', image: Cassual2},
  { id: 95, name: '🔥Premium Linen Blend', price: 1700, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Cassual Shirt', image: Cassual3},
{ id: 96, name: 'Athletic Fit Performance Polo ⭐⭐⭐⭐⭐', image: Cassual4, price: 1800, category: 'shirt' },
{ id: 97, name: 'Boutique Collection Polo ⭐⭐⭐⭐⭐', image: Cassual5, price: 1800, category: 'shirt' },
{ id: 98, name: 'Essential Everyday Polo ⭐⭐⭐⭐⭐', image: Cassual6, price: 1800, category: 'shirt' },


  // Jeans
  { id: 99, name: 'Slim Fit Jean', price: 2000, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jeans', image: Jean1 },
  { id: 100, name: 'Vintage Jean', price: 2000, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jeans', image: Jean2 },
  { id: 101, name: 'Ripped Skinny Jean', price: 2000, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jeans', image: Jean3},
  { id: 102, name: 'Classic Straight Jean', price: 2000, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jeans', image: Jean4 },
  { id: 103, name: 'High Super Jean', price: 2000, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jeans', image: Jean5 },
  { id: 104, name: 'Black Stretch Jean', price: 2000, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jeans', image: Jean6 },
  { id: 105, name: 'Classic Jean', price: 2000, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jeans', image: Jean7 },
  { id: 106, name: 'Tapered Cargo Jean', price: 2000, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jeans', image: Jean8 },
  { id: 107, name: '💯Flare Jean', price: 2000, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jeans', image: Jean9 },
  { id: 108, name: 'Selvedge Denim Jean', price: 2000, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jeans', image: Jean10 },
  { id: 109, name: '💯 Super Jean', price: 2000, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jeans', image: Jean11 },
  { id: 110, name: 'Stretch Skinny Fit Jean', price: 2000, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jeans', image: Jean12 },
   { id: 111, name: ' Heritage Fit👖', image: Jean13, price: 1850, category: 'jeans' },
    { id: 112, name: 'Foundation Jean👖', image: Jean14, price: 1850, category: 'jeans' },
    { id: 113, name: 'The Original Fit👖', image: Jean15, price: 1850, category: 'jeans' },
    { id: 114, name: 'The Standard Fit👖', image: Jean16, price: 1850, category: 'jeans' },
    { id: 115, name: 'The Athletic Taper👖', image: Jean17, price: 1850, category: 'jeans' },
    { id: 116, name: 'Slim Utility👖', image: Jean18, price: 1850, category: 'jeans' },
    { id: 117, name: 'Commuter Jean👖', image: Jean19, price: 1850, category: 'jeans' },
    { id: 118, name: 'Weeknight Jean👖', image: Jean20, price: 1850, category: 'jeans' },
    { id: 119, name: 'The Modern Straight👖', image: Jean21, price: 1850, category: 'jeans' },
    { id: 120, name: 'The All-Day Jean👖', image: Jean22, price: 1850, category: 'jeans' },
    { id: 121, name: 'The Craftsman👖', image: Jean23, price: 1850, category: 'jeans' },
    { id: 122, name: 'The Brawny Utility Fit👖', image: Jean24, price: 1850, category: 'jeans' },
  // Jackets
  { id: 123, name: '🔥Leather Jacket - Classic', price: 3500, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jacket', image: Jacket1 },
  { id: 124, name: '🔥Leather Jacket - Premium', price: 3500, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jacket', image: Jacket2 },
  { id: 125, name: '🔥Leather Jacket - Modern Fit', price: 3500, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jacket', image: Jacket3 },
  { id: 126, name: '🔥Leather Jacket - Elegant Fit', price: 3500, description: '🔥 Versatile: Ideal for any occasion—whether it\'s a casual day out or a night on the town.', category: 'Jacket', image: Jacket4},

 
  // Belts
  { id: 127, name: '🔥Premium Leather Belt', price: 2000, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Belt', image: Belt1},
  { id: 128, name: '🔥Premium Black Belt', price: 2000, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Belt', image: Belt2},
  { id: 129, name: '🔥Premium Leather Belt', price: 2000, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Belt', image: Belt3},
  { id: 130, name: '🔥Premium Leather Belt', price: 2000, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Belt', image: Belt4},
  { id: 131, name: '🔥Premium Leather Belt', price: 2000, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Belt', image: Belt5},
  { id: 132, name: '🔥Premium Leather Belt', price: 2000, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Belt', image: Belt6},
  { id: 133, name: '🔥Stylish Brown Belt', price: 2000, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Belt', image: Belt7},
  { id: 134, name: '🔥Elegant Black Belt', price: 2000, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Belt', image: Belt8},

  
  
  // Socks
  { id: 142, name: '🔥Cotton Socks', price: 300, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Socks', image: Socks1},
  { id: 143, name: '🔥Formal Dress Sock', price: 300, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Socks', image: Socks2},
  { id: 144, name: '🔥Colorful Crew Socks', price: 300, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Socks', image: Socks3},

  // Ties 
  { id: 145, name: '🔥Silk Business Tie', price: 800, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Ties', image: Tie1},
  { id: 146, name: '🔥Patterned Formal Tie', price: 800, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Ties', image: Tie2},
  { id: 147, name: '🔥Classic Windsor Tie', price: 800, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Ties', image: Tie3},
  { id: 148, name: '🔥Executive Striped Tie', price: 800, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Ties', image: Tie4},
  { id: 149, name: '🔥Luxury Silk Tie', price: 800, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Ties', image: Tie5},
  { id: 150, name: '🔥Modern Tie', price: 800, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Ties', image: Tie6},
  { id: 151, name: '🔥Bold Color Tie', price: 800, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Ties', image: Tie7},
  { id: 152, name: '🔥Knit Tie', price: 800, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Ties', image: Tie8},
  { id: 153,name: '🔥Designer Tie', price: 800, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Ties', image: Tie9},
  { id: 154, name: '🔥Glamorous Tie', price: 800, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Ties', image: Tie10},
  { id: 155, name: '🔥Classic Necktie', price: 800, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Ties', image: Tie11},
  { id: 156, name: '🔥Formal Tie', price: 800, description: '🌟 Adjustable Fit: Perfect for all waist sizes with a reliable, sturdy buckle that ensures comfort and security.', category: 'Ties', image: Tie12},
];

/* ========================================================================
   SUIT SIZE UTILS
   ====================================================================== */
const suitCategories = ['Three-Piece Suits', 'TwoPiece Suits', 'Tuxedo Dinner Suits', 'Kaunda Suits', 'DoubleBreast Suits'];
const suitSizes = [42, 44, 46, 48, 50, 52, 54, 56, 58, 60];

/* ========================================================================
   COMPONENT: ProductDetail
   ====================================================================== */
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const numericId = Number(id);
    const p = products.find((p) => p.id === numericId);
    setProduct(p || null);
  }, [id]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  if (!product) return <div className="p-4 text-center">Loading...</div>;

  const handleSizeSelection = (productId, size) => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // If selecting a size for a different product, clear the previous selection
    if (selectedProductId && selectedProductId !== productId) {
      setSelectedSize(null);
      setSelectedProductId(null);
    }

    // Set the new selection
    setSelectedSize(size);
    setSelectedProductId(productId);

    // Set timeout to automatically clear the selection after 30 seconds
    const newTimeoutId = setTimeout(() => {
      setSelectedSize(null);
      setSelectedProductId(null);
    }, 30000); // 30 seconds

    setTimeoutId(newTimeoutId);
  };

  const handlePurchase = (item) => {
    const itemSize = selectedProductId === item.id ? selectedSize : null;
    
    // Save the direct purchase to localStorage
    const purchaseData = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      category: item.category,
      size: itemSize,
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
    
    // Clear timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    
    // Reset selection
    setSelectedSize(null);
    setSelectedProductId(null);
  };

  const handleAddToCart = (item) => {
    const itemSize = selectedProductId === item.id ? selectedSize : null;
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
        size: itemSize,
        quantity: 1,
        addedAt: new Date().toISOString(),
      };
      newCart = [...storedCart, newItem];
    }
    
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
    
    alert(`${item.name}${itemSize ? ` (Size ${itemSize})` : ''} ${existingItemIndex >= 0 ? 'quantity updated in' : 'added to'} cart`);
    
    // Clear timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    
    // Reset selection
    setSelectedSize(null);
    setSelectedProductId(null);
  };

  const similarProducts = (() => {
    const excludeId = product.id;
    
    // Socks category
    if (product.category === 'Socks') {
      let primary = products.filter((p) => p.category === 'Socks' && p.id !== excludeId).slice(0, 8);
      if (primary.length < 8) {
        const filler = products.filter((p) => p.category !== 'Socks' && p.id !== excludeId).slice(0, 8 - primary.length);
        primary = [...primary, ...filler];
      }
      return primary.slice(0, 8);
    }
    
    // Ties category
    if (product.category === 'Ties') {
      let primary = products.filter((p) => p.category === 'Ties' && p.id !== excludeId).slice(0, 8);
      if (primary.length < 8) {
        const filler = products.filter((p) => p.category !== 'Ties' && p.id !== excludeId).slice(0, 8 - primary.length);
        primary = [...primary, ...filler];
      }
      return primary.slice(0, 8);
    }
    
    // Belt category
    if (product.category === 'Belt') {
      let primary = products.filter((p) => p.category === 'Belt' && p.id !== excludeId).slice(0, 8);
      if (primary.length < 8) {
        const filler = products.filter((p) => p.category !== 'Belt' && p.id !== excludeId).slice(0, 8 - primary.length);
        primary = [...primary, ...filler];
      }
      return primary.slice(0, 8);
    }
    
    // Cassual Shirt category
    if (product.category === 'Cassual Shirt') {
      let primary = products.filter((p) => p.category === 'Official Shirt' && p.id !== excludeId).slice(0, 8);
      if (primary.length < 8) {
        const filler = products.filter((p) => p.category !== 'Official Shirt' && p.id !== excludeId).slice(0, 8 - primary.length);
        primary = [...primary, ...filler];
      }
      return primary.slice(0, 8);
    }

    // Jacket category
    if (product.category === 'Jacket') {
      let primary = products.filter((p) => p.category === 'Jacket' && p.id !== excludeId).slice(0, 8);
      if (primary.length < 8) {
        const filler = products.filter((p) => p.category !== 'Jacket' && p.id !== excludeId).slice(0, 8 - primary.length);
        primary = [...primary, ...filler];
      }
      return primary.slice(0, 8);
    }
    
    // Jeans category
    if (product.category === 'Jeans') {
      let primary = products.filter((p) => p.category === 'Jeans' && p.id !== excludeId).slice(0, 8);
      if (primary.length < 8) {
        const filler = products.filter((p) => p.category !== 'Jeans' && p.id !== excludeId).slice(0, 8 - primary.length);
        primary = [...primary, ...filler];
      }
      return primary.slice(0, 8);
    }

    // Official Shirt category
    if (product.category === 'Official Shirt') {
      let primary = products.filter((p) => p.category === 'Official Shirt' && p.id !== excludeId).slice(0, 8);
      if (primary.length < 8) {
        const filler = products.filter((p) => p.category !== 'Official Shirt' && p.id !== excludeId).slice(0, 8 - primary.length);
        primary = [...primary, ...filler];
      }
      return primary.slice(0, 8);
    }

    // Tuxedo Dinner Suits category
    if (product.category === 'Tuxedo Dinner Suits') {
      let primary = products.filter((p) => p.category === 'Tuxedo Dinner Suits' && p.id !== excludeId).slice(0, 8);
      if (primary.length < 8) {
        const filler = products.filter((p) => p.id !== excludeId && !primary.some((s) => s.id === p.id)).slice(0, 8 - primary.length);
        primary = [...primary, ...filler];
      }
      return primary.slice(0, 8);
    }

    // Kaunda Suits category
    if (product.category === 'Kaunda Suits') {
      let primary = products.filter((p) => p.category === 'Kaunda Suits' && p.id !== excludeId).slice(0, 4);
      if (primary.length < 4) {
        const filler = products.filter((p) => p.category !== 'Kaunda Suits' && p.id !== excludeId).slice(0, 4 - primary.length);
        primary = [...primary, ...filler];
      }
      return primary.slice(0, 4);
    }

    // TwoPiece Suits category
    if (product.category === 'TwoPiece Suits') {
      let primary = products.filter((p) => p.category === 'TwoPiece Suits' && p.id >= 38 && p.id !== excludeId).slice(0, 4);
      if (primary.length < 4) {
        const needed = 4 - primary.length;
        const filler = products.filter((p) => p.category === 'Three-Piece Suits' && p.id !== excludeId && !primary.some((s) => s.id === p.id)).slice(0, needed);
        primary = [...primary, ...filler];
      }
      return primary.slice(0, 4);
    }

    // Three-Piece Suits category
    if (product.category === 'Three-Piece Suits') {
      let primary = products.filter((p) => p.category === 'Three-Piece Suits' && p.id !== excludeId).slice(0, 8);
      if (primary.length < 8) {
        const filler = products.filter((p) => p.id !== excludeId && !primary.some((s) => s.id === p.id)).slice(0, 8 - primary.length);
        primary = [...primary, ...filler];
      }
      return primary.slice(0, 8);
    }

    return [];
  })();

  return (
    <section className="p-6 sm:p-10 bg-gray-50 min-h-screen relative">
      {/* -------------------- Cart link -------------------- */}
      <div className="flex justify-end mb-4 sticky top-0 bg-gray-50 z-10">
        <Link to="/cart" className="relative flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold text-xl px-4 py-2 rounded-lg bg-white shadow hover:shadow-lg transition">
          <ShoppingCart className="w-6 h-6" />
          <span>Cart</span>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs  font-bold">
            {JSON.parse(localStorage.getItem('cart'))?.length || 0}
          </div>
        </Link>
      </div>

      {/* -------------------- Product Details -------------------- */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto">
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="w-full max-h-[520px] object-contain rounded-lg transition-transform hover:scale-105" />
        </div>

        <div className="w-full md:w-1/2 p-6 mt-8 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-xl text-blue-600 font-bold">Ksh {product.price}</p>
          <p className="text-md sm:text-base text-gray-700">{product.description}</p>

          {/* -------------------- Sizes for Suits Only -------------------- */}
          {suitCategories.includes(product.category) && (
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Select Size:</h4>
              <div className="flex overflow-x-auto space-x-3 pb-2">
                {suitSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelection(product.id, size)}
                    className={`px-4 py-2 rounded-lg border font-semibold whitespace-nowrap transition ${
                      selectedProductId === product.id && selectedSize === size ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedProductId === product.id && selectedSize && (
                <p className="text-sm text-gray-500 mt-2">
                  Size {selectedSize} selected. Will auto-clear in 30 seconds.
                </p>
              )}
            </div>
          )}

          {/* -------------------- Actions -------------------- */}
          <div className="mt-6 space-y-4">
            <button onClick={() => handlePurchase(product)} className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Purchase Now
            </button>

            <button onClick={() => handleAddToCart(product)} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* -------------------- Similar Products -------------------- */}
      <div className="mt-12 max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-6 text-black blinking-text">You Might Also Like 🛒</h3>

        <style>{`
          @keyframes slowBlink {
            20%, 100% { opacity: 1; }
            80% { opacity: 0; }
          }
          .blinking-text {
            animation: slowBlink 3s ease-in-out infinite;
          }
        `}</style>

        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}>
          {similarProducts.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden p-4 flex flex-col justify-between">
              <Link to={`/product/${item.id}`} onClick={() => window.scrollTo(0, 0)}>
                <div className="h-64 bg-gray-100 flex items-center justify-center mb-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded-lg" />
                </div>
              </Link>

              <div className="text-center space-y-3">
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-blue-600 font-bold text-xl">Ksh {item.price}</p>

                {/* Sizes for suits in similar products */}
                {suitCategories.includes(item.category) && (
                  <div className="flex overflow-x-auto space-x-2 pb-2 justify-center">
                    {suitSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeSelection(item.id, size)}
                        className={`px-3 py-1 rounded-md border font-semibold whitespace-nowrap transition ${
                          selectedProductId === item.id && selectedSize === size ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}

                <button onClick={() => handlePurchase(item)} className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm">
                  <CheckCircle className="w-5 h-5" />
                  Purchase Now
                </button>

                <button onClick={() => handleAddToCart(item)} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -------------------- Back to Home -------------------- */}
      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold text-xl">
          Back to Home
        </Link>
      </div>
    </section>
  );
};
 
export default ProductDetail;