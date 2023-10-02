const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const counterSchema = new Schema({
    count:{
        type:Schema.Types.Number
    }
})

module.exports = mongoose.model("Counter",counterSchema)
