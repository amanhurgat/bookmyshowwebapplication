const { onRegister, onLogin, onForgetPassword, onReset } = require("../Controllers/auth.controllers")


module.exports=(app)=>{ 
    app.get("/",(req,res)=>{
        res.status(200).send({message:"Connected"})
    });
    app.post("/register",onRegister);
    app.post("/login",onLogin);
    app.post("/forget",onForgetPassword);
    app.post("/reset",onReset)
}
