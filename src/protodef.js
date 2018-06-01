const Module = require('module')

// const { compile } = require('./protodefc_bindgen')
// const fs = require('fs');
// console.log(compile(fs.readFileSync('./examples/simple.pds').toString()))

class ProtoDef {
  addProtocol (protocolData) {
    console.log('FIXME')
    // const types = require('./types')
    // const compiled = ProtoDefc(protocolData) + 'exports'

    // const m = new Module('', module.parent)
    // m._compile(compiled, '')

    // console.log('Exported')

    // this.protocol = m.exports
  }

  read (buffer, cursor, type) {
    const [value, size] = this.protocol[type].deserialize(buffer, cursor)
    return {value, size}
  }

  write (value, buffer, offset, type) {
    return this.protocol[type].serialize(value, buffer, offset)
  }

  sizeOf (value, type) {
    return this.protocol[type].size_of(value)
  }

  createPacketBuffer (type, packet) {
    const length = this.sizeOf(packet, type)
    const buffer = Buffer.alloc(length)
    this.write(packet, buffer, 0, type)
    return buffer
  }

  parsePacketBuffer (type, buffer) {
    const {value, size} = this.read(buffer, 0, type)
    return {
      data: value,
      metadata: {
        size: size
      },
      buffer: buffer.slice(0, size)
    }
  }
}

module.exports = ProtoDef
