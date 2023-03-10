const express = require('express');
const app = express();

// Handle the authorization flow
app.get('/authorize', (req, res) => {
  const redirectUri = encodeURIComponent('https://agent-502.github.io/agents/home.html/callback');
  const clientId = '1083043203751612487';
  const scope = 'identify guilds';
  const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  res.redirect(authUrl);
});

// Handle the callback URL
app.get('/bot/callback', (req, res) => {
  const code = req.query.code;
  const clientId = '1083043203751612487';
  const clientSecret = '7tPGxxV74P2ulyPet-f0_MuolRzNaFq4';
  const redirectUri = encodeURIComponent('https://agent-502.github.io/agents/home.html/callback');
  const tokenUrl = 'https://discord.com/api/oauth2/token';
  
  // Exchange the authorization code for an access token
  fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`
  })
  .then(response => response.json())
  .then(data => {
    const accessToken = data.access_token;
    
    // Use the access token to make requests to the Discord API
    // ...
  });
});

// Start the server
app.listen(3000, () => console.log('Server started.'));
