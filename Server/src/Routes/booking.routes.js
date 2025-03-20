const {verifyToken,verifyAdmin} = require("../Middlewares/auth.middleware");
const {makePayment,createBooking}=require("../Controllers/booking.controller")

module.exports=(app)=>{
    app.post("/payments",[verifyToken],makePayment);
    app.post("/bookings",[verifyToken],createBooking)
}