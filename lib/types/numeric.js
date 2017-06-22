const PartialReadError = require('../error').PartialReadError;

module.exports={
  "i8": {
    size_of: function(input) { return 1; },
    serialize: function(input, buffer, offset) {
      buffer.writeInt8(input, offset);
      return offset+1;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readInt8(offset), offset+1];
    },
  },
  "u8": {
    size_of: function(input) { return 1; },
    serialize: function(input, buffer, offset) {
      buffer.writeInt8(input, offset);
      return offset+1;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readInt8(offset), offset+1];
    },
  },
  "i16": {
    size_of: function(input) { return 2; },
    serialize: function(input, buffer, offset) {
      buffer.writeInt16BE(input, offset);
      return offset+2;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readInt16BE(offset), offset+2];
    },
  },
  "u16": {
    size_of: function(input) { return 2; },
    serialize: function(input, buffer, offset) {
      buffer.writeUInt16BE(input, offset);
      return offset+2;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readUInt16BE(offset), offset+2];
    },
  },
  "i32": {
    size_of: function(input) { return 4; },
    serialize: function(input, buffer, offset) {
      buffer.writeInt32BE(input, offset);
      return offset+4;
    },
    deserialize: function(buffer, offset) {
      if(offset + 4 > buffer.length)
        throw new PartialReadError();
      return [buffer.readInt32BE(offset), offset+4];
    },
  },
  "u32": {
    size_of: function(input) { return 4; },
    serialize: function(input, buffer, offset) {
      buffer.writeUInt32BE(input, offset);
      return offset+4;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readUInt32BE(offset), offset+4];
    },
  },
  "f32": {
    size_of: function(input) { return 4; },
    serialize: function(input, buffer, offset) {
      buffer.writeFloatBE(input, offset);
      return offset+4;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readFloatBE(offset), offset+4];
    },
  },
  "f64": {
    size_of: function(input) { return 8; },
    serialize: function(input, buffer, offset) {
      buffer.writeDoubleBE(input, offset);
      return offset+8;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readDoubleBE(offset), offset+8];
    },
  },
  "i64": {
    size_of: function(input) { return 8; },
    serialize: function(input, buffer, offset) {
      buffer.writeInt32BE(input[0], offset+4);
      buffer.writeInt32BE(input[1], offset);
      return offset+8;
    },
    deserialize: function(buffer, offset) {
      return [[buffer.readInt32BE(offset), buffer.readInt32BE(offset + 4)], offset+8];
    },
  },
  "u64": {
    size_of: function(input) { return 8; },
    serialize: function(input, buffer, offset) {
      buffer.writeUInt32BE(input[0], offset);
      buffer.writeUInt32BE(input[1], offset + 4);
      return offset+8;
    },
    deserialize: function(buffer, offset) {
      return [[buffer.readUInt32BE(offset), buffer.readUInt32BE(offset + 4)], offset+8];
    },
  },
  "li16": {
    size_of: function(input) { return 2; },
    serialize: function(input, buffer, offset) {
      buffer.writeInt16LE(input, offset);
      return offset+2;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readInt16LE(offset), offset+2];
    },
  },
  "lu16": {
    size_of: function(input) { return 2; },
    serialize: function(input, buffer, offset) {
      buffer.writeUInt16LE(input, offset);
      return offset+2;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readUInt16LE(offset), offset+2];
    },
  },
  "li32": {
    size_of: function(input) { return 4; },
    serialize: function(input, buffer, offset) {
      buffer.writeInt32LE(input, offset);
      return offset+4;
    },
    deserialize: function(buffer, offset) {
      if(offset + 4 > buffer.length)
        throw new PartialReadError();
      return [buffer.readInt32LE(offset), offset+4];
    },
  },
  "lu32": {
    size_of: function(input) { return 4; },
    serialize: function(input, buffer, offset) {
      buffer.writeUInt32LE(input, offset);
      return offset+4;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readUInt32LE(offset), offset+4];
    },
  },
  "lf32": {
    size_of: function(input) { return 4; },
    serialize: function(input, buffer, offset) {
      buffer.writeFloatLE(input, offset);
      return offset+4;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readFloatLE(offset), offset+4];
    },
  },
  "lf64": {
    size_of: function(input) { return 8; },
    serialize: function(input, buffer, offset) {
      buffer.writeDoubleLE(input, offset);
      return offset+8;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readDoubleLE(offset), offset+8];
    },
  },
  "li64": {
    size_of: function(input) { return 8; },
    serialize: function(input, buffer, offset) {
      buffer.writeInt32LE(input[0], offset+4);
      buffer.writeInt32LE(input[1], offset);
      return offset+8;
    },
    deserialize: function(buffer, offset) {
      return [[buffer.readInt32LE(offset), buffer.readInt32LE(offset + 4)], offset+8];
    },
  },
  "lu64": {
    size_of: function(input) { return 8; },
    serialize: function(input, buffer, offset) {
      buffer.writeUInt32LE(input[0], offset);
      buffer.writeUInt32LE(input[1], offset + 4);
      return offset+8;
    },
    deserialize: function(buffer, offset) {
      return [[buffer.readUInt32LE(offset), buffer.readUInt32LE(offset + 4)], offset+8];
    },
  }
};