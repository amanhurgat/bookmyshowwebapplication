
const { getShows, createNewShow, getTheatresAndShows,getShowDetailsById } = require("../Controllers/shows.controllers");
const {verifyToken,verifyAdmin} = require("../Middlewares/auth.middleware");

module.exports=(app)=>{
    app.get("/shows",[verifyToken,verifyAdmin],getShows); 
    app.post("/shows",[verifyToken],createNewShow); 
    app.get("/movies/:movieId/shows",[verifyToken],getTheatresAndShows);
    app.get("/shows/:id",getShowDetailsById);
}