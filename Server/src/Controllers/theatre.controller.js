const theatreModel = require('../Models/theatre.model');

const createNewTheatre = async (req, res) => {
    console.log(req.body);
    const theatreDetails=new theatreModel(req.body);
    theatreDetails.owner=req.userDetails._id;
    try{
        const dbResponse=await theatreDetails.save();
        res.status(201).send({success:true,message:"Theatre Created"});
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Internal Server Error"});
    }
}

const getTheatre = async (req, res) => {
    try{
        const AllTheatres=await theatreModel.find({}).populate('owner');
        res.status(200).send({success:true,data:AllTheatres,message:"Theatres fetched"});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Internal Server Error"});
    }
}

module.exports = { createNewTheatre,getTheatre }