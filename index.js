module.exports = {
  ProtoDef: require('./src'),
  Serializer: require('./src/serializer').Serializer,
  Parser: require('./src/serializer').Parser,
  PartialReadError: require('./src/error').PartialReadError
}
