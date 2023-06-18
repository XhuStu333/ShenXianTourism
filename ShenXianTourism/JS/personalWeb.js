/*局部页面切换*/
var messages = document.getElementById("messages");
var comment = document.getElementById("comment");
var myPhotos = document.getElementById("myPhotos");
var info = document.getElementById("info");
var comment_page = document.getElementById("comment_page");
var showP = document.getElementById("showP");
var phone = sessionStorage.getItem("phone");

messages.addEventListener("click", handle2);
comment.addEventListener("click", handle1);
myPhotos.addEventListener("click", handle3);

function handle1() {
  info.style.display = "none";
  showP.style.display = "none";
  comment_page.style.display = "block";
  if (phone) showComment(phone);
}
function handle2() {
  showP.style.display = "none";
  comment_page.style.display = "none";
  info.style.display = "block";
}
function handle3() {
  info.style.display = "none";
  comment_page.style.display = "none";
  showP.style.display = "block";
}

/*多级级联列表*/
let edit = document.querySelector('#edit');
let province = document.querySelector("#sl1");
let city = document.querySelector("#sl2");
let infoAll = document.getElementsByClassName("info_inp");
let submit = document.getElementById("submit");

window.onload = show();
function show() {
  let pro = province.value;
  console.log("1");
  if (pro == "") {
    city.options.length = 0;
    city.options.add(new Option("--请选择城市--"));
  } else {
    city.options.length = 0;
    let params = "pro=" + pro;
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/cityList', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.responseType = 'json';
    xhr.send(params);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          console.log(xhr);
          console.log(this.response)
          let citylist = this.response;
          for (let i = 0; i < citylist.length; i++) {
            city.options.add(new Option(citylist[i]));
            city.selected = true;
          }
        }
      }
    }
  }
}

/*修改简介*/
edit.onclick = function () {
  city.disabled = false;
  province.disabled = false;
  for (let i = 0; i < 6; i++) {
    infoAll[i].readOnly = false;
  }
}
submit.onclick = function () {
  city.disabled = true;
  province.disabled = true;
  for (let i = 0; i < 6; i++) {
    infoAll[i].readOnly = true;
  }
}

/*照片墙*/
var uid = sessionStorage.getItem("uid");
var myStorage = window.localStorage;
for (let i = 0; i < 8; i++) {
  let s = myStorage.getItem("photo" + uid + "_" + i);
  var img1 = document.createElement("img");
  if (s) {
    img1.src = s;
    showP.appendChild(img1);
    n = i;
  } else break;
}

/*获取本人评论*/
function showComment(photo) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/personalComment?phone=' + phone, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        //数据
        commentList = this.response.data;
        let res = "";
        console.log(commentList)
        if (commentList != null) {
          for (let index in commentList) {
            res += '<div id="comment_show">';
            res += '<div style="margin-bottom:5px;"><span><img src="' + commentList[index].face.replaceAll(" ", "+") + '"></span>';
            res += '<span>' + commentList[index].username + '</span></div>';
            res += '<hr/><ul><li></li><li></li><li></li><li></li><li></li></ul><br/><br/><div>';
            res += '<h3>' + commentList[index].title + '</h3>';
            res += '<p>' + commentList[index].comment + '</p></div>';
            res += '<div style="background-color: white;"><span>撰写日期：' + commentList[index].cdata.substring(0, 10) + '</span>';
            res += '<span id="icon-love"><img src="./img/love.png" style="width:20px; height:20px"></span></div></div>';
          }
          comment_page.innerHTML = res;
        }
      }
    }
  }
  xhr.send();
}
