import { axiosInstance } from "../Calls/index.js";

async function RegisterUser(data) { 
    try {
        console.log("Sending data:", data); // Log the data being sent
        const response = await axiosInstance.post("http://localhost:5000/register", {
            "name": data.name,
            "email": data.email,
            "password": data.password,
            "role": "user"
        });
        console.log("Server response:", response); // Log the server's response
        return response;
    } catch (err) {
        console.error("Error response:", err.message); // Log the error response
        return err.message;
    }
}

async function LoginUser(data) { 
    try {
        console.log("Sending data:", data); // Log the data being sent
        const response = await axiosInstance.post("http://localhost:5000/login", {
            "email": data.email,
            "password": data.password
        });
        console.log("Server response:", response.data); // Log the server's response
        return response.data;
    } catch (err) {
        console.log(err);
        console.error("Error response:",err.message); // Log the error response
        return err.message;
    }
}

async function onForgetPassword(data){
    try{
        const response=await axiosInstance.post("http://localhost:5000/forget",{
            "email":data.email
        });
        console.log("Server response:",response.data);
        return response.data;
    }catch(err){
        return err.message;
    }
}

async function ResetPassword(data){
    console.log("Make an API call with data",data);

    try{
         const response = await axiosInstance.post("https://scalerfullstackaugust.onrender.com/reset",{
        otp:data.otp,
        password:data.password
        });

       return response;
    }
    catch(err){
        return err.response;
    }
}


export { RegisterUser, LoginUser,onForgetPassword,ResetPassword };