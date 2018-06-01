let numeric = require('./types/numeric')
let utils = require('./types/utils')

// copy numeric to root namespace
Object.keys(numeric).forEach(function (key) {
  module.exports['::' + key] = numeric[key]
})

// copy utils to root namespace
Object.keys(utils).forEach(function (key) {
  module.exports['::' + key] = utils[key]
})
