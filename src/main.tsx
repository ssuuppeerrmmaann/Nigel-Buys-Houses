// FILE: main.tsx
// TITLE: Main Application Entry Point with Hash Routing

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import IndianaPage from './IndianaPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/indiana" element={<IndianaPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
