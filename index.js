module.exports = {
  ProtoDef: require('./src'),
  Serializer: require('./src/serializer').Serializer,
  Parser: require('./src/serializer').Parser,
  utils: { PartialReadError: require('./src/error').PartialReadError }
}
