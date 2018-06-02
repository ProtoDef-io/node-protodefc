// - pstring
// - buffer
// - cstring

const assert = require('assert')

const { PartialReadError } = require('../error')

module.exports = {
  '::varint': {
    sizeOf: function (value) {
      let cursor = 0
      while (value & ~0x7F) {
        value >>>= 7
        cursor++
      }
      return cursor + 1
    },
    serialize: function (input, buffer, offset) {
      let cursor = 0
      while (input & ~0x7F) {
        buffer.writeUInt8((input & 0xFF) | 0x80, offset + cursor)
        cursor++
        input >>>= 7
      }
      buffer.writeUInt8(input, offset + cursor)
      return offset + cursor + 1
    },
    deserialize: function (buffer, offset, size) {
      let result = 0
      let shift = 0
      let cursor = offset

      while (true) {
        if (cursor + 1 > buffer.length) { throw new PartialReadError() }
        const b = buffer.readUInt8(cursor)
        result |= ((b & 0x7f) << shift) // Add the bits to our number, except MSB
        cursor++
        if (!(b & 0x80)) { // If the MSB is not set, we return the number
          return { value: result, size: cursor - offset }
        }
        shift += 7 // we only have 7 bits, MSB being the return-trigger
        assert.ok(shift < 64, 'varint is too big') // Make sure our shift don't overflow.
      }
    }
  },
  '::bool': {
    sizeOf: function (input) { return 1 },
    serialize: function (input, buffer, offset) {
      buffer.writeInt8(+input, offset)
      return offset + 1
    },
    deserialize: function (buffer, offset, size) {
      if (offset + 1 > buffer.length) throw new PartialReadError()
      const value = buffer.readInt8(offset)
      return { value: !!value, size: offset + 1 }
    }
  },
  '::sized_string': {
    sizeOf: function (input) { return Buffer.byteLength(input, 'utf8') },
    serialize: function (input, buffer, offset) {
      return offset + buffer.write(input, offset)
    },
    deserialize: function (buffer, offset, size) {
      return { value: buffer.toString('utf8', offset, offset + size), size: offset + size }
    }
  },
  '::void': {
    sizeOf: function (input) { return 0 },
    serialize: function (input, buffer, offset) { return offset },
    deserialize: function (buffer, offset) { return { value: null, size: offset } }
  },
  '::unit': {
    sizeOf: function (input) { return 0 },
    serialize: function (input, buffer, offset) { return offset },
    deserialize: function (buffer, offset) { return { value: null, size: offset } }
  }
}
