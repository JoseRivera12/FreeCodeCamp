const {Schema, model} = require("mongoose");

const exerciseSchema = Schema({
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date}
});

const userSchema = new Schema({
    username: {type: String, required: true},
    log: [exerciseSchema]
})

module.exports = model('User', userSchema);