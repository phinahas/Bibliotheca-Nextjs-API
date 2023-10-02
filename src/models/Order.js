const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId: {
        type: Schema.Types.Number,   
        //required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    book: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    status: {
        type: Schema.Types.String,
        required: true,
        default: 'ordered',     // shipped, delivered
    },
    bookedDate: {
        type: Schema.Types.Date,
        required: true,
    },
});

module.exports = mongoose.model("Order", orderSchema);


