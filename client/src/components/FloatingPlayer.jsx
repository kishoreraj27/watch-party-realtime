function FloatingPlayer({videoURL}){

if(!videoURL) return null;

return(

<div style={{
position:"fixed",
bottom:"20px",
right:"20px",
width:"240px",
zIndex:999
}}>

<video
src={videoURL}
autoPlay
muted
style={{
width:"100%",
borderRadius:"12px"
}}
/>

</div>

);

}

export default FloatingPlayer;
