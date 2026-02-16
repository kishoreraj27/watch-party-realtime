import { useRef, useState } from "react";

function VideoPlayer({
videoURL,
isHost,
handlePlay,
handlePause,
handleSeek
}){

const videoRef = useRef(null);
const [showControls,setShowControls] = useState(true);


// auto hide controls
const handleMouseMove = ()=>{
setShowControls(true);

setTimeout(()=>{
setShowControls(false);
},2000);
};


return(

<div
onMouseMove={handleMouseMove}
style={{
position:"relative",
borderRadius:"18px",
overflow:"hidden",
background:"#000"
}}
>

{videoURL ? (

<video
ref={videoRef}
src={videoURL}
controls={showControls && isHost}
onPlay={handlePlay}
onPause={handlePause}
onSeeked={handleSeek}
style={{
width:"100%",
maxHeight:"75vh",
objectFit:"contain",
background:"black"
}}
/>

) : (

<div style={{
height:"70vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
opacity:0.4
}}>
Waiting for host to play a video 🍿
</div>

)}

</div>

);

}

export default VideoPlayer;
