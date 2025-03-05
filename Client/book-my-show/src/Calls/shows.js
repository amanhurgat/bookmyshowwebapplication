import { axiosInstance } from ".";  
export async function getAllShowsForMovie(id,date){
    try{
        const response=await axiosInstance.get(`http://localhost:5000/movies/${id}/shows?${date}`);
        return response;
    }catch(err){
        return err.response;
    }
}

export async function getShowDetails(showId){
    try{
        const response=await axiosInstance.get(`http://localhost:5000/shows/${showId}`);
        return response;
    }catch(err){
        return err.response;
    }
}