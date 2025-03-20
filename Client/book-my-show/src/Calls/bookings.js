import { axiosInstance } from ".";


export async function MakePayment(data){
    console.log("Make an API call with data",data);

    try{
         const response = await axiosInstance.post(`http://localhost:5000/payments`,{
        token:data.token,
        amount:data.amount,
        });

       return response;
    }
    catch(err){
        return err.response;
    }
}

export async function CreateBooking(data){
    console.log("Make an API call with data",data);

    try{
         const response = await axiosInstance.post("http://localhost:5000/bookings",{
        show:data.showId,
        seats:data.seats,
        transactionId:data.transactionId
        });
        console.log("reseponse:",response);

       return response;
    }
    catch(err){
        return err.response;
    }
}