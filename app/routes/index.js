var
express = require('express'),
router = express.Router(),
crypto = require('crypto');

// Md5 key
var key = 'express_jackdizhu';

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.msg = '';
  if(req.session.user){
      res.render('index', { title: '首页',msg: req.session.msg,username: req.session.user.name});
  }else{
      res.render('login', { title: 'login',msg: req.session.msg,username: ''});
  }
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  req.session.msg = '';
  var User = global.dbHandel.getModel('user');
  res.render('login', { title: 'login',msg: req.session.msg,username: ''});
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  req.session.msg = '';
  var User = global.dbHandel.getModel('user');
  res.render('register', { title: 'register',msg: req.session.msg,username: ''});
});
/* GET register page. */
router.post('/register', function(req, res, next) {
  req.session.msg = '';
  var User = global.dbHandel.getModel('user');

  // ?t=00 get参数
  var _query = req.query;
  // name=name,pwd=123 post参数
  var _body = req.body;

  var uname = req.body.username;
  var upwd = req.body.pwd;
  var upwd2 = req.body.pwd2;

  if(upwd != upwd2){
    req.session.msg = '注册失败 04';
    res.render('register', { title: '注册',msg: req.session.msg,username: uname});
  }

  decipher = crypto.createHash('md5',key);
  upwd = decipher.update(upwd).digest('hex');

  User.findOne({name: uname},function(err,doc){
      if(err){
          req.session.msg = '注册失败 01';
          res.render('register', { title: '注册',msg: req.session.msg,username: uname});
      }else if(doc){
          req.session.msg = '用户名已存在 02';
          res.render('register', { title: '注册',msg: req.session.msg,username: ''});
      }else{
          User.create(
              {
                  name: uname,
                  password: upwd
              },
              function(err,doc){
                  if (err) {
                      req.session.msg = '注册失败 03';
                      res.render('register', { title: '注册',msg: req.session.msg,username: uname});
                      console.log(err);
                  } else {
                      req.session.msg = '注册成功!';
                      res.render('login', { title: '登录',msg: req.session.msg,username: uname});
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
  req.session.msg = '';
  var User = global.dbHandel.getModel('user');

  // ?t=00 get参数
  var _query = req.query;
  // name=name,pwd=123 post参数
  var _body = req.body;

  var uname = req.body.username;
  var upwd = req.body.pwd;

  decipher = crypto.createHash('md5',key);
  upwd = decipher.update(upwd).digest('hex');

  User.findOne({name: uname,password: upwd},function(err,doc){
      if(err){
          req.session.msg = '登录失败 01';
          res.render('login', { title: '登录',msg: req.session.msg,username: uname});
      }else if(doc){
          req.session.user = doc;
          req.session.msg = '登录成功!';
          res.render('index', { title: '首页',msg: req.session.msg,username: uname});
          // res.render('login', { title: '登录成功 02' });
      }else{
          req.session.msg = '登录失败 03';
          res.render('login', { title: '登录',msg: req.session.msg,username: uname});
      }
  });

});

module.exports = router;
