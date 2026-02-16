import { useEffect, useRef } from "react";
import WebTorrent from "webtorrent";

function TorrentPlayer({ torrentFile }) {

const videoRef = useRef(null);

useEffect(()=>{

if(!torrentFile) return;

const client = new WebTorrent();

client.add(torrentFile, (torrent)=>{

const file = torrent.files.find(file =>
file.name.endsWith(".mp4") ||
file.name.endsWith(".mkv") ||
file.name.endsWith(".webm")
);

if(file){
file.renderTo(videoRef.current);
}

});

return ()=>{
client.destroy();
};

},[torrentFile]);

return(
<video
ref={videoRef}
controls
autoPlay
style={{
width:"100%",
borderRadius:"16px",
boxShadow:"0 20px 60px rgba(0,0,0,0.7)"
}}
/>
);

}

export default TorrentPlayer;
