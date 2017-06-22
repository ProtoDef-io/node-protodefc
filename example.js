const ProtoDef = require("protodefc").ProtoDef;
const Serializer = require("protodefc").Serializer;
const Parser = require("protodefc").Parser;
const fs=require('fs');


const protocol = fs.readFileSync('simple_protocol.pds','utf8');


const proto = new ProtoDef();
proto.addProtocol(protocol);
const parser = new Parser(proto, "position");
const serializer = new Serializer(proto, "position");

serializer.write({
  "x":1,
  "y":2,
  "z":3
});

parser.on('error',function(err){
  console.log(err.stack);
  console.log(err.buffer);
});

serializer.pipe(parser);

parser.on('data', function (chunk) {
  console.log(JSON.stringify(chunk.data, null, 2));
});