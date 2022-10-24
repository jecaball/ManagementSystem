//creates a new instace of Websocket with port at 8080
const webSocket= new WebSocket("ws://localhost:8080");

//adds event listener to webSocket to indicate that the connection was done
webSocket.addEventListener("open", ()=>{
    console.log("connected");
});

//defines export default as webSocket
export default webSocket;