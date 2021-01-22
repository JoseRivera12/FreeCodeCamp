const router = require("express").Router();

const {newExercise, getLogs} = require('../controllers/exercise.controller');

router.post('/api/exercise/add', newExercise);

router.get('/api/exercise/log', getLogs);

module.exports = router;