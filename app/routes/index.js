var
express = require('express'),
router = express.Router(),
crypto = require('crypto'),
log = require('../com/log.js');

// 返回模板 对象数据
var _render = {};

// Md5 key
var key = 'express_jackdizhu';

/* GET home page. */
router.get('/', function(req, res, next) {
  // 打印错误
  log({
    req: req
  });
  if(req.session.user){
      _render = {
          title: '首页',
          msg: '首页',
          username: req.session.user.name
      };
      res.render('index', _render);
  }else{
      _render = {
          title: 'login',
          msg: '',
          username: ''
      };
      res.render('login', _render);
  }
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  _render = {
      title: 'login',
      msg: '',
      username: ''
  };
  res.render('login', _render);
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  _render = {
      title: 'register',
      msg: '',
      username: ''
  };
  res.render('register', _render);
});
/* POST register page. */
router.post('/register', function(req, res, next) {
  var User = global.dbHandel.getModel('user');

  // ?t=00 get参数
  var _query = req.query;
  // name=name,pwd=123 post参数
  var _body = req.body;

  var uname = req.body.username;
  var upwd = req.body.pwd;
  var upwd2 = req.body.pwd2;

  if(upwd != upwd2){
    _render = {
        title: '注册',
        msg: '注册失败 04',
        username: uname
    };
    res.render('register', _render);
  }

  decipher = crypto.createHash('md5',key);
  upwd = decipher.update(upwd).digest('hex');

  User.findOne({name: uname},function(err,doc){
      if(err){
          _render = {
              title: '注册',
              msg: '注册失败 01',
              username: uname
          };
          // 打印错误
          log({
            req: req,err: err
          });
          res.render('register', _render);
      }else if(doc){
          _render = {
              title: '注册',
              msg: '用户名已存在 02',
              username: ''
          };
          res.render('register', _render);
      }else{
          User.create(
              {
                  name: uname,
                  password: upwd
              },
              function(err,doc){
                  if (err) {
                      _render = {
                          title: '注册',
                          msg: '注册失败 03',
                          username: uname
                      };
                      res.render('register', _render);
                      // 打印错误
                      log({
                        req: req,err: err
                      });
                  } else {
                      _render = {
                          title: '登录',
                          msg: '注册成功!',
                          username: uname
                      };
                      res.render('login', _render);
                  }
              }
          );
      }
  });

});
/* POST login page. */
router.post('/login', function(req, res, next) {
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
          _render = {
              title: '登录',
              msg: '登录失败 01',
              username: uname
          };
          // 打印错误
          log({
            req: req,err: err
          });
          res.render('login', _render);
      }else if(doc){
          req.session.user = doc;
          _render = {
              title: '首页',
              msg: '登录成功!',
              username: uname
          };
          req.session.msg = '登录成功!';
          res.render('index', _render);
      }else{
          _render = {
              title: '登录',
              msg: '登录失败 03',
              username: uname
          };
          req.session.msg = '登录失败 03';
          res.render('login', _render);
      }
  });

});

module.exports = router;
