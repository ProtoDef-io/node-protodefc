class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor.name)
  }
}

class PartialReadError extends ExtendableError {
  constructor(message) {
    super(message);
    this.partialReadError=true;
  }
}

module.exports={
  "::i8": {
    size_of: function(input) { return 1; },
    serialize: function(input, buffer, offset) {
      buffer.writeInt8(input, offset);
      return offset+1;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readInt8(offset), offset+1];
    },
  },
    "::u8": {
    size_of: function(input) { return 1; },
    serialize: function(input, buffer, offset) {
      buffer.writeInt8(input, offset);
      return offset+1;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readInt8(offset), offset+1];
    },
  },
    "::i16": {
    size_of: function(input) { return 2; },
    serialize: function(input, buffer, offset) {
      buffer.writeInt16BE(input, offset);
      return offset+2;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readInt16BE(offset), offset+2];
    },
  },
    "::u16": {
    size_of: function(input) { return 2; },
    serialize: function(input, buffer, offset) {
      buffer.writeUInt16BE(input, offset);
      return offset+2;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readUInt16BE(offset), offset+2];
    },
  },
    "::i32": {
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
    "::u32": {
    size_of: function(input) { return 4; },
    serialize: function(input, buffer, offset) {
      buffer.writeUInt32BE(input, offset);
      return offset+4;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readUInt32BE(offset), offset+4];
    },
  },
    "::i64": {
    size_of: function(input) { return 8; },
    serialize: function(input, buffer, offset) {
      buffer.writeInt64BE(input, offset);
      return offset+8;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readInt64BE(offset), offset+8];
    },
  },
    "::u64": {
    size_of: function(input) { return 8; },
    serialize: function(input, buffer, offset) {
      buffer.writeUInt64BE(input, offset);
      return offset+8;
    },
    deserialize: function(buffer, offset) {
      return [buffer.readUInt64BE(offset), offset+8];
    },
  },
    "::varint": {
    size_of: function(value) {
      let cursor = 0;
      while(value & ~0x7F) {
        value >>>= 7;
        cursor++;
      }
      return cursor + 1;
    },
  },
    "::sized_string": {
    size_of: function(input) { return Buffer.byteLength(input, 'utf8'); },
    serialize: function(input, buffer, offset) {
      return offset + buffer.write(input, offset);
    },
    deserialize: function(buffer, offset, size) {
      return [buffer.toString('utf8', offset, offset+size), offset+size];
    },
  },
    "::unit": {
    size_of: function(input) { return 0; },
    serialize: function(input, buffer, offset) { return offset; },
    deserialize: function(buffer, offset) { return [null, offset] },
  },
};