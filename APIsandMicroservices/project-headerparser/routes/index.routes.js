const router = require("express").Router();

// Test API 
router.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});

// Returns info about request 
router.get("/api/whoami", (req, res) => {
    const remoteAddress = req.ip;
    const language = req.headers["accept-language"]
    const userAgent = req.headers["user-agent"]
    res.json({ ipaddress: remoteAddress, language: language, software: userAgent })
})

module.exports = router;