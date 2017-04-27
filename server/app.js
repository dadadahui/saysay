/**
 * Created by jhh on 2017/1/11.
 */

const express = require('express');
const bodyParser = require('body-parser');
const AV = require('./lean');
const routes =require('./routes')

const app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(AV.express());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(AV.Cloud.CookieSession({ secret: 'saysecret', maxAge: 3600000, fetchUser: false }));
app.use('/',routes)

// function checkLogin (req, res, next) {
//   if (req.session.user) {
//     next();//检验到用户已登入，转移权限阁下一个路由
//   } else {
//     res.redirect('/');//否则，页面重定位，不执行下面路由
//   }
// }
// app.use(checkLogin())

module.exports = app.listen('9099', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('listening 9099....')
})
