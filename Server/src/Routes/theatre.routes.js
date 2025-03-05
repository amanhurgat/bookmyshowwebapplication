
const { createNewTheatre, getTheatre } = require("../Controllers/theatre.controller");
const { verifyToken, verifyAdmin,verifyAdminOrPartner } = require("../Middlewares/auth.middleware");


module.exports=(app)=>{
    app.post("/theatres",[verifyToken,verifyAdminOrPartner], createNewTheatre);
    app.get("/theatres", getTheatre);
}

