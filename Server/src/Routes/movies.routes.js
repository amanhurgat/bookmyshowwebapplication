

const {getMovies,createNewMovie,updateMovie,deleteMovie,getMovieById} = require("../Controllers/movies.controllers");
const {verifyToken,verifyAdmin} = require("../Middlewares/auth.middleware");

module.exports=(app)=>{
    app.get("/movies",[verifyToken],getMovies); 
    app.post("/movies",[verifyToken,verifyAdmin],createNewMovie);  
    app.put("/movies/:id",[verifyToken,verifyAdmin],updateMovie); 
    app.delete("/movies/:id",[verifyToken,verifyAdmin],deleteMovie);
    app.get("/movies/:id",[verifyToken],getMovieById)
}