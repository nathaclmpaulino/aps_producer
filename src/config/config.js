module.exports = {
  rabbitmq: {
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
    queue: process.env.RABBITMQ_QUEUE
  },
  port: process.env.PORT
}