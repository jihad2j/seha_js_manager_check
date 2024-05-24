"use strict";

var _require = require('mongodb'),
    MongoClient = _require.MongoClient,
    ServerApiVersion = _require.ServerApiVersion;

var uri = "mongodb+srv://zoolka:zzzzz11111@masarproject.daj3l2l.mongodb.net/?retryWrites=true&w=majority&appName=masarproject"; // Create a MongoClient with a MongoClientOptions object to set the Stable API version

var client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

function run() {
  return regeneratorRuntime.async(function run$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(client.db("admin").command({
            ping: 1
          }));

        case 5:
          console.log("Pinged your deployment. You successfully connected to MongoDB!");

        case 6:
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(client.close());

        case 9:
          return _context.finish(6);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0,, 6, 10]]);
}

run()["catch"](console.dir);
//# sourceMappingURL=test.dev.js.map
