const { ProtoDef, Serializer, Parser } = require('../')

const protocol = `
def_native("i32");

@export "position"
def("position") => container {
    field("x") => ::i32;
    field("y") => ::i32;
    field("z") => ::i32;
};
`

describe('', () => {
  let proto, parser, serializer

  beforeAll(() => {
    proto = new ProtoDef()
    proto.addProtocol(protocol)
    parser = new Parser(proto, 'position')
    serializer = new Serializer(proto, 'position')
  })

  test('can serialize and parse', () => {
    const data = { x: 1, y: 2, z: 3 }

    serializer.write(data)

    parser.on('error', (e) => {
      throw e
    })

    serializer.pipe(parser)

    parser.on('data', (chunk) => {
      expect(chunk.data).toEqual(data)
    })
  })
})
