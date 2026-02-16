import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import socket from "../socket";

function Room(){

const { id } = useParams();

const videoRef = useRef(null);
const chatEndRef = useRef(null);
const isRemoteAction = useRef(false);

const [messages,setMessages] = useState([]);
const [input,setInput] = useState("");
const [isHost,setIsHost] = useState(false);
const [videoURL,setVideoURL] = useState("");

const username = "User" + Math.floor(Math.random()*1000);


// ✅ JOIN ROOM
useEffect(()=>{

socket.emit("join-room", id, (res)=>{
if(res?.isHost){
setIsHost(true);
}
});


// PLAY
socket.on("play",(time)=>{

const video = videoRef.current;
if(!video) return;

isRemoteAction.current = true;

const diff = Math.abs(video.currentTime - time);

if(diff > 0.25){
video.currentTime = time;
}

video.play();
});


// PAUSE
socket.on("pause",(time)=>{

const video = videoRef.current;
if(!video) return;

isRemoteAction.current = true;

const diff = Math.abs(video.currentTime - time);

if(diff > 0.25){
video.currentTime = time;
}

video.pause();
});


// SEEK
socket.on("seek",(time)=>{
isRemoteAction.current = true;
videoRef.current.currentTime = time;
});


// VIDEO CHANGE
socket.on("video-change",(url)=>{

setVideoURL(url);

setTimeout(()=>{
videoRef.current.load();
},300);

});


// HOST CHANGE
socket.on("host-changed",(newHost)=>{

if(socket.id === newHost){
setIsHost(true);
alert("You are the new Host 👑");
}else{
setIsHost(false);
}

});


// CHAT
socket.on("chat-message",(msg)=>{
setMessages(prev=>[...prev,msg]);
});


// CLEANUP
return ()=>{

socket.off("play");
socket.off("pause");
socket.off("seek");
socket.off("video-change");
socket.off("chat-message");
socket.off("host-changed");

};

},[id]);


// AUTO SCROLL
useEffect(()=>{
chatEndRef.current?.scrollIntoView({behavior:"smooth"});
},[messages]);


// ================= LOCAL CONTROLS =================

const handlePlay = ()=>{

if(!isHost) return;

if(isRemoteAction.current){
isRemoteAction.current=false;
return;
}

socket.emit("play",{
roomId:id,
time:videoRef.current.currentTime
});
};

const handlePause = ()=>{

if(!isHost) return;

if(isRemoteAction.current){
isRemoteAction.current=false;
return;
}

socket.emit("pause",{
roomId:id,
time:videoRef.current.currentTime
});
};

const handleSeek = ()=>{

if(!isHost) return;

if(isRemoteAction.current){
isRemoteAction.current=false;
return;
}

socket.emit("seek",{
roomId:id,
time:videoRef.current.currentTime
});
};


// ================= UPLOAD =================

const uploadVideo = async(file)=>{

const formData = new FormData();
formData.append("video",file);

const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`,{
  method:"POST",
  body:formData
});

const data = await res.json();

setVideoURL(data.url);

socket.emit("video-change",{
roomId:id,
url:data.url
});
};


// ================= GOOGLE DRIVE =================

const convertDriveLink = (link) => {

let fileId = "";

// Handles multiple drive formats
if(link.includes("/file/d/")){
fileId = link.split("/file/d/")[1].split("/")[0];
}
else if(link.includes("id=")){
fileId = link.split("id=")[1];
}

return `https://drive.google.com/uc?export=open&id=${fileId}`;
};




// ================= CHAT =================

const sendMessage = ()=>{

if(!input.trim()) return;

socket.emit("chat-message",{
roomId:id,
message:input,
user:username
});

setInput("");
};



// ================= UI =================

return(

<div style={{
minHeight:"100vh",
background:"linear-gradient(135deg,#0f172a,#020617)",
display:"flex",
justifyContent:"center",
alignItems:"center",
color:"white"
}}>

<div style={{
width:"95%",
maxWidth:"1400px",
background:"rgba(255,255,255,0.05)",
backdropFilter:"blur(20px)",
borderRadius:"20px",
padding:"25px",
boxShadow:"0 20px 80px rgba(0,0,0,0.6)"
}}>

<h2>
🎬 Room: {id}
{isHost && " 👑 Host"}

<button
onClick={()=>{
navigator.clipboard.writeText(window.location.href);
alert("Invite link copied!");
}}
style={{
marginLeft:"20px",
padding:"8px 14px",
borderRadius:"8px",
border:"none",
background:"#22c55e",
color:"white",
cursor:"pointer"
}}
>
Copy Invite 🔗
</button>

</h2>


<div style={{
display:"grid",
gridTemplateColumns:"2fr 1fr",
gap:"20px",
marginTop:"20px"
}}>


{/* VIDEO SIDE */}

<div>

{isHost && (
<>
<input
type="file"
accept="video/*"
onChange={(e)=>uploadVideo(e.target.files[0])}
style={{marginBottom:"10px"}}
/>

<input
placeholder="Paste Google Drive link & press Enter"
onKeyDown={(e)=>{
if(e.key==="Enter"){

const url = convertDriveLink(e.target.value);

setVideoURL(url);

socket.emit("video-change",{
roomId:id,
url
});
}
}}
style={{
width:"100%",
padding:"10px",
borderRadius:"8px",
border:"none",
marginBottom:"10px"
}}
/>
</>
)}


<video
ref={videoRef}
width="100%"
controls={isHost}
onPlay={handlePlay}
onPause={handlePause}
onSeeked={handleSeek}
style={{
borderRadius:"15px",
boxShadow:"0 10px 40px rgba(0,0,0,0.7)"
}}
>
{videoURL && (
<source src={videoURL} type="video/mp4"/>
)}
</video>

{!isHost && (
<p style={{opacity:0.7,marginTop:"10px"}}>
Host is controlling the video 🎬
</p>
)}

</div>



{/* CHAT SIDE */}

<div style={{
background:"rgba(0,0,0,0.3)",
padding:"15px",
borderRadius:"12px",
display:"flex",
flexDirection:"column",
height:"500px"
}}>

<div style={{
flex:1,
overflowY:"auto"
}}>

{messages.map((msg,i)=>(
<div key={i} style={{marginBottom:"8px"}}>
<strong>{msg.user}:</strong> {msg.message}
</div>
))}

<div ref={chatEndRef}/>

</div>


<div style={{marginTop:"10px"}}>

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
placeholder="Type message..."
style={{
width:"70%",
padding:"10px",
borderRadius:"8px",
border:"none",
marginRight:"8px"
}}
/>

<button
onClick={sendMessage}
style={{
padding:"10px 16px",
borderRadius:"8px",
border:"none",
background:"#ff4d6d",
color:"white",
cursor:"pointer"
}}
>
Send
</button>

</div>

</div>

</div>
</div>
</div>
);
}

export default Room;
