const config         = require('../config/config')
const amqp           = require('amqplib')

class RabbitMQHelper {
  constructor () {
    this.conn     = null
    this.channels = null
  }
  
  async connect () {
    const brokerUrl = `${config.rabbitmq.protocol}://${config.rabbitmq.username}:${config.rabbitmq.password}@${config.rabbitmq.host}:${config.rabbitmq.port}`
    try {
      console.log('Connection at: ', brokerUrl)
      this.conn = await amqp.connect(brokerUrl)
      this.channels = {}
    } catch (error) {
      console.log('Unable to connect over RabbitMQ broker')
      console.log(error)
    }
    console.log('Connection Established!')
  }

  async disconnect () {
    await this.conn.close()
    this.conn = null
    this.channels = {}
    console.log('Socket closed')
  }

  /**
   * @param {String} queueName
   * @param {String} type 
   */
  
  async createQueue (queueName) {
    const channel = await this.conn.createChannel()
    await channel.assertQueue(queueName)
    this.channels[queueName] = channel
  }

  /**
   * @param {String} queueName
   */
  getChannel (queueName) {
    return this.channels[queueName]
  }

  queueExists (queueName) {
    return queueName in this.channels
  }

  /**
   * @param {String} queueName
   * @param {Buffer} message 
  */
  
  async publish (queueName, message) {
    if (!this.queueExists(queueName)) {
      throw new Error ('Queue not created')
    }
    await this.channels[queueName].sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
  }


  async consumer(queueName, callback) {
    if (!this.queueExists(queueName)) {
      throw new Error ('Queue not created')
    }
    await this.channels[queueName].assertQueue(queueName, {durable: true})
    await this.channels[queueName].bindQueue(queueName, queueName, '')
    await this.channels[queueName].consume(queueName, callback, {noAck: false})
  }

  ackMessage (queueName, message) {
    if (!this.queueExists(queueName)) {
      throw new Error ('Queue not created')
    }
    this.channels[queueName].ack(message)
  }
}

module.exports = new RabbitMQHelper()