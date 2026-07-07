// FILE: main.tsx
// TITLE: Main Application Entry Point with Clean URL Routing

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import MarketPage from './MarketPage.tsx';
import './index.css';

// SECTION: Router Layout Configuration
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route 1: Standard Base Landing Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Route 2: Single Catch Wildcard (Matches State or City Only: e.g. /texas or /indianapolis) */}
        <Route path="/:stateId" element={<MarketPage />} />
        
        {/* Route 3: Deep Local Wildcard (Matches Nested Markets: e.g. /texas/austin or /indiana/indianapolis) */}
        <Route path="/:stateId/:cityId" element={<MarketPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
