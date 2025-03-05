const movieModel = require('../Models/movie.model');

const getMovies = async (req, res) => {
    const Allmovies=await movieModel.find({});
    res.status(200).send({success:true,data:Allmovies,message:"Movies fetched"});
}

const createNewMovie = async (req, res) => {
    console.log(req.body);
    try{
        const newMovie=new movieModel(req.body);
        const dbResponse=await newMovie.save();
        res.status(201).send({success:true,message:"Movie Created"});
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Internal Server Error"});
    }
}

const updateMovie = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    if(req.params.id==null || req.body==null){
        res.status(400).send({success:false,
            message:"Invalid Request"});
        return;
    }
    try{
        const updatedMovie=await movieModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).send({success:true,message:"Movie Updated"});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Internal Server Error"});
    }
}

const deleteMovie = async (req, res) => {
    console.log(req.params.id);
    if(req.params.id==null){
        res.status(400).send({success:false,
            message:"Invalid Request"});
        return;
    }
    try{
        const deletedMovie=await movieModel.findByIdAndDelete(req.params.id);
        if(deletedMovie==null || deletedMovie.deletecount==0){
            res.status(404).send({success:false,message:"Movie Not Found"});
            return;
        }
        res.status(200).send({success:true,message:"Movie Deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Internal Server Error"});
    }
}   

const getMovieById=async (req,res)=>{
    try{
        const allMovies=await movieModel.findById(req.params.id);
        return res.status(200).send({
            success:true,
            message:"All movies have been fetched",
            data:allMovies
        });
    }catch(err){
        res.status(500).send(err);
    }
}



module.exports = { getMovies, createNewMovie, updateMovie,deleteMovie,getMovieById }