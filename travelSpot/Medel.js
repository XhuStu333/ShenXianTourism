const {db} = require('./mysql');
const {Result}=require('./mysql')

exports.getPlace = (res, search) => {
  let sql = 'select * from spots where place like ? order by view desc limit ?,?';
  let content = [];
  content.push("%" + search.search + "%");
  console.log([parseInt(search.id-1)*4,parseInt(search.id-1)*4+4,content]);
  let data = db(sql, res, [content,parseInt(search.id-1)*4,4]);
  return data;
}

exports.getComment = (res, search) => {
  let sql = 'select place,title,comments.Cid,username,face,comment,cdata from users,comments,cu where users.Uid=cu.Uid and comments.Cid=cu.Cid and place=? limit ?,?';
  console.log([search.spot,parseInt(search.id-1)*4,4]);
  let com=db(sql, res, [search.spot,parseInt(search.id-1)*4,4]);
  return com;
}

exports.getPersonComment=(res,search)=>{
  let sql = 'select phone,place,title,comments.Cid,username,face,comment,cdata from users,comments,cu where users.Uid=cu.Uid and comments.Cid=cu.Cid and phone=?';
  console.log([search.phone]);
  let com=db(sql, res, [search.phone]);
  return com;
}

exports.getPage=(res,search)=>{
  let sql = 'select count(*) as page from comments where place=?';
  console.log(sql);
  let pageNum=db(sql,res,search.spot);
  return pageNum;
}

exports.postRigest = (res, insert) => {
  let sql = 'INSERT INTO users (username,face,password,phone) VALUES (?,?,?,?)';
  const newUser = {
    username: insert.username,
    face: insert.face,
    password: insert.password,
    phone:insert.phone,
  };
  let data=db(sql,res,[newUser.username, newUser.face, newUser.password, newUser.phone]);
  return data;
}

exports.getLogin = (res, user) => {
  let sql = 'select * from users where phone=? and password=?';
  const User = {
    phone: user.phone,
    password: user.password,
  };
  let data = db(sql, res, [User.phone,User.password]);
  return data;
}

exports.getFace=(res,user)=>{
  let sql = 'select * from users where phone=?';
  console.log(user);
  let data = db(sql, res, [user]);
  return data;
}
