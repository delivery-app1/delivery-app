
export default function Ticket(props){
  return(
    <article className="ticket">
      <p>Costumer Name: {props.customerName}</p>
      <p>coffee: { props.coffee.map((ele)=>{
        return(
          `${ele} `
        )
      })} </p>
      <p>size: {props.size}</p>
      <p>Location: {props.branch}</p>
      <p>time: {new Date(props.created_at).toLocaleDateString()}</p>
      <p>Notes: {props.notes}</p>
      <button onClick={()=>props.handleClaim(props._id,props.socketId)}>Claim</button>
      <button onClick={()=>props.handleDelete(props._id)}>Delete</button>
      {console.log(props)}
    </article>
  )
}