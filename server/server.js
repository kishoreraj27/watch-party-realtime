const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("./cloudinary");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET","POST"]
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// ==========================
// FILE UPLOAD
// ==========================

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.single("video"), (req,res)=>{

try{

cloudinary.uploader.upload_stream(
{
resource_type:"video"
},
(error,result)=>{

if(error){
return res.status(500).json(error);
}

res.json({url:result.secure_url});

}
).end(req.file.buffer);

}catch(err){
res.status(500).json(err);
}

});


// ==========================
// SOCKET SERVER
// ==========================

const server = http.createServer(app);

const io = new Server(server,{
cors:{
origin:"*",
methods:["GET","POST"]
}
});


// ⭐ ROOMS MEMORY
const rooms = {};

io.on("connection",(socket)=>{

console.log("User connected:",socket.id);


// JOIN ROOM
socket.on("join-room",({roomId, username})=>{

socket.username = username;
socket.join(roomId);

io.to(roomId).emit("chat-message",{
   user:"System",
   message:`${username} joined the party 🎉`
});

});



// PLAY
socket.on("play",({roomId,time})=>{

if(rooms[roomId]?.host !== socket.id) return;

socket.to(roomId).emit("play",time);

});


// PAUSE
socket.on("pause",({roomId,time})=>{

if(rooms[roomId]?.host !== socket.id) return;

socket.to(roomId).emit("pause",time);

});


// SEEK
socket.on("seek",({roomId,time})=>{

if(rooms[roomId]?.host !== socket.id) return;

socket.to(roomId).emit("seek",time);

});


// VIDEO CHANGE
socket.on("video-change",({roomId,url})=>{

if(rooms[roomId]?.host !== socket.id) return;

io.to(roomId).emit("video-change",url);

});


// CHAT
socket.on("chat-message",(data)=>{

io.to(data.roomId).emit("chat-message",data);

});


// DISCONNECT → HOST TRANSFER
socket.on("disconnect",()=>{

console.log("Disconnected:",socket.id);

for(const roomId in rooms){

const room = rooms[roomId];

room.users = room.users.filter(id=>id!==socket.id);

if(room.host===socket.id){

if(room.users.length>0){

room.host = room.users[0];

io.to(roomId).emit("host-changed",room.host);

console.log("👑 New host:",room.host);

}else{

delete rooms[roomId];
console.log("Room deleted:",roomId);

}

}

}

});

});


app.get("/",(req,res)=>{
res.send("Watch Party Server Running 🚀");
});

server.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

