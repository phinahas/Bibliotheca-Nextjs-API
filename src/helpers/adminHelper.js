const Book = require('../models/Books')
const Order = require('../models/Order');
const User = require('../models/User');
const ObjectId = require("mongoose").Types.ObjectId;

exports.createBook = async({bookName,author,description,image,price})=>{
    try {

        const bookObj = new Book ({

            name: bookName,
            author: author,
            description: description,
            image: image,
            price: price
        })
        
        await bookObj.save();
        return {status:200,message:"Book created successfully"}


        
    } catch (error) {
        console.log(error);
        throw  error;
    }
}

exports.getAllOrders = async ({ userId }) => {
    try {
      let query = {};
      if (userId !== 'admin') {
        query['book.vendor'] = new ObjectId(userId);
      }
  
      
  
      const orderFromDb = await Order.aggregate([
        {
          $lookup: {
            from: 'books', // The name of the Book collection
            localField: 'book',
            foreignField: '_id',
            as: 'book',
          },
        },
        {
          $lookup: {
            from: 'users', // The name of the Book collection
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },{
          $unwind:'$user'
        },
        {
          $unwind: '$book',
        },
        {
          $match:query
        },
      ]);


   
  
      if (orderFromDb.length === 0) {
        return { status: 204, message: 'No orders found' };
      }
  
      return { status: 200, orders: orderFromDb };
    } catch (error) {
      console.error('Error:', error); // Log any errors for debugging
      throw error;
    }
  };
  
  

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


exports.changeBookStatus = async ({bookId,status})=>{
    try {

      await  Book.findOneAndUpdate({_id:bookId},{status:status});
      return {status:200,message:"Status updated successfully"}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getAllVendors = async ()=>{
    try {
        
        const vendorsFromDb = await User.find({role:"vendor"});
        if(vendorsFromDb.length == 0)
            return {status:204,message:"No vendors found"}
        return {status:200,vendors:vendorsFromDb}

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.changeVendorStatus = async ({vendorId,status})=>{
    try {

      await  User.findOneAndUpdate({_id:vendorId},{vendorStatus:status});
      return {status:200,message:"Status updated successfully"}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}