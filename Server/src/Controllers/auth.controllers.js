const userModel = require("../Models/user.model");
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const { sendEmail } = require("../Utils/notification.utils");
const otpscript = require("../Scripts/otpscripts");
require('dotenv').config()

const onLogin = async (req, res) => {

    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are mandatory" });
    }
    try{
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).send({ message: "User does not exist. Kindly register" , success:false});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid credentials",success:false });
        }

        //console.log(user._id);

        var token = jwt.sign({ userId:user._id}, process.env.SECRET);

        console.log(token)

        return res.status(200).send({message:"User logged in successfully", success:true , token:token})
    }
    catch(err){
        return res.status(500).send({error:"Internal server error", success:false})
    }
}

const onRegister = async (req, res) => {
    console.log(req.body.name);
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "All fields are mandatory" });
    }

    try{
        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        req.body.password = hashedPassword;
        const newUser=await new userModel(req.body);
        await newUser.save();
        return res.status(200).json({message:"User registered successfully"});
    }
    catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}

const onForgetPassword = async (req,res) =>{

    const {email}=req.body;
    if(!email){
        res.status(401).send({success:false,message:"Enter Valid Email Id"});
    }
    try{
        const user = await userModel.findOne({ email: email });
        if (user==null) {
            return res.status(404)
            .send({
                success:false,
                message:"User doesnot exists with this email Id"
            })
        }

        const otp=otpGenerator();
        console.log(otp);

        user.otp = otp;
        user.otpExpiry =  Date.now() + 2 * 60 * 1000;

        await user.save();

        sendEmail(user.email,"Reset Password for Book MY Show",otpscript(user.name,user.email,otp));

        res.status(200).send({success:true,message:`OTP Sent Successfully on User Email ${email}`});
    }catch(err){
        res.status(500).send({success:false,message:"Internal Server Error"});
    }
    

}

function otpGenerator(){
    return Math.floor((Math.random()*10000)+ 90000);
}

const onReset=async (req,res)=>{
    const {otp,password}=req.body;
    if(!otp || !password){
        return res.status(400).send("Enter all the details");
    }
    const user = await UserModel.findOne({otp:otp});

    if(user==null){
        return res.status(404).send({
            success:false,
            message:"OTP is incorrect"
        })
    };
    if(Date.now() > user.otpExpiry){
        return res.status(404).send({
            success:false,
            message:"OTP has been expired"
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    user.password  = hashedPassword;
    user.otp=null;
    user.otpExpiry=null;
    await user.save();

    return res.status(200).send({
        success:true,
        message:"Password Reset Successful"
    });
}

module.exports = { onLogin, onRegister,onForgetPassword,onReset };