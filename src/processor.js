const moment         = require('moment')
const config         = require('./config/config')
const data           = require('./data/dataset.json')

const RabbitMQClient = require('node-rabbitmq-client') 

const rabbitMQConfig = {
  host: config.rabbitmq.host,
  port: config.rabbitmq.port,
  username: config.rabbitmq.username,
  password: config.rabbitmq.password,
  protocol: config.rabbitmq.protocol,
  defaultQueueFeatures: { durable: true },
}

const rabbitMQClient = new RabbitMQClient(rabbitMQConfig)

var step = function () {
  try {
    
    const timestamp = moment()
    const arrPoints    = []
    const dataFormat = timestamp.format('DDMMYYYY')

    var point = {
      timestamp: '',
      day: '',
      light: '',
      temperature: '',
      humidity: '',
      motion: ''
    }
    
    for (let i = 0; i < config.maxPoints; i++) {
      positionOverObj     = Math.random() * data.length()

      point.timestamp     = timestamp.unix()
      point.day           = dataFormat
      point.light         = data[positionOverObj].light 
      point.temperature   = data[positionOverObj].temp
      point.humidity      = data[positionOverObj].humidity
      point.motion        = data[positionOverObj].motion

      arrPoints.push(point)
    }

    try {
      rabbitMQClient.publish({ queue: { name: config.rabbitmq.queue }}, JSON.stringify(arrPoints))
    } catch (error) {
      console.log('Unable to publish into RabbitMQ Queue')
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = setInterval(step, config.frequency)