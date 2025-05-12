import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PhoneListPage from './pages/PhoneListPage';
import PhoneDetailsPage from './pages/PhoneDetailsPage';
import Header from './components/Header';
import { BasketProvider } from './context/BasketContext';

function App() {
  return (
      <BasketProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<PhoneListPage />} />
                <Route path="/phone/:deviceName" element={<PhoneDetailsPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </BasketProvider>
  );
}

export default App;