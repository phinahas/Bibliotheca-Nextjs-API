exports.addAdminStatus = async(req,res,next)=>{
    try {

        req.body.isAdmin = true;
        next();
        
    } catch (error) {
        console.log(error);
        const err = new Error(error.message);
        next(err);
    }
}