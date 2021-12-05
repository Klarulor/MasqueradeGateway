import {MyWebSocketClient, MyWebSocketServer} from "mowebsocket";
require('dotenv').config()
let client = new MyWebSocketClient("MasqueradeGateway", process.env.ENDPOINT_ADDRESS, true);
let server = new MyWebSocketServer(+process.env.SERVER_PORT, process.env.SERVER_IP);

client.connect(x => console.log("Client connected to "+ process.env.ENDPOINT_ADDRESS));
server.listen(x => console.log("Server startd"));

server.auth((name, key, ip) => key == process.env.CONNECTION_AUTH_KEY);
server.subscribe("pass", async message => {
    let json = JSON.parse(message.content);
    let res = await client.get(json.key, json.content);
    console.log(`${message.content} =========> ${res.content}`);
    message.res(JSON.stringify(res));
})