
var log4js = require('log4js');

log4js.configure({
      appenders:[
        // {type:'console'}, 配置 不打印控制台
        {type:'dateFile', filename: 'log/log.js', category: 'app'}
      ],
      replaceConsole: true,
    });
    var log = log4js.getLogger('app');

module.exports = log;

