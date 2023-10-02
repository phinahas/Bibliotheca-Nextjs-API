const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
 
  name: {
    type: Schema.Types.String,
    required: true,
  },

  author: {
    type: Schema.Types.String,
    required: true,
  },

  description: {
    type: Schema.Types.String,
    required: true,
  },

  image: {
    type: Schema.Types.String,
    required: true,
  },

  price: {
    type: Schema.Types.String,
    required: true,
  },

  vendor:{

        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'

  }, 
  
  status:{
    type: Schema.Types.Boolean,
    default: false
  }

});


module.exports = mongoose.model("Book",bookSchema)

//Model for admin and staffs