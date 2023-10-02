const userHelper = require('../helpers/user');



exports.createUser = async (req, res, next)=>{

    try {
 
        const response  = await userHelper.createUser(req.body);
        res.status(response.status).send({message:response.message});

    } catch (error) {
        const err = new Error(error.message)
        next(err);
    }

}

exports.signIn = async (req, res, next)=>{

    try {
        const response  = await userHelper.signIn(req.body);
        res.status(response.status).send({message:response.message,user:response.user, token:response.token});

    } catch (error) {
        const err = new Error(error.message)
        next(err);
    }

}

exports.getUser = async (req,res,next)=>{
    try {

        const response  = await userHelper.getUser(req.body);
        res.status(response.status).send({message:response.message,user:response.user, token:response.token});


        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.getBooks = async (req, res, next) => {

    try {
     

        req.body.limit = parseInt(req.query.limit);
        req.body.skip = (parseInt(req.query.page) - 1) * parseInt(req.query.limit);
        const response = await userHelper.getBooks(req.body);
        res.status(response.status).send({books:response.books,message:response.message});
        
        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }

}

exports.addToCart = async(req, res, next) => {
    try {

        const response = await userHelper.addToCart(req.body);
        res.status(response.status).send({message:response.message})

        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.removeFromCart = async(req, res, next) => {
    try {

        const response = await userHelper.removeProduct(req.body);
        res.status(response.status).send({message:response.message})

        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.getCart = async(req, res, next) => {
    try {
     
        req.body.userId = req.query.userId;
        const response = await userHelper.getCart(req.body);
       
        res.status(response.status).send({message:response.message,cart:response.cart})        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.buyProduct = async(req,res,next)=>{
    try {

        const response = await userHelper.buyProduct(req.body);
        res.status(response.status).send({message: response.message});
        
    } catch (error) {
    
        const err = new Error(error.message);
        next(err);
    }
}

exports.getAllOrders = async(req, res, next) => {
    try {
     
        req.body.userId = req.query.userId;
       
        const response = await userHelper.getAllOrders(req.body);
      
        res.status(response.status).send({message:response.message,orders:response.orders})        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.searchAndGetBooks = async(req, res, next) => {

    try {
        req.body.keyword = req.query.keyword;
        req.body.limit = parseInt(req.query.limit);
        req.body.skip = (parseInt(req.query.page) - 1) * parseInt(req.query.limit);

        const response = await userHelper.searchAndGetBooks(req.body);
        res.status(response.status).send({book:response.books})
        
    } catch (error) {
        console.log(error);
        const err = new Error(error.message);
        next(err);
    }

}