import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home(){

const navigate = useNavigate();

const [username,setUsername] = useState(
localStorage.getItem("watchparty-username") || ""
);

const [roomId,setRoomId] = useState("");
const [recentRooms,setRecentRooms] = useState([]);


// LOAD RECENT
useEffect(()=>{

const rooms =
JSON.parse(localStorage.getItem("watchparty-recent")) || [];

setRecentRooms(rooms);

},[]);


// SAVE NAME
useEffect(()=>{
if(username){
localStorage.setItem("watchparty-username",username);
}
},[username]);


// GENERATE ROOM
const generateRoomId = ()=>{
return crypto.randomUUID().slice(0,6);
};


// SAVE HISTORY
const saveRoom = (id)=>{

let rooms =
JSON.parse(localStorage.getItem("watchparty-recent")) || [];

if(!rooms.includes(id)){
rooms.unshift(id);
rooms = rooms.slice(0,6);
localStorage.setItem("watchparty-recent",JSON.stringify(rooms));
}

};


// CREATE
const createRoom = ()=>{

if(!username.trim()){
alert("Enter your name 🙂");
return;
}

const id = generateRoomId();

saveRoom(id);

navigate(`/room/${id}`);

};


// JOIN
const joinRoom = ()=>{

if(!username.trim()){
alert("Enter your name 🙂");
return;
}

if(!roomId){
alert("Enter Room ID");
return;
}

saveRoom(roomId);

navigate(`/room/${roomId}`);

};


const avatar =
`https://api.dicebear.com/7.x/initials/svg?seed=${username || "User"}`;



return(

<div style={wrapper}>


{/* NAVBAR */}

<div style={navbar}>

<div style={logo}>
🎬 WatchParty
</div>

<div style={profile}>

<input
placeholder="Your name"
value={username}
onChange={(e)=>setUsername(e.target.value)}
style={nameInput}
/>

<img
src={avatar}
alt="avatar"
style={avatarStyle}
/>

</div>

</div>



{/* HERO */}

<div style={hero}>

<div style={heroOverlay}/>

<div style={heroContent}>

<h1 style={heroTitle}>
Watch Together.
Feel Together.
</h1>

<p style={heroSub}>
Movies • Friends • Live Chat • Host Control
</p>

<button
onClick={createRoom}
style={heroBtn}
>
Start Party 🍿
</button>

</div>

</div>



{/* JOIN SECTION */}

<div style={joinWrapper}>

<div style={joinCard}>

<h2>Join a Party</h2>

<input
placeholder="Enter Room ID"
value={roomId}
onChange={(e)=>setRoomId(e.target.value)}
style={joinInput}
/>

<button
onClick={joinRoom}
style={joinBtn}
>
Join Now
</button>

</div>

</div>



{/* RECENT ROOMS */}

{recentRooms.length > 0 && (

<div style={recentSection}>

<h2>Continue Watching</h2>

<div style={recentGrid}>

{recentRooms.map((room)=>(
<div
key={room}
style={movieCard}
onClick={()=>navigate(`/room/${room}`)}
>

<div style={movieOverlay}/>

<p style={{zIndex:2}}>
🎬 Room {room}
</p>

</div>
))}

</div>

</div>

)}

</div>

);

}

export default Home;



/* ================= STYLES ================= */

const wrapper={
minHeight:"100vh",
background:"#0b0f1a",
color:"white",
fontFamily:"system-ui"
};

const navbar={
display:"flex",
justifyContent:"space-between",
padding:"20px 40px",
alignItems:"center"
};

const logo={
fontSize:"26px",
fontWeight:"800",
color:"#e50914"
};

const profile={
display:"flex",
alignItems:"center",
gap:"10px"
};

const nameInput={
padding:"8px 12px",
borderRadius:"8px",
border:"none"
};

const avatarStyle={
width:"42px",
height:"42px",
borderRadius:"50%"
};



/* HERO */

const hero={
position:"relative",
height:"70vh",
display:"flex",
alignItems:"center",
paddingLeft:"60px",
background:
"linear-gradient(90deg,#000 10%,transparent), radial-gradient(circle at 20% 50%,#1f2937, #020617)"
};

const heroOverlay={
position:"absolute",
inset:0,
background:"linear-gradient(to top,#0b0f1a,transparent)"
};

const heroContent={
position:"relative",
maxWidth:"600px"
};

const heroTitle={
fontSize:"64px",
fontWeight:"900",
lineHeight:"1.1"
};

const heroSub={
opacity:0.8,
marginTop:"10px"
};

const heroBtn={
marginTop:"20px",
padding:"14px 28px",
fontSize:"18px",
borderRadius:"10px",
border:"none",
background:"#e50914",
color:"white",
cursor:"pointer"
};



/* JOIN */

const joinWrapper={
display:"flex",
justifyContent:"center",
marginTop:"-60px"
};

const joinCard={
background:"#111827",
padding:"30px",
borderRadius:"18px",
width:"400px",
boxShadow:"0 20px 80px rgba(0,0,0,0.8)"
};

const joinInput={
width:"100%",
padding:"12px",
borderRadius:"10px",
border:"none",
marginTop:"10px"
};

const joinBtn={
marginTop:"12px",
width:"100%",
padding:"12px",
borderRadius:"10px",
border:"none",
background:"#22c55e",
color:"white",
fontWeight:"bold",
cursor:"pointer"
};



/* RECENT */

const recentSection={
padding:"50px"
};

const recentGrid={
display:"flex",
gap:"20px",
marginTop:"20px",
flexWrap:"wrap"
};

const movieCard={
position:"relative",
width:"220px",
height:"130px",
borderRadius:"14px",
cursor:"pointer",
display:"flex",
alignItems:"center",
justifyContent:"center",
background:
"linear-gradient(135deg,#111827,#1f2937)",
overflow:"hidden",
transition:"0.3s"
};

const movieOverlay={
position:"absolute",
inset:0,
background:"linear-gradient(to top,rgba(0,0,0,0.8),transparent)"
};
