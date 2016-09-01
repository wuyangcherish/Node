## MySQL + Nodejs

### useful links

1. [npm  mysql](https://www.npmjs.com/package/mysql)
2. [用 Nodejs 连接数据库](http://blog.fens.me/nodejs-mysql-intro/)

### mysql 增删改查

##### insertSQL

```
var insertSQL = 'insert into login values(1,"Ray","Ray1203")';
conn.query(insertSQL, function(err, res){
  if(err){
    console.log(err)
  }
  console.log("Insert return ==>");
  console.log(res)
});
```
如果查询错误的话会返回：

```
{ [Error: ER_WRONG_VALUE_COUNT_ON_ROW: Column count doesn't match value count at row 1]
  code: 'ER_WRONG_VALUE_COUNT_ON_ROW',
  errno: 1136,
  sqlState: '21S01',
  index: 0 }
Insert return ==>
undefined
```

如果正确的插入文件会返回类似下面的值

```
Insert return ==>
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 1,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
```

这样，在数据库里面去查看的时候就会多了一条数据

PS: 改查删的操作同上


### mysql 报错 

代码在 app-reconnect.js 中

例如下面的是登陆时候密码错误的情形，会在每2s 进行一次请求


```
error when connecting to db: { [Error: ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost' (using password: YES)]
  code: 'ER_ACCESS_DENIED_ERROR',
  errno: 1045,
  sqlState: '28000',
  fatal: true }
error when connecting to db: { [Error: ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost' (using password: YES)]
  code: 'ER_ACCESS_DENIED_ERROR',
  errno: 1045,
  sqlState: '28000',
  fatal: true }
error when connecting to db: { [Error: ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost' (using password: YES)]
  code: 'ER_ACCESS_DENIED_ERROR',
  errno: 1045,
  sqlState: '28000',
  fatal: true }
```

