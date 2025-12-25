import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Valentines2025 from './pages/Valentines2025';
import Anniversary1Month from './pages/Anniversary1Month';
import Anniversary6Months from './pages/Anniversary6Months';
import Birthday2025 from './pages/Birthday2025';
import MovingHome2025 from './pages/MovingHome2025';
import Christmas2025 from './pages/Christmas2025';

function App() {
  // Get basename from package.json homepage or default to root
  const basename = process.env.PUBLIC_URL || '';
  
  return (
    <Router basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jordan/valentines-2025" element={<Valentines2025 />} />
          <Route path="/jordan/anniversary-1month" element={<Anniversary1Month />} />
          <Route path="/jordan/anniversary-6mths" element={<Anniversary6Months />} />
          <Route path="/jordan/christmas-2025" element={<Christmas2025 />} />
          <Route path="/alexandria/birthday-2025" element={<Birthday2025 />} />
          <Route path="/parents/moving-home-2025" element={<MovingHome2025 />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
