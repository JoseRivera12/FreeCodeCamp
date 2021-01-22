const {Schema, model} = require("mongoose");

const exerciseSchema = Schema({
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date}
});

module.exports = model('Exercise', exerciseSchema);