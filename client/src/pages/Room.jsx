import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../socket";

import VideoPlayer from "../components/VideoPlayer";
import Participants from "../components/Participants";
import Chat from "../components/Chat";
import Reactions from "../components/Reactions";
import FloatingPlayer from "../components/FloatingPlayer";

function Room(){

const { id } = useParams();

const username =
localStorage.getItem("watchparty-username") || "Guest";

const [videoURL,setVideoURL] = useState("");
const [messages,setMessages] = useState([]);
const [input,setInput] = useState("");
const [users,setUsers] = useState([]);
const [hostId,setHostId] = useState("");
const [typingUser,setTypingUser] = useState("");


// JOIN
useEffect(()=>{

socket.emit("join-room",{roomId:id,username});

socket.on("users-update",setUsers);
socket.on("host-changed",setHostId);
socket.on("video-change",setVideoURL);

socket.on("chat-message",(msg)=>{
setMessages(prev=>[...prev,msg]);
});

socket.on("typing",(user)=>{
setTypingUser(user);

setTimeout(()=>setTypingUser(""),1500);
});

},[]);


// SEND CHAT
const sendMessage = ()=>{

socket.emit("chat-message",{
roomId:id,
user:username,
message:input
});

setInput("");

};


// SEND TYPING
useEffect(()=>{
if(input){
socket.emit("typing",{roomId:id,user:username});
}
},[input]);


// REACTIONS
const sendReaction = (emoji)=>{
socket.emit("reaction",{roomId:id,emoji});
};


// VIDEO CONTROL PLACEHOLDER
const handlePlay = ()=>{};
const handlePause = ()=>{};
const handleSeek = ()=>{};


return(

<div style={{
padding:"20px",
background:"#020617",
minHeight:"100vh",
color:"white"
}}>

<Participants users={users} hostId={hostId}/>

<div style={{
display:"grid",
gridTemplateColumns:"2fr 1fr",
gap:"20px",
marginTop:"20px"
}}>

<div style={{position:"relative"}}>

<VideoPlayer
videoURL={videoURL}
isHost={socket.id===hostId}
handlePlay={handlePlay}
handlePause={handlePause}
handleSeek={handleSeek}
/>

<Reactions sendReaction={sendReaction}/>

</div>

<Chat
messages={messages}
input={input}
setInput={setInput}
sendMessage={sendMessage}
typingUser={typingUser}
/>

</div>

<FloatingPlayer videoURL={videoURL}/>

</div>

);

}

export default Room;
