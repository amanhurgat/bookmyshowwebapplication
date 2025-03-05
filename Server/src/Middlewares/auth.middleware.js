const jwt = require('jsonwebtoken');
const userModel = require('../Models/user.model');


const verifyToken = (req, res, next) => {
    const tokenString = req.headers.authorization;
    if(!tokenString){
        console.log("No Token");
        return res.status(403).send("Access Denied");
    }
    const token = tokenString.split(' ')[1];
    jwt.verify(token, process.env.SECRET, async (err, payload) => {
        if(err){
            console.log("Invalid Token");
            return res.status(403).send("Invalid Token");
        }
        try{
            const user = await userModel.findById(payload.userId);
            req.userDetails = user;
            console.log("Passing userDetails:",req.userDetails);
            if(!user){
                return res.status(403).send("Access Denied");
            }
            next();
        }catch(err){
            return res.status(403).send("Access Denied");
        }
    })
}

const verifyAdmin = async (req, res, next) => {
    console.log("Middleware called");

    const user =await req.userDetails;

    console.log("User:",user.role);
    if(user.role !== 'admin'){
        return res.status(403).send("Access Denied since you are not an admin");
    }
    next();
}

const verifyAdminOrPartner = async (req, res, next) => {
    console.log("Middleware called");

    const user =await req.userDetails;

    console.log("User:",user.role);
    if(user.role !== 'admin' && user.role !== 'partner'){
        return res.status(403).send("Access Denied since you are not an admin");
    }
    next();
}

module.exports = {verifyToken, verifyAdmin, verifyAdminOrPartner};