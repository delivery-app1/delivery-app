// export default function Ticket(props){
//   return(
//     <article className="ticket">
//       <h2>{props.question}</h2>
//       <p>type:{props.type}</p>
//       <p>course: {props.course}</p>
//       <p>time:{new Date(props.created_at).toLocaleDateString()}</p>
//       <p>Student Name: {props.studentName}</p>
//       <button onClick={()=>props.handleClaim(props.id,props.socketId)}>Claim</button>
//     </article>
//   )
// }

export default function Ticket(props){
  return(
    <article className="ticket">
      <p>Costumer Name: {props.studentName}</p>
      <p>coffee: {props.coffee}</p>
      <p>size: {props.size}</p>
      <p>Location: {props.branch}</p>
      <p>time: {new Date(props.created_at).toLocaleDateString()}</p>
      <p>Notes: {props.notes}</p>
      <button onClick={()=>props.handleClaim(props.id,props.socketId,props.showModal)}>Claim</button>
    </article>
  )
}