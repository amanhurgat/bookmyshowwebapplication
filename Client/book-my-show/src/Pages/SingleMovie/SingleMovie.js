import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../Calls/movies";
import Navbar from "../../Components/Navbar/Navbar";
import { Col, Flex, Input, Row } from "antd";
import moment from "moment"
import { getAllShowsForMovie } from "../../Calls/shows";


function SingleMovie(){
    const params=useParams();

    const [movie,setMovie]=useState(null);
    const [date,setDate]=useState(moment().format("YYYY-MM-DD"));
    const navigate=useNavigate();

    const [showsData,setShowsData]=useState(null);

    const getData=async function(){
        const response=await getMovieById(params.id);
        setMovie(response.data);
    }

    const handleDateChange=async function(e){
        setDate(e.target.value);
        navigate(`/movie/${movie._id}?date=${e.target.value}`)
    }

    const getAllShowsForSelectedMovie=async ()=>{
        const shows=await getAllShowsForMovie(params.id,date);
        setShowsData(shows.data.data);
    }

    useEffect(()=>{
        getData();
    },[]);

    useEffect(()=>{
        getAllShowsForSelectedMovie();
    },[date]);

    return(
        <div>
            <Navbar/>
            {
                movie && [
                    <Flex gap={"large"} justify="center" align="center">
                        <div>
                            <img src={movie.poster}/>
                        </div>
                        <div>
                            <h3>{movie.movieName}</h3>
                            <h4>{movie.genre}</h4>
                            <h4>{movie.language}</h4>
                            <h4>{movie.duration}</h4>
                            <p>{movie.description}</p>
                            <hr/>
                            <label>Date</label>
                            <Input type="date" value={date} onChange={handleDateChange}/>
                        </div>
                    </Flex>
                ]
            }

            {
                showsData && showsData.length===0 && (

                    <div>
                        <h2>No Shows Available</h2>
                    </div>

                )

            }
            {
                showsData && showsData.length!=0 && (

                    <div>
                        <h2>Theatres</h2>
                        {
                            showsData.map((show)=>{
                                const theatreId=show.theatreid;
                                const theatreDetails=show.theatreDetails;
                                const allShowsForThisTheatre=show.allShowsForTheatre;
                                console.log(allShowsForThisTheatre);
                                return <div>

                                <Row gutter={24} >

                                    <Col lg={{span:8}} >

                                       <h3> {theatreDetails.name} </h3>
                                       <p> {theatreDetails.address}</p>

                                    </Col>

                                    <Col lg={{span:16}} >

                                    <ul className="show-ul">

                                        {
                                            allShowsForThisTheatre.map(singleShow=>{

                                                return <li onClick={()=>{
                                                    navigate(`book-show/${singleShow._id}`);

                                                }} > {singleShow.time} </li>
                                            })
                                        }

                                    </ul>
                                    
                                    </Col>



                                </Row>

                                </div>

                            })
                        }
                    </div>
                )
            }

        </div>
    )
}

export default SingleMovie;