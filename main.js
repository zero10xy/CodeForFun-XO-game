const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000; // use port 3000 incase PORT isnt specified in env

// MIDDLEWARE //
app.use(express.json()) // use JSON for requests and responses

app.get("/",  (req, res) => {
    console.log("Status checked from origin: " + req.headers.origin);
    res.status(200).json({ status: "ONLINE", memory: process.memoryUsage(), availableMemory: process.availableMemory() });
});

// Listen for HTTP requests on port
app.listen(PORT, async (error) => {
    if (error) { console.log(error); }
    console.log(`Server listening on port ${PORT}`);
});
