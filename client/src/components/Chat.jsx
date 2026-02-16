import { useEffect, useRef } from "react";

function Chat({
messages,
input,
setInput,
sendMessage,
typingUser
}){

const endRef = useRef(null);

useEffect(()=>{
endRef.current?.scrollIntoView({behavior:"smooth"});
},[messages]);

return(

<div style={{
display:"flex",
flexDirection:"column",
height:"70vh",
background:"rgba(0,0,0,0.35)",
padding:"12px",
borderRadius:"12px"
}}>

<div style={{
flex:1,
overflowY:"auto"
}}>

{messages.map((msg,i)=>{

const avatar =
`https://api.dicebear.com/7.x/initials/svg?seed=${msg.user}`;

return(

<div key={i} style={{
display:"flex",
gap:"8px",
marginBottom:"10px"
}}>

<img
src={avatar}
style={{
width:"34px",
height:"34px",
borderRadius:"50%"
}}
/>

<div>
<strong>{msg.user}</strong>
<div>{msg.message}</div>
</div>

</div>

);

})}

<div ref={endRef}/>

{typingUser && (
<div style={{opacity:0.6}}>
{typingUser} is typing...
</div>
)}

</div>


<input
value={input}
onChange={(e)=>setInput(e.target.value)}
onKeyDown={(e)=>{
if(e.key==="Enter") sendMessage();
}}
placeholder="Type message..."
style={{
padding:"10px",
borderRadius:"8px",
border:"none"
}}
/>

</div>

);

}

export default Chat;
