const router = require("express").Router();

//Controller
const {newUser, getUsers} = require("../controllers/user.controller");

router.post('/api/exercise/new-user', newUser);

router.get('/api/exercise/users', getUsers);

module.exports = router;