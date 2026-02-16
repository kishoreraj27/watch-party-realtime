const emojis = ["🔥","😂","😍","👏","😮"];

function Reactions({sendReaction}){

return(

<div style={{
position:"absolute",
bottom:"20px",
left:"50%",
transform:"translateX(-50%)",
display:"flex",
gap:"10px"
}}>

{emojis.map(e=>(
<button
key={e}
onClick={()=>sendReaction(e)}
style={{
fontSize:"22px",
border:"none",
background:"transparent",
cursor:"pointer"
}}
>
{e}
</button>
))}

</div>

);

}

export default Reactions;
