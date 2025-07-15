import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { isValidURL } from '../utils/validators';
import { useLogger } from '../hooks/useLogger';

const URLShortenerForm = () => {
  const logger = useLogger();
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const generateShortCode = () => {
    return Math.random().toString(36).substr(2, 6);
  };

  const handleSubmit = () => {
    const data = urls.map((entry) => {
      if (!isValidURL(entry.longUrl)) {
        alert('Invalid URL format');
        return null;
      }
      const shortcode = entry.shortcode || generateShortCode();
      const validity = parseInt(entry.validity) || 30;
      const createdAt = new Date();
      const expiresAt = new Date(createdAt.getTime() + validity * 60000);

      const shortEntry = {
        longUrl: entry.longUrl,
        shortcode,
        validity,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        clicks: []
      };

      logger('URL_SHORTENED', shortEntry);
      return shortEntry;
    }).filter(Boolean);

    const all = JSON.parse(localStorage.getItem('shortLinks') || '[]');
    localStorage.setItem('shortLinks', JSON.stringify([...all, ...data]));
    setResults(data);
  };

  return (
    <Grid container spacing={2} direction="column">
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((entry, index) => (
        <Grid item key={index}>
          <TextField label="Long URL" value={entry.longUrl} onChange={(e) => handleChange(index, 'longUrl', e.target.value)} fullWidth sx={{ mb: 1 }} />
          <TextField label="Validity (mins)" value={entry.validity} onChange={(e) => handleChange(index, 'validity', e.target.value)} type="number" sx={{ mb: 1 }} />
          <TextField label="Custom Shortcode" value={entry.shortcode} onChange={(e) => handleChange(index, 'shortcode', e.target.value)} sx={{ mb: 2 }} />
        </Grid>
      ))}
      {urls.length < 5 && <Button onClick={() => setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }])}>Add Another</Button>}
      <Button variant="contained" onClick={handleSubmit}>Shorten URLs</Button>
      <Grid item>
        {results.map((res, i) => (
          <Typography key={i}>
            Short URL: <a href={`/s/${res.shortcode}`}>{window.location.origin}/s/{res.shortcode}</a> (expires at {res.expiresAt})
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default URLShortenerForm;
