

const mongoose=require('mongoose');

const showSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    theatre:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'theatre',
        required:true
    },
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'movies',
        required:true
    },
    totalSeats:{
        type:Number,
        required:true
    },
    bookedSeats:{
        type:Array,
        default:[]
    },
    ticketPrice:{
        type:Number,
        required:true
    }
});

const showModel=mongoose.model('Show',showSchema);

module.exports=showModel;
