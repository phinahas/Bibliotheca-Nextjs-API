const Book = require('../models/Books')
const Order = require('../models/Order');
const ObjectId = require("mongoose").Types.ObjectId;


exports.createBook = async({bookName,author,description,image,price,vendor})=>{
    try {

        const bookObj = new Book ({

            name: bookName,
            author: author,
            description: description,
            image: image,
            price: price,
            vendor: vendor
        })
        
        await bookObj.save();
        return {status:200,message:"Book created successfully"}


        
    } catch (error) {
        console.log(error);
        throw  error;
    }
}

exports.getAllOrders  = async ({})=>{
    try {

        const orderFromDb = await Order.find({}).populate('book').populate('user');
        if(orderFromDb.length === 0) return {status:204, message:"No orders found"}
        return {status:200, orders:orderFromDb}
                
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

exports.changeOrderStatus = async({status,orderId})=>{
    try {


        let orderStatus = status;
       let res =  await Order.updateOne({orderId:orderId}, { $set: { status:orderStatus }});

        return {status:200,message:"Order status updated successfully"}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.createVendor = async ({email,name,password,role})=>{

    try {
        const userFromDb = await User.findOne({email: email});
        if(userFromDb)
            return {status:409,message:"User already exists"}
        const userObj = new User({
            email: email,
            name: name,
            password: password,
            role: role
        })
        await userObj.save();
        return {status:200, message:"User created successfully"}

    } catch (error) {
        console.log(error);
    }
} 

exports.getBooks = async ({vendorId})=>{
    try {
        const booksFromDb = await Book.find({vendor:vendorId});
        if(booksFromDb.length === 0) return {status:204,message:"No data found"}
        return {status:200,books:booksFromDb}


        
    } catch (error) {
        
        console.log(error);
        throw error;

    }
}

exports.getSalesCount = async ({vendorId})=>{
    try {

        const orderFromDb = await Order.aggregate([
            {
              $lookup: {
                from: 'books',
                localField: 'book',
                foreignField: '_id',
                as: 'book',
              },
            },
            {
              $unwind: '$book',
            },
            {
              $match: {
                'book.vendor': new ObjectId(vendorId),
              },
            },
            {
              $group: {
                _id: '$status',
                count: { $sum: 1 },
                totalPriceDelivered: {
                  $sum: {
                    $cond: [{ $eq: ['$status', 'delivered'] }, '$book.price', 0],
                  },
                },
              },
            },
            {
              $group: {
                _id: null, // Group all results into a single group
                counts: {
                  $push: { k: '$_id', v: '$count' }, // Push status and count into an array
                },
                totalPriceDelivered: { $sum: '$totalPriceDelivered' },
              },
            },
            {
              $replaceRoot: {
                newRoot: { $mergeObjects: [{ $arrayToObject: '$counts' }, { totalPriceDelivered: '$totalPriceDelivered' }] },
              },
            },
          ]);
          
          // The `orderFromDb` result will contain counts for each status and the totalPriceDelivered.
          
          return {status:200,count:orderFromDb}

        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

