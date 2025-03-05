import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getShowDetails } from "../../Calls/shows";
import {Card, Row, Col, Button, message} from "antd";
import Navbar from "../../Components/Navbar/Navbar"

function BookShow(){

    const params=useParams();
    const showId=params.showId;
    const [showDetails,setShowDetails]=useState(null);
    const [selectedSeats,setSelectedSeats]=useState([]);
    const fetchShowData=async ()=>{
        try{
            const response=await getShowDetails(showId);
            setShowDetails(response.data);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchShowData();
    },[]);

    const handleSeatSelect=(seatNumber)=>{
        seatNumber = seatNumber.toString();

        if(showDetails.bookedSeats.includes(seatNumber)){
            return;
        }
        if(!selectedSeats.includes(seatNumber)){
            setSelectedSeats([...selectedSeats, seatNumber]);
            return;
        }
        const updatedSelectedSeats = selectedSeats.filter((seat)=>seat!=seatNumber);
        setSelectedSeats(updatedSelectedSeats);
    }
    
    const getSeats = ()=>{

        const columns = 12;
        const totalSeats = 120;

        const rows = totalSeats/columns; //10

        let allRows = [];

        for(let i=0;i<rows;i++){
            allRows.push(i);
        }

        let allColumns = [];

        for(let j=0;j<columns;j++){
            allColumns.push(j);
        };
    return <div className="seat-ul">
        {allRows.map((row)=>{

            return <div className="d-flex seat-ul">
                {
                    allColumns.map((col)=>{

                        let seatNumber = row*columns + col + 1;

                        const isSeatBooked = showDetails.bookedSeats.find((curr)=>{
                            return curr==seatNumber;
                        });

                        let seatClass = "seat-btn";
                        if(isSeatBooked){
                            seatClass += " seat-btn-booked";
                        }
                        if(selectedSeats.includes(seatNumber.toString())){

                            seatClass+= " seat-btn-selected";
                        }
                        return <button  key={seatNumber} className={seatClass} onClick={()=>handleSeatSelect(seatNumber)} >
                                    {seatNumber}
                                </button>
                    })
                }
            </div>
        })}
        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span>Rs. {selectedSeats.length * showDetails.ticketPrice}</span>
          </div>
        </div>
    </div>
    }

    return showDetails &&
    <Row gutter={24}>
        <Navbar/>
        <Col span={24}>
        <Card title={
            <div>
                <h1>{showDetails.movie.movieName}</h1>
                <p>Theatre:{showDetails.theatre.name}</p>
            </div>
        }
        extra={
            <div>
                <span>{showDetails.name}</span>
                <h3>Ticket Price:{showDetails.ticketPrice}</h3>
                <h4>Total Seats:{showDetails.totalSeats}</h4>
                <h4>Available Seats:{showDetails.totalSeats-showDetails.bookedSeats.length}</h4>
            </div>
        
        }style={{width:"100%"}}>
            {getSeats()}


            <button>Book Tickets</button>
        </Card>
        </Col>
    </Row>
}

export default BookShow;