// FILE: main.tsx
// TITLE: Main Application Entry Point

// SECTION: Core Imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './HomePage.tsx';
import './index.css';

// SECTION: DOM Render
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
);
