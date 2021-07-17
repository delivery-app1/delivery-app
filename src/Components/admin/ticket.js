import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';

export default function Ticket(props) {
  return (
    // <article className="ticket">
    //   <p>Costumer Name: {props.customerName}</p>
    //   <p>coffee: { props.coffee.map((ele)=>{
    //     return(
    //       `${ele} `
    //     )
    //   })} </p>
    //   <p>size: {props.size}</p>
    //   <p>Location: {props.branch}</p>
    //   <p>time: {new Date(props.created_at).toLocaleDateString()}</p>
    //   <p>Notes: {props.notes}</p>
    //   <button onClick={()=>props.handleClaim(props._id,props.socketId)}>Claim</button>
    //   <button onClick={()=>props.handleDelete(props._id)}>Delete</button>
    //   {console.log(props)}
    // </article>

    <Card style={{backgroundColor:"#0d0d0d", color:"white" ,width: '18rem' }}>
      <Card.Img variant="top" src="https://live.staticflickr.com/134/327104453_1288ad82e9_b.jpg" />
      <Card.Body>
        <Card.Title style={{borderColor:"grey", backgroundColor:"#0d0d0d", color:"white"}}> Name: {props.customerName}</Card.Title>
        <Card.Text style={{borderColor:"grey", backgroundColor:"#0d0d0d", color:"white"}}>
          coffee: {props.coffee.map((ele) => {
            return (
              `${ele} `
            )
          })}
        </Card.Text>
      </Card.Body>
      <ListGroup  style={{borderColor:"#4d4d4d" }} className="list-group-flush">
        <ListGroupItem style={{borderColor:"#4d4d4d", backgroundColor:"#0d0d0d", color:"white"}}>size: {props.size}</ListGroupItem>
        <ListGroupItem  style={{borderColor:"#4d4d4d",backgroundColor:"#0d0d0d", color:"white" }}>Location: {props.branch}</ListGroupItem>
        <ListGroupItem  style={{borderColor:"#4d4d4d",backgroundColor:"#0d0d0d", color:"white" , overflow:'auto', height:"5rem" }}>Notes: {props.notes}</ListGroupItem>
      </ListGroup>
      <Card.Body>
      <Button type="submit"  style={{marginLeft:"30px"}} variant="light" onClick={()=>props.handleShowModal(props._id,props.socketId)}>Confirmed</Button>
      <Button type="submit"  style={{margin :"10px"}} variant="light" onClick={()=>props.handleDelete(props._id)}>Delete</Button>
      {/* <button onClick={()=>props.handleClaim(props._id,props.socketId)}>Claim</button> */}
      {/* <button onClick={()=>props.handleDelete(props._id)}>Delete</button> */}
      </Card.Body>
    </Card>



  )
}