import { axiosInstance } from ".";  

export async function getMovies() {
    try {
        const response = await axiosInstance.get("http://localhost:5000/movies");
        return response.data;
    } catch (err) {
        return err.message;
    }
}

export async function getMovieById(id) {
    try {
        const response = await axiosInstance.get(`http://localhost:5000/movies/${id}`);
        return response.data;
    } catch (err) {
        return err.message;
    }
}