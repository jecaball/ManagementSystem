const webSocket= new WebSocket("ws://localhost:8080");
webSocket.addEventListener("open", ()=>{
    console.log("connected");
});

export default webSocket;