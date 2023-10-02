const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dbConnect = require("./configuration/db");
const cors = require("cors");
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/',userRoutes);
app.use('/admin',adminRoutes);
app.use('/vendor',vendorRoutes);

//Handling invalid api request
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    res.send({ message: "Invalid API" });
    next();
  });
  
  //Hadeling error and sending response
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    const message = error.message;
    console.log(error);
    res.status(statusCode).json({ message });
  });

  const server = http.createServer(app);
  
const wss = new WebSocket.Server({ server });

wss.on('connection', async (ws) => {
  console.log('Client connected');  
   ws.send(JSON.stringify({type:'id',id:'101'}));
//   const socketRoutes = require('./routes/socketRoutes/index');

//  ws.on('message', async (data) => {
    
//     let res = await socketRoutes.indexSocketRouting(data);
   
//     if(res != null){
 
//       if(res.purpose == 'oneMessage'){

//       wss.clients.forEach(function(client) {
//         if (client.readyState === WebSocket.OPEN) {
//           console.log(res)
//           client.send(JSON.stringify({type:'oneMessage',messageDetails:res.messageDetails, id:res.toClientId}));
//         }
//       });

//       }else{
//         ws.send(JSON.stringify({type:'messages',messages:res.messagesFromDb, id:res.clientId}));
//       }
//     }
//   });

});


dbConnect.dbConnection.then(()=>{
  server.listen('3001',()=>{
        console.log('API server listening on port:', 3001);    
    })
})
