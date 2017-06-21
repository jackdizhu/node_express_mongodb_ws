

    var log = require('./com/log.js'),
    token = require('./com/token.js'),
    cookie = require('cookie'),
    _WebSocket = require('ws');

    var _clients = {};

    var W = new _WebSocket.Server({
            port: 8000,
            // 验证 token
            verifyClient: function (e) {
                var WSkey = e.req.headers['sec-websocket-key'];
                var _cookie = cookie.parse(e.req.headers['cookie']);
                if(token.checkToken(_cookie.token)){
                    var _token = token.decodeToken(_cookie.token);
                    var name = _token.payload.data.username;
                    // 记录用户名 对应 sec-websocket-key
                    _clients[name] = {};
                    _clients[name].WSkey = WSkey;
                    _clients[name].user = {
                        username: name
                    };

                    // _clients.client = e.req.client;
                    // client 绑定 用户名
                    e.req.client.username = name;

                    // log({
                    //     err: e.req.client
                    // });
                    return true;
                }else{
                    return false;
                }

            }
        });

    W.sendMsg = function (data,_data) {
        W.clients.forEach(function (client,_w) {
            // 发给 单个用户
            if(_data.data.to){
                var to = _clients[_data.data.to];
                // client._socket == e.req.client [ verifyClient 方法中的]
                var _username = client._socket.username;
                // log({
                //     err: client._socket
                // });
                // 找到对应用户发送消息
                if(to == _username){
                    client.send(data);
                    return false;
                }
            }else{
                client.send(data);
            }
        });
    };
    // 获取用户列表
    var getUsers = function (user){
        var users = [];
        for (var key in _clients) {
            if(key != user){
                users.push(_clients[key].user);
            }
        }
        return users;
    }
    // 客服端连接事件
    W.on('connection', function (client,req) {
        // 连接时返回数据
        var _data = {
            system: true,
            users: getUsers(client._socket.username)
        };
        // 发送系统消息
        client.send(JSON.stringify(_data));
        // 收到消息
        client.on('message', function (data) {
            var WSkey = req.headers['sec-websocket-key'];
            var _cookie = cookie.parse(req.headers['cookie']);

            var _token = token.decodeToken(_cookie.token);
            // 解析用户名
            var name = _token.payload.data.username;

            var _D = JSON.parse(data);
            var _data = {
                clientsL: W.clients.length,
                data: {
                    form: name,
                    to: _D.data.to,
                    txt: _D.data.txt,
                    pull: 'left'
                }
            };
            var str = JSON.stringify(_data);
            W.sendMsg(str,_data);
        });
    });



