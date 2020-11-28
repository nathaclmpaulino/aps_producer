const moment         = require('moment')
const data           = require('./data/dataset.json')
const rabbitmqClient = require('node-rabbitmq-client') 

let numberPoints = 0
const freq = 30000 // A cada 30seg os pontos vão sofrer um push para o rabbitmq
const MAX_POINTS = 21

var step = function () {
  try {

    if (numberPoints > MAX_POINTS_IN_ONE_MESSAGE)
      numberPoints = 0
    
    const timestamp = moment()
    const arrPoints    = []
    const dataFormat = timestamp.format('DDMMYYYY')

    var point = {
      timestamp: '',
      temperature: '',
      humidity: '',
      luminosity: ''
    }

    for (let i = 0; i < (data || []).length; i++) {
      point.timestamp   = timestamp.unix()
      point.temperature = data[i] 
    }

    // Chamada do rabbimq --> JSON.stringfy(JSON)
  } catch (error) {
    console.error(error)
  }
}

module.exports = setInterval(step, frequency)