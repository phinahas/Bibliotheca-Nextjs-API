const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: {
    type: Schema.Types.String,
    default: "customer",
    required: true
    //admin,  customer, vendor
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },

  email: {
    type: Schema.Types.String,
    required: true,
  },

  password: {
    type: Schema.Types.String,
    required: true,
  },

  vendorStatus:{
    type: Schema.Types.Boolean,
    default: false,
  }

});

module.exports = mongoose.model("User",userSchema);


//Model for admin and staffs