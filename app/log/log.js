[2017-06-23 10:33:06.875] [DEBUG] app - { err: 'checkToken name: true', debug: undefined }
[2017-06-23 10:33:32.557] [DEBUG] app - { err: 'mongoDB连接成功!', debug: undefined }
[2017-06-23 10:33:44.945] [DEBUG] app - { err: 'client close', debug: undefined }
[2017-06-23 10:33:49.853] [DEBUG] app - { ip: 
   { ipAddress: '::ffff:127.0.0.1',
     userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
     referer: 'http://127.0.0.1:3000/login' },
  err: 
   { MongoError: not authorized on nodedb to execute command { find: "users", filter: { password: "698d51a19d8a121ce581499d7b701668", name: "name03" }, projection: {}, limit: 1, singleBatch: true, batchSize: 1 }
       at Function.MongoError.create (E:\WWW\webpack\express_demo\app\node_modules\mongodb-core\lib\error.js:31:11)
       at queryCallback (E:\WWW\webpack\express_demo\app\node_modules\mongodb-core\lib\cursor.js:212:36)
       at E:\WWW\webpack\express_demo\app\node_modules\mongodb-core\lib\connection\pool.js:469:18
       at _combinedTickCallback (internal/process/next_tick.js:95:7)
       at process._tickCallback (internal/process/next_tick.js:161:9)
     name: 'MongoError',
     message: 'not authorized on nodedb to execute command { find: "users", filter: { password: "698d51a19d8a121ce581499d7b701668", name: "name03" }, projection: {}, limit: 1, singleBatch: true, batchSize: 1 }',
     ok: 0,
     errmsg: 'not authorized on nodedb to execute command { find: "users", filter: { password: "698d51a19d8a121ce581499d7b701668", name: "name03" }, projection: {}, limit: 1, singleBatch: true, batchSize: 1 }',
     code: 13,
     codeName: 'Unauthorized' },
  debug: undefined }
[2017-06-23 10:51:34.990] [DEBUG] app - { err: 'mongoDB连接成功!', debug: undefined }
