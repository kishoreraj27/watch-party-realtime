import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {

const navigate = useNavigate();

const [username, setUsername] = useState(
localStorage.getItem("watchparty-username") || ""
);

const [roomId, setRoomId] = useState("");


// CREATE PARTY
const createParty = () => {

if(!username.trim()){
alert("Enter your name first 🙂");
return;
}

localStorage.setItem("watchparty-username", username);

const id = crypto.randomUUID().slice(0,6);

navigate(`/room/${id}`);
};


// JOIN PARTY
const joinParty = () => {

if(!username.trim()){
alert("Enter your name first 🙂");
return;
}

if(!roomId){
alert("Enter Room ID");
return;
}

localStorage.setItem("watchparty-username", username);

navigate(`/room/${roomId}`);
};



return(

<div style={{
height:"100vh",
width:"100%",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"radial-gradient(circle at top,#020617,#020617,#000)",
color:"white"
}}>

{/* HERO CARD */}

<div style={{

width:"520px",
padding:"50px",
borderRadius:"26px",
background:"rgba(255,255,255,0.05)",
backdropFilter:"blur(25px)",
boxShadow:"0 40px 120px rgba(0,0,0,0.9)",
textAlign:"center"

}}>

<h1 style={{
fontSize:"48px",
marginBottom:"10px"
}}>
🎬 WatchParty
</h1>

<p style={{
opacity:0.6,
marginBottom:"40px"
}}>
Watch Together. Feel Together.
</p>


{/* NAME INPUT */}

<input
placeholder="Enter your name"
value={username}
onChange={(e)=>setUsername(e.target.value)}
style={{
width:"100%",
padding:"16px",
borderRadius:"12px",
border:"none",
marginBottom:"18px",
fontSize:"16px"
}}
/>


{/* CREATE BUTTON */}

<button
onClick={createParty}
style={{
width:"100%",
padding:"16px",
borderRadius:"14px",
border:"none",
background:"linear-gradient(135deg,#ff4d6d,#ff1744)",
color:"white",
fontSize:"18px",
fontWeight:"bold",
cursor:"pointer",
marginBottom:"25px",
boxShadow:"0 10px 40px rgba(255,0,80,0.4)"
}}
>
Start Watch Party 🚀
</button>



{/* DIVIDER */}

<div style={{
opacity:0.3,
margin:"20px 0"
}}>
──────── OR ────────
</div>



{/* JOIN */}

<input
placeholder="Enter Room ID"
value={roomId}
onChange={(e)=>setRoomId(e.target.value)}
style={{
width:"100%",
padding:"16px",
borderRadius:"12px",
border:"none",
marginBottom:"15px",
fontSize:"16px"
}}
/>

<button
onClick={joinParty}
style={{
width:"100%",
padding:"16px",
borderRadius:"14px",
border:"none",
background:"linear-gradient(135deg,#22c55e,#16a34a)",
color:"white",
fontSize:"18px",
fontWeight:"bold",
cursor:"pointer",
boxShadow:"0 10px 40px rgba(0,255,120,0.3)"
}}
>
Join Party 🔗
</button>

</div>

</div>
);
}

export default Home;
