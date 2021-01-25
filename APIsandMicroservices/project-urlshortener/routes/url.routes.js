const router = require("express").Router();

//Controller
const {sayHello, newUrl, getUrl} = require('../controllers/url.controller');

router.get('/api/hello', sayHello);

router.post('/api/shorturl/new', newUrl);

router.get('/api/shorturl/:id', getUrl);

module.exports = router;