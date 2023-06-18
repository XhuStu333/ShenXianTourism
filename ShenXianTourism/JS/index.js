/*轮播图*/
window.addEventListener('load', function () {
  //获取元素
  var lefta = document.querySelector('.left');//左右箭头按钮
  var righta = document.querySelector('.right');
  var map = document.querySelector('.map');
  var imgs = map.querySelector('.imgs');
  var imgt = imgs.querySelectorAll('li');
  var j = 1;

  //自动翻页函数
  var timeone = setInterval(function () {
    rightf();
  }, 1500);

  //左右按钮的出现
  map.addEventListener('mouseover', function () {
    lefta.style.display = 'block';
    righta.style.display = 'block';
    //移入时清除定时器
    clearInterval(timeone);
    timeone = null;
  })
  //左右按钮的消失
  map.addEventListener('mouseout', function () {
    lefta.style.display = 'none';
    righta.style.display = 'none';
    //恢复定时器
    clearInterval(timeone);
    timeone = setInterval(function () {
      rightf();
    }, 1500)
  })
  //点击左右按钮切换页面
  righta.addEventListener('click', function () {
    rightf();
  })
  lefta.addEventListener('click', function () {
    leftf();
  })

  //动态生成小圆圈，小圈圈模块
  var list = map.querySelector('.list');
  for (var i = 0; i < imgs.children.length; i++) {
    //创建li，加入ul中
    var li = document.createElement('li');
    list.appendChild(li);
    //给小圈圈添加类名
    li.setAttribute('index', i);
    //排他思想，实现点击小圆圈，变色
    li.addEventListener('click', colors);
    //经过小圆圈，切换图片
    li.addEventListener('mouseenter', jump);
  }
  //一开始第二个亮
  list.children[1].className = 'change';

  //变色函数 
  function colors() {
    //把所有的小圆圈变白
    for (var i = 0; i < list.children.length; i++) {
      list.children[i].className = '';
    }
    //给图片对应的小圆圈上色
    var index = this.getAttribute('index');
    list.children[index].className = 'change';
  }

  //跳转函数
  function jump() {
    var index = this.getAttribute('index');
    var now = num.indexOf('two');
    //计算经过点与当前点的距离
    var dif = Math.max(index, now) - Math.min(index, now);
    if (index > now) {
      while (dif--) {
        rightf();
      }
    } else {
      while (dif--) {
        leftf();
      }
    }
  }

  //小圆圈跟随着图片移动
  function colort() {
    for (var i = 0; i < list.children.length; i++) {
      list.children[i].className = '';
    }
    if (j >= 6) {//后翻
      j = 0;
    } else if (j < 0) {//前翻
      j = 5;
    }
    list.children[j].className = 'change';
  }

  //翻页模块
  var num = ['one', 'two', 'three', 'four', 'five', 'six'];
  //右翻页
  function rightf() {
    //把数组的最后一个添加到第一个
    num.unshift(num[5]);
    //删除最后一个
    num.pop();
    //重新给li添加类名
    for (var i = 0; i < num.length; i++) {
      imgt[i].setAttribute('class', num[i]);
    }
    //通过这个全局变量来让小圆圈的颜色一起变化
    j++;
    colort();
  }
  //左翻页
  function leftf() {
    num.push(num[0]);
    num.shift();
    for (var i = 0; i < num.length; i++) {
      imgt[i].setAttribute('class', num[i]);
    }
    j--;
    colort();
  }

  //点击图片实现翻页,通过在左右两边添加一个盒子来实现的
  var rights = document.querySelector('.rights');
  rights.addEventListener('click', function () {
    rightf();
  })
  var lefts = document.querySelector('.lefts');
  lefts.addEventListener('click', function () {
    leftf();
  })
})

/*canvas*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var x0 = 80, y0 = 450, x1 = 560, y1 = 60;
var province = ['浙江', '重庆', '广东', '江苏', '湖南', '上海', '四川'];
var height = 500;
draw();
function draw() {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(x0, y1);
  ctx.lineTo(x0, y0);
  ctx.stroke();
  var yDis = 40,//设定柱子之前的间距
    width = 15;//设定每个柱子的宽度
  var color = '#183A6A';
  ctx.fillStyle = color;
  ctx.save();//画布栈存颜色
  var color = 'orange';
  ctx.fillStyle = color;
  ctx.save();
  ctx.restore();
  for (var i = 0; i < 7; i++) {
    ctx.beginPath();
    height = height - i * 10;
    var rectY = y1 + (width + yDis) * i, rectX = height;//柱子的位置
    ctx.fillRect(x0 + 1.5, rectY + 15, height, width);//绘制一个柱状                
    // ctx.fillText(height,rectX+40,y1+rectY-15);//显示柱子的值
  }
  ctx.restore();//恢复成暗蓝色
  for (var i = 0; i < 7; i++) {
    height = 500;
    ctx.beginPath();
    ctx.font = "13px scans-serif";//设置字体
    height = height - Math.round(Math.random() * 350);//在一定范围内随机高度
    ctx.fillText(province[i], x0 - 50, rectY + 35);//绘制省份
    var rectY = y1 + (width + yDis) * i, rectX = height;//柱子的位置
    ctx.fillRect(x0 + 1.5, rectY + 30, height, width);//绘制一个柱状
    ctx.save();
  }

  /*phone*/
  var phone = sessionStorage.getItem("phone");
  var perPhoto = document.getElementById("perPhoto");
  var perLink = document.getElementById("perLink");
  var perLink2 = document.getElementById("perLink2");

  if (phone) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/face?phone=' + phone, true);
    xhr.responseType = 'json';
    console.log("phone：" + phone);
    console.log("xhr：" + xhr);
    xhr.onload = function () {
      if (this.status == 200) {       
        var img = document.createElement("img");
        let aspan = this.response[0];
        console.log(aspan);
        img.src = aspan.face.replaceAll(" ", "+");
        /*存储UID 头像 用户名*/
        sessionStorage.setItem("uid", aspan.Uid);
        sessionStorage.setItem("face", img.src);
        sessionStorage.setItem("username", aspan.username);

        perLink.removeChild(perPhoto);
        perLink.appendChild(img);
        perLink.href = 'personalWeb.html';
        perLink2.href = 'personalWeb.html';
      }
    };
    xhr.send();
  }




}



