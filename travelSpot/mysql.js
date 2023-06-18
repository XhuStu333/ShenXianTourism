const mysql=require('mysql');


const option={
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'trave',
  connectTimeout: 5000, // 连接超时
  multipleStatements: true // 支持执行多条 sql 语句
}

let pool;
repool();

function repool() {
  pool=mysql.createPool({
    ...option,
    waitForConnections:true,
    connectionLimit:100,
    queueLimit:0
  })
  pool.on('error',err=>err.code==='PROTOCOL_CONNECTION_LOST' && setTimeout(repool, 3000))
}

let db=function(sql,res,params=[]){
  return new Promise((resolve,reject)=>{
    pool.getConnection((err,connection)=>{
      connection.query(sql,params,(err,results)=>{
        if(err){
          let $errData={
            code:500,
            msg:`服务器内部错误${err.message}`,
            data:null
          }
          return res.json(new Result($errData))
        }else{
          resolve(results)
        }
        connection.release();
      })
    })
  })
}

function Result({code=200,msg='成功',data=null,pageNum=null}) {
  this.code=code;
  this.msg=msg;
  this.data=data;
  this.pageNum=pageNum;
}

module.exports={db,Result}