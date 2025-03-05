const theatreModel = require('../Models/theatre.model');
const movieModel = require('../Models/movie.model');
const showModel = require('../Models/show.model');
const { default: mongoose } = require("mongoose");

const createNewShow = async (req, res) => {
    console.log(req.body);
    try{
        const theatreId=req.body.theatre;
        const movieId=req.body.movie;
        const theatre = await theatreModel.findById(theatreId);
        const movie = await movieModel.findById(movieId);
        if(!theatre || !movie){
            return res.status(404).send({message:"Theatre or Movie not found"});
        }
        const show = new showModel({
            name:req.body.name,
            date:req.body.date,
            time:req.body.time,
            theatre:theatreId,
            movie:movieId,
            totalSeats:req.body.totalSeats,
            bookedSeats:req.body.bookedSeats,
            ticketPrice:req.body.ticketPrice
        });
        const dbResponse=await show.save();
        return res.status(201).send({message:"Show created successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }

}

const getShows = async (req, res) => {
    try{
        const shows = await showModel.find();
        return res.status(200).send(shows);
    }catch(err){
        console.log(err);
        return res.status(500).send({message:"Internal Server Error"});
    }
}

const getTheatresAndShows=async (req,res)=>{

    const {movieId}=req.params;
    const {date}=req.query;

    const allShows=await showModel.find({movie:movieId,data:date}).populate('theatre')

    let allUniqueTheatres=[];

    allShows.forEach((show)=>{
        const theatre=allUniqueTheatres.find((theatreId)=>{
            return theatreId===show.theatre._id;
        });
        if(!theatre){
            allUniqueTheatres.push(show.theatre._id);
        }
    });

    const response=allUniqueTheatres.map((theatreid)=>{
        const allShowsForTheatre=allShows.filter((show)=>{
            return show.theatre._id===theatreid;
        });
        return {
            theatreid,
            theatreDetails:allShowsForTheatre[0].theatre,
            allShowsForTheatre
        }
    })
    console.log(response);
    res.status(200).send({success:true,message:"All shows fetched",data:response});
}

const getShowDetailsById=async (req,res)=>{
    try{
        const showId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(showId)){

            return res.status(400).send({
                success:false,
                message:"Show id passed is invalid format"
            })
        }
        const show=await showModel.findById(showId).populate("theatre").populate("movie");
        if(!show){
            return res.status(400).send({message:"Invalid Show ID passed"});
        }
        else{
            return res.status(200).send(show);
        }
    }catch(err){
        res.status(400).send(err);
    }
}

module.exports = {createNewShow,getShows,getTheatresAndShows,getShowDetailsById}