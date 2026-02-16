import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home(){

const navigate = useNavigate();

const [roomId,setRoomId] = useState("");
const [isPrivate,setIsPrivate] = useState(false);
const [password,setPassword] = useState("");


// CREATE ROOM
const createRoom = ()=>{

const id = crypto.randomUUID().slice(0,6);

// pass params in URL
if(isPrivate){
navigate(`/room/${id}?private=true&pass=${password}`);
}else{
navigate(`/room/${id}`);
}

};


// JOIN ROOM
const joinRoom = ()=>{

if(!roomId) return alert("Enter Room ID");

if(isPrivate){
navigate(`/room/${roomId}?private=true&pass=${password}`);
}else{
navigate(`/room/${roomId}`);
}

};


return(

<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#0f172a,#020617)",
color:"white"
}}>

<div style={{
width:"420px",
background:"rgba(255,255,255,0.05)",
backdropFilter:"blur(20px)",
padding:"40px",
borderRadius:"20px",
boxShadow:"0 20px 80px rgba(0,0,0,0.6)",
textAlign:"center"
}}>

<h1 style={{marginBottom:"20px"}}>🎬 Watch Party</h1>


{/* ROOM INPUT */}

<input
placeholder="Enter Room ID to Join"
value={roomId}
onChange={(e)=>setRoomId(e.target.value)}
style={{
width:"100%",
padding:"12px",
borderRadius:"10px",
border:"none",
marginBottom:"15px"
}}
/>


{/* PRIVATE TOGGLE */}

<div style={{marginBottom:"10px"}}>

<label style={{cursor:"pointer"}}>

<input
type="checkbox"
checked={isPrivate}
onChange={()=>setIsPrivate(!isPrivate)}
style={{marginRight:"8px"}}
/>

Private Room 🔒

</label>

</div>


{/* PASSWORD */}

{isPrivate && (

<input
placeholder="Set Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"12px",
borderRadius:"10px",
border:"none",
marginBottom:"15px"
}}
/>

)}



{/* BUTTONS */}

<button
onClick={createRoom}
style={{
width:"100%",
padding:"14px",
borderRadius:"12px",
border:"none",
background:"#ff4d6d",
color:"white",
fontSize:"16px",
fontWeight:"bold",
cursor:"pointer",
marginBottom:"10px"
}}
>
Create Watch Party 🚀
</button>


<button
onClick={joinRoom}
style={{
width:"100%",
padding:"14px",
borderRadius:"12px",
border:"none",
background:"#22c55e",
color:"white",
fontSize:"16px",
fontWeight:"bold",
cursor:"pointer"
}}
>
Join Room 🔗
</button>

</div>
</div>
);
}

export default Home;
