/*汉堡式导航栏*/
var x = document.getElementById("topNav");
var btnNav = document.getElementsByClassName("icon")[0];
btnNav.onclick = navShow;
function navShow() {
  if (x.className === "topNav") {
    x.className += " responsive";
  } else {
    x.className = "topNav";
  }
  console.log("你点了一哈");
}
/*头像 链接*/
var face = sessionStorage.getItem("face");
var perLink = document.getElementById("perLink");
var perLink2 = document.getElementById("perLink2");
var facePhoto = document.getElementById("facePhoto");
if (face) {
  facePhoto.src = face;
  perLink.href = "personalWeb.html";
  perLink2.href = "personalWeb.html";
}
