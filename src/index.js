class Producer {
  constructor () {
    require('./processor.js')
  }
}

module.exports = new Producer()