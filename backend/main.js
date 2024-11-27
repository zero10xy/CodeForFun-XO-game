const express = require("express");
const path = require('path');

const https = require('https');
const fs = require('fs');

const app = express();

// --- configs

const PORT = process.env.PORT || 3000;
app.use(express.json())

const options = { 
    key: fs.readFileSync('./keys/key.pem'),
    cert: fs.readFileSync('./keys/cert.pem'),
}; 				  // Load SSL certificates

// --- imports

const xo = require("./game/site")
const games = new xo();

// --- frontend

app.use(express.static(path.join(__dirname, '../frontend')));

// --- Endpoints

app.post('/game', (req, res) => {
    
    console.log('/game');
    console.log("req", req.body);
    let rs = games.request_game(req.body);
    console.log("res", rs);
    console.log();
    res.send(rs);
    
});

app.post('/play', (req, res) => {
    
    console.log('/play');
    console.log("req", req.body);
    let rs = games.request_play(req.body);
    console.log("res", rs);
    console.log();
    res.send(rs);
    
});

app.post('/sync', (req, res) => {
    
    console.log('/sync');
    console.log("req", req.body);
    let rs = games.request_sync(req.body);
    console.log("res", rs);
    console.log();
    res.send(rs);
    
});

app.post('/move', (req, res) => {
    
    console.log('/play');
    console.log("req", req.body);
    let rs = games.request_move(req.body);
    console.log("res", rs);
    console.log();
    res.send(rs);
    
});



// --- Runs

https.createServer(options, app).listen(PORT, () => {
  console.log('HTTPS Server running at PORT', PORT);
});
