const ws = require('ws');
const fs=require('fs');
const path=require('path');

const webServer = ws.Server;
const wsServer = new webServer({
  port: 8000
})

const init = () => {
  bindEvent();
};


wsServer.on("open",()=>{
  console.log("open");
});

wsServer.on("close", ()=>{
  console.log("close");
});

wsServer.on("error",()=>{
  console.log("error");
});

wsServer.on("connection", (ws)=>{
  console.log("connection");
  ws.on("message", handleMessage);
});

function handleMessage(msg) {
  console.log("connection2");
  console.log(msg.toString());
  msg=msg.toString();
  /* let p=path.join(__dirname,'comment.JSON');
  fs.readFile(p,'utf-8',(err,data)=>{
    if(err){
      console.log('err',err);
      return
    }
    let arr;
    if(data!=null){
    arr=JSON.parse(data);
    }
    arr.push(JSON.parse(msg));
    fs.writeFile(p,JSON.stringify(arr),'utf-8',function(err){
      console.log('err',err);
    })
  }) */
  
  wsServer.clients.forEach((item) => {
    item.send(msg);
  }); 
}