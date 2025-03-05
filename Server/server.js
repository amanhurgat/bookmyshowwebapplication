/**
 * @file server.js
 * @brief Server configuration and database connection setup.
 * @author [Aman Hurgat]
 * @date [2025-02-11]
 */

const express=require("express");
var cors=require('cors');
const app=express();
const mongoose=require("mongoose");
const authRoutes = require("./src/Routes/auth.routes");
const movieRoutes = require("./src/Routes/movies.routes");
const theatreRoutes = require("./src/Routes/theatre.routes");
const showRoutes = require("./src/Routes/show.routes");
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log("Basic server is created");
});

mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("connected to db");

})
.catch((err)=>{
    console.log(err);
})

authRoutes(app);
movieRoutes(app);
theatreRoutes(app);
showRoutes(app);

