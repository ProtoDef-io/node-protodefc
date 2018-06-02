const Module = require('module')

const { compile } = require('../dist/protodefc_glue')

class ProtoDef {
  constructor() {
    this.types = { }
    this.protocol = { }

    this.addType = this.addType.bind(this)
  }

  addProtocol (data) {
    const types = { ...require('./types'), ...this.types }
    const compiled = compile(data) + 'exports'
    this.protocol = eval(compiled)
  }

  addType (name, definition) {
    this.types[name] = definition
  }

  read (buffer, cursor, type) {
    const {value, size} = this.protocol[type].deserialize(buffer, cursor)
    return {value, size}
  }

  write (value, buffer, offset, type) {
    return this.protocol[type].serialize(value, buffer, offset)
  }

  sizeOf (value, type) {
    return this.protocol[type].sizeOf(value)
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
