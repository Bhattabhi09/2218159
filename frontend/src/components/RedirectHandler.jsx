import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('shortLinks') || '[]');
    const match = stored.find(link => link.shortcode === shortcode);
    if (match) {
      match.clicks.push({
        timestamp: new Date().toISOString(),
        source: document.referrer || 'direct',
        location: 'India' // mock location
      });
      localStorage.setItem('shortLinks', JSON.stringify(stored));
      window.location.replace(match.longUrl);
    } else {
      alert('Shortcode not found.');
    }
  }, [shortcode]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
