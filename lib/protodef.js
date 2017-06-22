var compile = require('protodefc-prebuilt');

class ProtoDef
{
  constructor() {
  }


  addProtocol(protocolData) {
    const types=require('./types');
    const compiled=compile(protocolData)+"exports";
    this.protocol=eval(compiled);
  }

  read(buffer, cursor, type) {
    const [value,size]=this.protocol[type].deserialize(buffer,cursor);
    return {value,size};
  }

  write(value, buffer, offset, type) {
    return this.protocol[type].serialize(value,buffer,offset);
  }

  sizeOf(value, type) {
    return this.protocol[type].size_of(value);
  }

  createPacketBuffer(type,packet) {
    const length=this.sizeOf(packet, type);
    const buffer = new Buffer(length);
    this.write(packet, buffer, 0, type);
    return buffer;
  }

  parsePacketBuffer(type,buffer) {
    const {value,size}=this.read(buffer, 0, type);
    return {
      data: value,
      metadata:{
        size:size
      },
      buffer:buffer.slice(0,size)
    };
  }
}

module.exports = ProtoDef;