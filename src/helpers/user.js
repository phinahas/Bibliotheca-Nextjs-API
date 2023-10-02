const User = require('../models/User');
const Book = require('../models/Books');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

const { createBookingNumber } = require('../utils/commonFns')

exports.createUser = async ({ email, name, password, role }) => {

    try {
        const userFromDb = await User.findOne({ email: email });
        if (userFromDb)
            return { status: 409, message: "User already exists" }
        const userObj = new User({
            email: email,
            name: name,
            password: password,
            role: role
        })
        await userObj.save();
        return { status: 200, message: "User created successfully" }

    } catch (error) {
        console.log(error);
    }
}

exports.signIn = async ({ email, password }) => {
    try {

        const userFromDb = await User.findOne({ email: email, password: password });
        if (!userFromDb)
            return { status: 409, message: 'User not found / Invalid credentials' };
        if (userFromDb.role === 'vendor' && userFromDb.vendorStatus == false) {
            return { status: 409, message: 'Contact admin for verification' }
        }
        const token = await jwt.sign({
            email: email,
            userId: userFromDb._id
        },
            "jwtSecret",
            {
                expiresIn: "168h"
            }
        )
        return { status: 200, user: userFromDb, token: token }


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getUser = async ({ token }) => {
    try {

        decodedToken = jwt.verify(token, "jwtSecret");

        if (!decodedToken)
            return { status: 409, message: "Token conflict" }
        const userFromDb = await User.findOne({ _id: decodedToken.userId });
        if (!userFromDb)
            return { status: 409, message: "User not found" }
        return { status: 200, user: userFromDb }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getBooks = async (reqst) => {
    try {

     

        let qryCondition = {

        }

        if (!reqst.isAdmin) {
            qryCondition.status = true;
        }

        const booksFromDb = await Book.find(qryCondition).skip(reqst.skip).limit(reqst.limit);

        if (booksFromDb.length === 0) return { status: 204, message: "No data found" }
        return { status: 200, books: booksFromDb }



    } catch (error) {

        console.log(error);
        throw error;

    }
}

exports.addToCart = async ({ bookId, userId }) => {
    try {

        const bookFromCart = await Cart.findOne({ book: bookId, user: userId });
        if (bookFromCart)
            return { status: 200, message: 'Already in cart' };


        const cartObj = new Cart({
            book: bookId,
            user: userId
        })

        await cartObj.save();

        return { status: 200, message: 'Added to cart' };



    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getCart = async ({ userId }) => {
    try {
      
        const cartFromDb = await Cart.find({ user: userId }, { user: 0 }).populate('book');
        if (cartFromDb.length === 0)
            return { status: 204, message: "Nothing found" }
        return { status: 200, cart: cartFromDb }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.buyProduct = async ({ productId, userId }) => {
    try {

        const orderObj = Order({
            orderId: await createBookingNumber(),
            book: productId,
            user: userId,
            bookedDate: new Date(),
        });

        await orderObj.save();

        return { status: 200, message: 'Order created successfully' }



    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.removeProduct = async ({ cartId }) => {
    try {

        const productFromCart = await Cart.findById(cartId);
        if (!productFromCart)
            return { status: 409, message: "No such product" }
        await Cart.findByIdAndDelete(cartId);
        return { status: 200, message: "Product removed successfully" }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getAllOrders = async ({ userId }) => {
    try {

        const orderFromDb = await Order.find({ user: userId }).populate('book');
        if (orderFromDb.length === 0) return { status: 204, message: "No orders found" }
        return { status: 200, orders: orderFromDb }



    } catch (error) {
        console.log(error);
        throw error;

    }
}

exports.searchAndGetBooks = async ({ keyword,skip,limit }) => {
    try {

        if(keyword.length < 2) {

            const books = await Book.find({}).skip(skip)
            .limit(limit);
            if(books.length === 0)
                return {status:204,message:"No books found"}

        }
        const regex = new RegExp(keyword, 'i'); // 'i' for case-insensitive search
        const books = await Book.find({
            $or: [
                { name: { $regex: regex } },        // Search in the 'name' field
                { author: { $regex: regex } },      // Search in the 'author' field
                { description: { $regex: regex } }, // Search in the 'description' field
                {price: { $regex: regex } }, // Search in the 'price
                // Search by vendor's name
                {
                    'vendor': {
                        $in: await User.find({ $or: [{ email: { $regex: regex } }, { name: { $regex: regex } }] }).distinct('_id')
                    }
                },
            ],
        }).skip(skip)
        .limit(limit).populate('vendor'); // Populate the 'vendor' field from the User model

        return { status: 200, books };
    } catch (error) {
        console.error(error);
        // Handle the error appropriately, e.g., return an error response
        throw error;
    }
};
