import React from 'react';
import { Routes, Route } from 'react-router-dom';
import URLShortenerForm from '../components/URLShortenerForm';
import URLStatsPage from '../components/URLStatsPage';
import RedirectHandler from '../components/RedirectHandler';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<URLShortenerForm />} />
    <Route path="/stats" element={<URLStatsPage />} />
    <Route path="/s/:shortcode" element={<RedirectHandler />} />
  </Routes>
);

export default AppRoutes;
