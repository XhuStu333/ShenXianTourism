const Model = require('./Medel');
const {
  Result
} = require('./mysql')



exports.handleSearch = async (req, res) => {
  let search = req.query;
  let data = await Model.getPlace(res, search);
  return res.send(new Result({
    msg: '查询成功',
    data: data
  }));
}

exports.handleShow = async (req, res) => {
  let search = req.query;
  let data = await Model.getComment(res, search);
  let page = await Model.getPage(res, search);
  for(let i in data){
    data[i].face=data[i].face.toString();
  }
  return res.send(new Result({
    msg: '查询成功',
    data: data,
    pageNum: page[0].page
  }));
}

exports.handlePersonComment=async(req,res)=>{
  let search=req.query;
  let data=await Model.getPersonComment(res,search);
  if(data==null||data==""){
    return res.send(new Result({
      msg: '无个人评论',
      data: data,
    }));
  }
  else{
    for(let i in data){
      data[i].face=data[i].face.toString();
    }
    return res.send(new Result({
      msg: '查询成功',
      data: data,
    }));
  }
}

exports.handleRegist = async (req, res) => {
  let body = req.body;
  console.log(body);
  let data = await Model.postRigest(res, body);
  return res.send(new Result({
    msg: '添加成功',
    data: data
  }));
}

exports.handleLogin = async (req, res) => {
  let user = req.body;
  let data = await Model.getLogin(res, user);
  const User = {
    phone: user.phone,
    password: user.password,
  };
  if (User.phone != '' | User.password != '') {
    return res.send(new Result({
      msg: '查询成功',
      data: data
    }));
  } else {
    return res.send(new Result({
      code: 500,
      msg: '查询失败，电话号码或密码为空',
    }));
  }
}

exports.handleFace = async (req, res) => {
  let user = req.query.phone;
  let data = await Model.getFace(res, user);
  if(data==undefined||data==null||data=="")
  return res.send(new Result({
    code: 500,
    msg: '查询失败',
  }));
  data[0].face=data[0].face.toString();
  console.log(data)
  return res.send(data);
}

exports.handleCity = async (req, res) => {
  let pro = req.body.pro;
  if (pro == '四川')
    return res.send(["成都", "绵阳", "自贡", "攀枝花", "泸州", "德阳", "广元",
      "遂宁", "内江", "乐山", "资阳", "宜宾", "南充", "达州", "雅安", "广安", "巴中", "眉山"
    ]);
  else if (pro == '江苏')
    return res.send(["南京", "苏州", "无锡", "徐州", "南通", "连云港", "镇江", "常州", "淮安", "扬州"]);
  else if (pro == '广东')
    return res.send(["广州", "深圳", "珠海", "汕头", "佛山", "东莞", "湛江", "江门", "中山", "惠州"]);
}