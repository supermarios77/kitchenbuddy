import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import App from './components/App';
import RecipePage from './components/RecipePage';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recipes/:recipeId" element={<RecipePage />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>
);



