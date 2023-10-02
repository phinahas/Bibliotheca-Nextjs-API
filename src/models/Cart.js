const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },

  book: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:'Book'
  },
});


module.exports = mongoose.model("Cart",cartSchema)


