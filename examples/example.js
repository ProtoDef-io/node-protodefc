const { ProtoDef, Serializer, Parser } = require('../')

const fs = require('fs')
const path = require('path')

const protocol = fs.readFileSync(path.join(__dirname, 'example.pds'), 'utf8')

const proto = new ProtoDef()

proto.addProtocol(protocol)

const parser = new Parser(proto, '::example::entity_data')
const serializer = new Serializer(proto, '::example::entity_data')

serializer.write({
  entity_id: 0,
  position: {
    x: 1.0,
    y: 2.0,
    z: 3.0
  },
  entity_type: {
    tag: 'player'
  }
})

parser.on('error', (err) => {
  if (err.buffer.length > 0) { console.log(err.stack) }
})

serializer.pipe(parser)

parser.on('data', (chunk) => {
  console.log(JSON.stringify(chunk.data, null, 2))
})
