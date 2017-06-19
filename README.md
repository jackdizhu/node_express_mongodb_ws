
express_demo

express app -e

set DEBUG=app & npm start

// 启动 mongodb
mongod.exe --dbpath G:\web\mongodb\data\db

// 样式调试启动
node gulpFile_app2.js

// express 服务器调试启动
supervisor ./app/bin/www

// /register 路由
var _path = req.params;
// ?t=00 get参数
var _query = req.query;
// name=name,pwd=123 post参数
var _body = req.body;

app.use(session({
    secret: 'secret',
    cookie:{
        maxAge: 1000*60*30,
    }
}));

app.use(function(req,res,next){
    res.locals.user = req.session.user;   // 从session 获取 user对象

    var err = req.session.error;   //获取错误信息
    delete req.session.error;
    res.locals.message = "";   // 展示的信息 message
    if(err){
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
    }
    next();  //中间件传递
});

// 路由
app.use('/', index);
app.use('/users', users);
app.use('/login', index);
app.use('/register', index);

路由 放在 session 之后 解决 req.session is undefined 问题
