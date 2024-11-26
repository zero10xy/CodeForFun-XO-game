const express = require("express");
const path = require('path');

const app = express();

// --- configs

const PORT = process.env.PORT || 3000;
app.use(express.json())

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

app.listen(PORT, async (error) => {
    if (error) { console.log(error); }
    console.log(`Server listening on port ${PORT}`);
});
