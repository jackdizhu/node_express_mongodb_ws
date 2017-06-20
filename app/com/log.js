
var logger = require('./logger.js');
var getBrowserInfo = require('./getBrowserInfo.js');

var log = function (Obj) {
    var req = Obj.req || null;
    var _log = {};
    if(req){
      _log.ip = getBrowserInfo(req);
    }
    _log.err = Obj.err;
    _log.debug = Obj.debug;

    logger.debug(_log);
}

module.exports = log;
