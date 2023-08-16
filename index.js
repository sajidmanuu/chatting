const express=require('express');
const {Server}=require("socket.io");
const http=require('http');
const cors=require('cors');
const { Socket } = require('dgram');
const { log } = require('console');


const app=express();
app.use(cors());

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
    console.log(socket.id);
    
   
    socket.on("joinRoom",room=>socket.join(room));
    socket.on("newMessage",({newMessage,room})=>{
        console.log(room,newMessage);
        io.in(room).emit("getLatestMessage",newMessage)
    })
})

app.get("/",(req,res)=>{
    res.send("socket");;
})
server.listen(8000,()=>{console.log("server is started on 8000");})