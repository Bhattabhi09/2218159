import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent } from '@mui/material';

const URLStatsPage = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('shortLinks') || '[]');
    setLinks(stored);
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Shortened URLs Statistics</Typography>
      {links.map((link, i) => (
        <Card key={i} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>Short URL: <a href={`/s/${link.shortcode}`}>{window.location.origin}/s/{link.shortcode}</a></Typography>
            <Typography>Created: {link.createdAt}</Typography>
            <Typography>Expires: {link.expiresAt}</Typography>
            <Typography>Clicks: {link.clicks.length}</Typography>
            <ul>
              {link.clicks.map((click, j) => (
                <li key={j}>{click.timestamp} from {click.source} ({click.location})</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default URLStatsPage;
