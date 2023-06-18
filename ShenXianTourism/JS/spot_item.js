const comment = document.querySelector("#comment");
let commentList;
let page = 1;
let all;
let btnShare1=document.getElementById("share1");
let btnShare2=document.getElementById("share2");

btnShare1.onclick=function () {
  window.location.href = "./comment.html";
}
btnShare2.onclick=function () {
  window.location.href = "./showPhoto.html";
}
window.onload = function () {
  let spot;
  spot = getMsg();
  updataDate(spot, 1);
  setTimeout("getJson()",2000); 
}

function getMsg() {
  let spot = decodeURI(window.location.search);
  console.log(spot);
  return spot;
}

function updataDate(spot, n) {
  document.querySelector("h1").innerHTML = spot.substring(6, spot.length - 5);
  spot = spot.substring(0, spot.length - 1) + n;
  let xhr = new XMLHttpRequest();
  console.log(spot)
  xhr.open('GET', 'http://localhost:3000/showSpot' + spot, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    console.log(commentList);
    if (this.readyState == 4) {
      if (this.status == 200) {
        //数据
        commentList = this.response.data;
        let res = "";
        console.log(commentList)
        if (commentList != null) {
          for (let index in commentList) {
            res += '<div id="comment-show"' + 'class="' + commentList[index].Cid + '">';
            res += '<span><img src="' + commentList[index].face.replaceAll(" ", "+") + '"></span>';
            res += '<span>' + commentList[index].username + '</span>';
            res += '<hr/><ul><li></li><li></li><li></li><li></li><li></li></ul><div>';
            res += '<h4>' + commentList[index].title + '</h4></div>';
            res += '<p>' + commentList[index].comment + '</p>';
            res += '<div><span>撰写日期：' + commentList[index].cdata.substring(0, 10) + '</span>';
            res += '<span id="icon-love"><img src="./img/love.png"></span></div>';
            res += '<div><input type="text" id="inform" placeholder="爱评论的人运气都不差"><input type="button" id="send' + commentList[index].Cid + '" value="发送" onclick="getDom(this)"></div><div id="reply' + commentList[index].Cid + '"></div></div><hr/>';
          }
          comment.innerHTML = res;
        }
      }
    }
  }
  xhr.send();
}

function getJson() {
  let xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'http://localhost:3000/static/comment.json', true);
  xhr2.responseType = 'json';
  xhr2.onload = function (e) {
    if (this.status == 200) {
      let data=this.response;
      console.log(data);
      for(let i in data){
        let res=data[i].username+":"+data[i].message;
        let d="#reply"+data[i].Cid;
        console.log(d);
        document.querySelector(d).innerHTML=res;
      }
    }
  };
  xhr2.send();
}

let webSocket = new WebSocket('ws:localhost:8000');
let inform;
let sendMsg;
let dom;
let username;
let cid;

function getDom(e) {
  sendMsg = e;
  inform = sendMsg.previousElementSibling;
  console.log(sendMsg.parentNode.nextElementSibling);
  let message = inform.value;
  console.log(sendMsg.parentNode.parentNode);
  dom = sendMsg.parentNode;
  cid = dom.parentNode.className;
  console.log(cid);
  let msg = {
    cid: cid,
    username: username,
    message: message
  }
  if (message == "") {
    return
  }
  webSocket.send(JSON.stringify(msg));
  inform.value = ""
}

// sendMsg.addEventListener('click',()=>{

// })

webSocket.addEventListener("open", (e) => {
  console.log("open", e)
  username = sessionStorage.getItem("username");
  console.log(username);
  cid = dom.className;
  console.log(cid);

})

webSocket.addEventListener("close", (e) => {
  console.log("close", e)
})

webSocket.addEventListener("error", (e) => {
  console.log("erroe", e);
})

webSocket.addEventListener("message", (e) => {
  console.log("message", JSON.parse(e.data));
  renderPage(JSON.parse(e.data))
})

function renderPage(msg) {
  if (msg.username == null) {
    alert("请先登录才能评论");
  } else {
    console.log(msg);
    idname = "reply" + msg.cid;
    let show = document.querySelector('#' + idname);
    console.log(show);
    let res = msg.username + ':' + msg.message;
    let p = document.createElement("p")
    show.appendChild(p);
    show.lastElementChild.innerHTML = res;
  }

}

window.onbeforeunload = function () {
  webSocket.close();
}