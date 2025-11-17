import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; 
import Layout from './Components/layout'; 
import Home from './Pages/home';

import TwoPieceSuits from './Components/Suits/2piecesuits'; 
import ThreePieceSuits from './Components/Suits/3piecesuits'; 
import KaundaSuits from './Components/Suits/kaundo'; 
import Tuxedo from './Components/Suits/tuxedo';

import Belt from './Components/Accessories/belt'; 
import Socks from './Components/Accessories/socks'; 
import Ties from './Components/Accessories/ties';

import Cassual from './Components/Shirts/cassualshirts'; 
import Official from './Components/Shirts/officialshirts';

import Cart from './Components/cart'; 
import Jeans from './Components/Jeans/jeans'; 
import Leather from './Components/Leather/leather'; 
import Payment from './Components/Payment/checkout'; 
import ProductDetails from './Components/Product/productDetails';
import Checkout from './Components/Payment/checkout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          
          {/* Suit Routes */}
          <Route path="/suits/2piecesuits" element={<TwoPieceSuits />} />
          <Route path="/suits/3piecesuits" element={<ThreePieceSuits />} />
          <Route path="/suits/tuxedo" element={<Tuxedo />} />
          <Route path="/suits/kaunda" element={<KaundaSuits />} />
          
          {/* Accessories Routes */}
          <Route path="/accessories/belt" element={<Belt />} />
          <Route path="/accessories/socks" element={<Socks />} />
          <Route path="/accessories/ties" element={<Ties />} />
          
          {/* Shirt Routes - Fixed the path from /shirts/cassual to /shirts/casual */}
          <Route path="/shirts/casual" element={<Cassual />} />
          <Route path="/shirts/official" element={<Official />} />
          
          {/* Other Categories Routes */}
          <Route path="/jackets/leather" element={<Leather />} />
          <Route path="/jeans" element={<Jeans />} />
          
          {/* Cart and Payment Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Product Detail Route */}
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
