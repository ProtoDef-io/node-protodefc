const { PartialReadError } = require('../error')

module.exports = {
  '::i8': {
    sizeOf: function (input) { return 1 },
    serialize: function (input, buffer, offset) {
      buffer.writeInt8(input, offset)
      return offset + 1
    },
    deserialize: function (buffer, offset) {
      return { value: buffer.readInt8(offset), size: offset + 1 }
    }
  },
  '::u8': {
    sizeOf: function (input) { return 1 },
    serialize: function (input, buffer, offset) {
      buffer.writeInt8(input, offset)
      return offset + 1
    },
    deserialize: function (buffer, offset) {
      return { value: buffer.readInt8(offset), size: offset + 1 }
    }
  },
  '::i16': {
    sizeOf: function (input) { return 2 },
    serialize: function (input, buffer, offset) {
      buffer.writeInt16BE(input, offset)
      return offset + 2
    },
    deserialize: function (buffer, offset) {
      return { value: buffer.readInt16BE(offset), size: offset + 2 }
    }
  },
  '::u16': {
    sizeOf: function (input) { return 2 },
    serialize: function (input, buffer, offset) {
      buffer.writeUInt16BE(input, offset)
      return offset + 2
    },
    deserialize: function (buffer, offset) {
      return { value: buffer.readUInt16BE(offset), size: offset + 2 }
    }
  },
  '::i32': {
    sizeOf: function (input) { return 4 },
    serialize: function (input, buffer, offset) {
      buffer.writeInt32BE(input, offset)
      return offset + 4
    },
    deserialize: function (buffer, offset) {
      if (offset + 4 > buffer.length) { throw new PartialReadError() }
      return { value: buffer.readInt32BE(offset), size: offset + 4 }
    }
  },
  '::u32': {
    sizeOf: function (input) { return 4 },
    serialize: function (input, buffer, offset) {
      buffer.writeUInt32BE(input, offset)
      return offset + 4
    },
    deserialize: function (buffer, offset) {
      return { value: buffer.readUInt32BE(offset), size: offset + 4 }
    }
  },
  '::f32': {
    sizeOf: function (input) { return 4 },
    serialize: function (input, buffer, offset) {
      buffer.writeFloatBE(input, offset)
      return offset + 4
    },
    deserialize: function (buffer, offset) {
      return { value: buffer.readFloatBE(offset), size: offset + 4 }
    }
  },
  '::f64': {
    sizeOf: function (input) { return 8 },
    serialize: function (input, buffer, offset) {
      buffer.writeDoubleBE(input, offset)
      return offset + 8
    },
    deserialize: function (buffer, offset) {
      return { value: buffer.readDoubleBE(offset), size: offset + 8 }
    }
  },
  '::i64': {
    sizeOf: function (input) { return 8 },
    serialize: function (input, buffer, offset) {
      buffer.writeInt32BE(input[0], offset + 4)
      buffer.writeInt32BE(input[1], offset)
      return offset + 8
    },
    deserialize: function (buffer, offset) {
      return { value: [buffer.readInt32BE(offset), buffer.readInt32BE(offset + 4)], size: offset + 8 }
    }
  },
  '::u64': {
    sizeOf: function (input) { return 8 },
    serialize: function (input, buffer, offset) {
      buffer.writeUInt32BE(input[0], offset)
      buffer.writeUInt32BE(input[1], offset + 4)
      return offset + 8
    },
    deserialize: function (buffer, offset) {
      return { value: [buffer.readUInt32BE(offset), buffer.readUInt32BE(offset + 4)], size: offset + 8 }
    }
  },
  '::li16': {
    sizeOf: function (input) { return 2 },
    serialize: function (input, buffer, offset) {
      buffer.writeInt16LE(input, offset)
      return offset + 2
    },
    deserialize: function (buffer, offset) {
      return { value: buffer.readInt16LE(offset), size: offset + 2 }
    }
  },
  '::lu16': {
    sizeOf: function (input) { return 2 },
    serialize: function (input, buffer, offset) {
      buffer.writeUInt16LE(input, offset)
      return offset + 2
    },
    deserialize: function (buffer, offset) {
      return [buffer.readUInt16LE(offset), offset + 2]
    }
  },
  '::li32': {
    sizeOf: function (input) { return 4 },
    serialize: function (input, buffer, offset) {
      buffer.writeInt32LE(input, offset)
      return offset + 4
    },
    deserialize: function (buffer, offset) {
      if (offset + 4 > buffer.length) { throw new PartialReadError() }
      return { value: buffer.readInt32LE(offset), size: offset + 4 }
    }
  },
  '::lu32': {
    sizeOf: function (input) { return 4 },
    serialize: function (input, buffer, offset) {
      buffer.writeUInt32LE(input, offset)
      return offset + 4
    },
    deserialize: function (buffer, offset) {
      return { value: buffer.readUInt32LE(offset), size: offset + 4 }
    }
  },
  '::lf32': {
    sizeOf: function (input) { return 4 },
    serialize: function (input, buffer, offset) {
      buffer.writeFloatLE(input, offset)
      return offset + 4
    },
    deserialize: function (buffer, offset) {
      return { value: buffer.readFloatLE(offset), size: offset + 4 }
    }
  },
  '::lf64': {
    sizeOf: function (input) { return 8 },
    serialize: function (input, buffer, offset) {
      buffer.writeDoubleLE(input, offset)
      return offset + 8
    },
    deserialize: function (buffer, offset) {
      return { value: buffer.readDoubleLE(offset), size: offset + 8 }
    }
  },
  '::li64': {
    sizeOf: function (input) { return 8 },
    serialize: function (input, buffer, offset) {
      buffer.writeInt32LE(input[0], offset + 4)
      buffer.writeInt32LE(input[1], offset)
      return offset + 8
    },
    deserialize: function (buffer, offset) {
      return { value: [buffer.readInt32LE(offset), buffer.readInt32LE(offset + 4)], size: offset + 8 }
    }
  },
  '::lu64': {
    sizeOf: function (input) { return 8 },
    serialize: function (input, buffer, offset) {
      buffer.writeUInt32LE(input[0], offset)
      buffer.writeUInt32LE(input[1], offset + 4)
      return offset + 8
    },
    deserialize: function (buffer, offset) {
      return { value: [buffer.readUInt32LE(offset), buffer.readUInt32LE(offset + 4)], size: offset + 8 }
    }
  }
}
