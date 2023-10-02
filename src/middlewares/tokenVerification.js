const jwt = require("jsonwebtoken");




exports.isAdminOrCustomer = async(req, res, next) => {

    try {

        const authHeader = req.get("Authorization");
  if (!authHeader) {
            const error = new Error("Not authenticated");
            error.status = 400;
            next(error);
  } else {
    //const token = req.get("Authorization").split(".")[1];
    
      decodedToken = jwt.verify(authHeader,"jwtSecret");
      req.body.userId = decodedToken.userId;
      const response = await adminHelper.checkIsAdmin(decodedToken);
      if (!response.status) {
        const error = new Error(response.message);
        error.status = 400;
        next(error);
      } else {
        next();
      }
  }

        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }

}