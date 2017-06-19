var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
      res.render('index', { title: req.session.user.name });
  }else{
      res.render('login', { title: 'login' });
  }
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  var User = global.dbHandel.getModel('user');
  res.render('login', { title: 'login' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  var User = global.dbHandel.getModel('user');
  res.render('register', { title: 'register' });
});
/* GET register page. */
router.post('/register', function(req, res, next) {
  var User = global.dbHandel.getModel('user');

  // ?t=00 get参数
  var _query = req.query;
  // name=name,pwd=123 post参数
  var _body = req.body;

  var uname = req.body.username;
  var upwd = req.body.pwd;

  User.findOne({name: uname},function(err,doc){
      if(err){
          res.render('register', { title: '注册失败 01' });
      }else if(doc){
          res.render('register', { title: '用户名已存在 02' });
      }else{
          User.create(
              {
                  name: uname,
                  password: upwd
              },
              function(err,doc){
                  if (err) {
                      res.render('register', { title: '注册失败 03' });
                      console.log(err);
                  } else {
                      res.render('register', { title: uname });
                  }
              }
          );
      }
  });

  // res.render('register', { title: uname });
  // res.send('');
});
/* GET login page. */
router.post('/login', function(req, res, next) {
  var User = global.dbHandel.getModel('user');

  // ?t=00 get参数
  var _query = req.query;
  // name=name,pwd=123 post参数
  var _body = req.body;

  var uname = req.body.username;
  var upwd = req.body.pwd;

  User.findOne({name: uname,password: upwd},function(err,doc){
      if(err){
          res.render('login', { title: '登录失败 01' });
      }else if(doc){
          req.session.user = doc;
          res.render('index', { title: req.session.user.name });
          // res.render('login', { title: '登录成功 02' });
      }else{
          res.render('login', { title: '登录失败 03' });
      }
  });

});

module.exports = router;
