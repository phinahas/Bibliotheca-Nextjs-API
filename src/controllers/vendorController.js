const vendorHelper = require('../helpers/vendorHelper');

exports.createBook = async(req,res,next)=>{
    try {

        const response = await vendorHelper.createBook(req.body);
        res.status(response.status).send({message:response.message})


        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.getBooks = async (req, res, next) => {

    try {
        req.body.vendorId = req.query.vendorId;
        const response = await vendorHelper.getBooks(req.body);
        res.status(response.status).send({books:response.books,message:response.message});
        
        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }

}

exports.getAllOrders = async(req, res, next) => {
    try {
     
        req.body.userId = req.query.userId;
       
        const response = await vendorHelper.getAllOrders(req.body);
      
        res.status(response.status).send({message:response.message,orders:response.orders})        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.changeOrderStatus = async(req,res,next)=>{
    try {

        const response = await vendorHelper.changeOrderStatus(req.body);
        res.status(response.status).send({message:response.message}) 
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.getSalesCount = async(req,res,next)=>{
    try {
        req.body.vendorId = req.query.vendorId;
        const response = await vendorHelper.getSalesCount(req.body);
        res.status(response.status).send({sales:response.count})
        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

