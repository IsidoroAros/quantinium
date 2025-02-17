import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Home } from './pages/Home';
import { SignTransaction } from './pages/SignTransaction';

/**
 * Root application component that sets up routing and the main layout structure.
 * Includes the navigation bar, main content area with routes, and footer.
 * 
 * @returns {JSX.Element} The rendered application
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col w-screen overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<SignTransaction />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;