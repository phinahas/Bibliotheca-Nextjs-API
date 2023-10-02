const adminHelper = require('../helpers/adminHelper');

exports.createBook = async(req,res,next)=>{
    try {

        const response = await adminHelper.createBook(req.body);
        res.status(response.status).send({message:response.message})


        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}


exports.getAllOrders = async(req, res, next) => {
    try {
     
        req.body.userId = req.query.userId;
       
        const response = await adminHelper.getAllOrders(req.body);
      
        res.status(response.status).send({message:response.message,orders:response.orders})        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}


exports.changeOrderStatus = async(req,res,next)=>{
    try {

        const response = await adminHelper.changeOrderStatus(req.body);
        res.status(response.status).send({message:response.message})


        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.changeBookStatus = async(req,res,next)=>{
    try {

        const response = await adminHelper.changeBookStatus(req.body);
        res.status(response.status).send({message:response.message})


        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.getAllVendors = async(req,res,next)=>{
    try {

        const response = await adminHelper.getAllVendors();
        res.status(response.status).send({message:response.message, vendors:response.vendors})
        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.changeVendorStatus = async(req,res,next)=>{
    try {

        const response = await adminHelper.changeVendorStatus(req.body);
        res.status(response.status).send({message:response.message})


        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}





