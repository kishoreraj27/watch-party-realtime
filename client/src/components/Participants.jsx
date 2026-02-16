function Participants({users, hostId}){

return(

<div style={{
display:"flex",
gap:"10px",
padding:"10px",
background:"rgba(255,255,255,0.05)",
borderRadius:"12px",
overflowX:"auto"
}}>

{users.map(user=>{

const avatar =
`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`;

return(

<div key={user.id} style={{textAlign:"center"}}>

<img
src={avatar}
style={{
width:"48px",
height:"48px",
borderRadius:"50%",
border: user.id===hostId
? "3px solid gold"
: "none"
}}
/>

<div style={{fontSize:"12px"}}>
{user.name}

{user.id===hostId && " 👑"}
</div>

</div>

);

})}

</div>

);

}

export default Participants;
