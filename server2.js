const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const indexRoutes = require('./routes/indexRoute');

const dbConnection = require('./configurations/dbConfig');
const commonHelper = require('./helpers/commonHelpers')

const app = express();

const moment = require('moment');

const now = moment();
console.log(now.format('YYYY-MM-DD HH:mm:ss'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routing
app.use("/", indexRoutes);

//Handling invalid api request
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  res.status(404).send({ message: "Invalid API" });
  next();
});

//Hadeling error and sending response
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message;
  console.log(error);
  res.status(statusCode).json({ data: { message } });
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const getClientId = async()=>{
  return await commonHelper.createClientId();
}


wss.on('connection', async (ws) => {
  console.log('Client connected');  
  ws.send(JSON.stringify({type:'id',id:await getClientId()}));
  const socketRoutes = require('./routes/socketRoutes/index');

 ws.on('message', async (data) => {
    
    let res = await socketRoutes.indexSocketRouting(data);
   
    if(res != null){
 
      if(res.purpose == 'oneMessage'){

      wss.clients.forEach(function(client) {
        if (client.readyState === WebSocket.OPEN) {
          console.log(res)
          client.send(JSON.stringify({type:'oneMessage',messageDetails:res.messageDetails, id:res.toClientId}));
        }
      });

      }else{
        ws.send(JSON.stringify({type:'messages',messages:res.messagesFromDb, id:res.clientId}));
      }
    }
  });

});

//Database connection and server connection
dbConnection.dbConnection.then(() => {
  server.listen('3001', () => {
    console.log('Server started at 3001');
  });
});
