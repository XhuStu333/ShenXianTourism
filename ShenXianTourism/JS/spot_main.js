const btn = document.querySelector("button");
const video = document.querySelector('#video1');


btn.onclick = function () {
  let content = document.querySelector("input").value;
  console.log(content);
  let page = "./spot_search.html?search=" + content + "&id=1";
  console.log(page)
  window.location.href = encodeURI(page);
}

video.onclick = function () {
  if (video.paused) {
    video.controls = false;
    video.play();
  } else {
    video.controls=true;
  }
}

video.addEventListener('ended',function(){
  video.load();     
},false);

const one=document.querySelector('#one');
const two=document.querySelector('#two');
const three=document.querySelector('#three');
const four=document.querySelector('#four');
const five=document.querySelector('#five');
const iframe=document.querySelector('iframe');
const msg=document.querySelector('#message')

let channel=new MessageChannel();
let port1=channel.port1;
iframe.onload=function(){
  iframe.contentWindow.postMessage('init','*',[channel.port2]);
  one.addEventListener('click',onClick=function() {
    port1.postMessage('1');
    one.className='other';
    two.className='all';
    three.className='all';
    four.className='all';
    five.className='all';
  });
  two.addEventListener('click',onClick=function() {
    port1.postMessage('2');
    one.className='all';
    two.className='other';
    three.className='all';
    four.className='all';
    five.className='all';
  });
  three.addEventListener('click',onClick=function() {
    port1.postMessage('3');
    one.className='all';
    two.className='all';
    three.className='other';
    four.className='all';
    five.className='all';
  });
  four.addEventListener('click',onClick=function() {
    port1.postMessage('4');
    one.className='all';
    two.className='all';
    three.className='all';
    four.className='other';
    five.className='all';
  });
  five.addEventListener('click',onClick=function() {
    port1.postMessage('5');
    one.className='all';
    two.className='all';
    three.className='all';
    four.className='all';
    five.className='other';
  });
  port1.addEventListener('message',onMessage);;
  port1.start();
}

function onMessage(e){
  msg.innerHTML=e.data;
}

