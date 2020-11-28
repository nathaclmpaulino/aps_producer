const moment         = require('moment')
const config         = require('./config/config')
const data           = require('./data/dataset.json')
const rabbitMQClient = require('./utils/rabbitmq')

var step = async function() {
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
      positionOverObj     = Math.floor(Math.random() * 500)

      point.timestamp     = timestamp.unix()
      point.day           = dataFormat
      point.light         = data[positionOverObj].light 
      point.temperature   = data[positionOverObj].temp
      point.humidity      = data[positionOverObj].humidity
      point.motion        = data[positionOverObj].motion

      arrPoints.push(point)
    }
     
    console.log('Publishing points')
    try {
      await rabbitMQClient.connect()
      await rabbitMQClient.createQueue(config.rabbitmq.queue)
      await rabbitMQClient.publish(config.rabbitmq.queue, Buffer.from(JSON.stringify(arrPoints)))
    } catch (error) {
      throw new Error('Unable to publish into RabbitMQ Queue')
    }
    console.log('Published points over ' + config.rabbitmq.queue + 'queue')
  } catch (error) {
    console.error(error)
  }
  await rabbitMQClient.disconnect()
}

module.exports = setInterval(step, config.frequency)