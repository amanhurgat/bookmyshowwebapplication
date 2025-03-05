import {getMovies} from "../../Calls/movies";
import { use, useEffect,useState } from "react";
import Movielist from "../../Components/MovieList/Movielist";
import { Input, Row, Col, Card } from "antd";
import Column from "antd/es/table/Column";
import { Color } from "antd/es/color-picker";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function Home(){

    const [movies,setMovies]=useState([]);
    const navigate=useNavigate();
    const [searchText,setSearchText]=useState('');

    const onInputChange=(e)=>{
        setSearchText(e.target.value);
    }

    const fetchMovies=async()=>{
        const response=await getMovies();
        setMovies(response.data);
    }

    useEffect(()=>{
        fetchMovies();
    },[]);

    useEffect(()=>{
        console.log(movies);
    },[movies]);

    return <div>
        <Movielist/>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Input value={searchText} onChange={onInputChange} placeholder="Search Movies" style={{width: '50%', margin: 'auto', marginTop: '20px'}}/> 
        </div> 
        <Row gutter={[16, 16]}>
             {
                movies &&
                movies.filter((movie)=>
                movie.movieName.toLowerCase().includes(searchText.toLowerCase()))
                .map((movie)=>{
                    return <Col span={6} style={{marginTop: '20px'}} key={movie._id} >
                        <Card
                        hoverable
                        style={{ width: 240, height: 400, backgroundColor: 'black', color: 'white', border: '1px solid black'}}
                        cover={<img alt="example" src={movie.poster} style={{height: 300}}/>}
                        >
                        <h3 className="cursor-pointer" onClick={()=>{
                            navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`);
                        }}>{movie.movieName}</h3>
                        <p>{movie.language}</p>
                        <p>{movie.genre}</p>
                        </Card>
                    </Col>
                })
            }
        </Row>
        </div>
}

export default Home;