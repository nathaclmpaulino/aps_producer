module.exports = {
  rabbitmq: {
    username: process.env.RABBITMQ_USERNAME || 'guest',
    password: process.env.RABBITMQ_PASSWORD || 'guest',
    queue: process.env.RABBITMQ_QUEUE || 'general_queue',
    host: process.env.RABBITMQ_HOST || 'localhost',
    port: process.env.RABBITMQ_PORT || 5672,
    protocol: process.env.RABBITMQ_PROTOCOL  || 'amqp'
  },
  port: process.env.PORT || 3000,
  frequency: process.env.FREQUENCY || 30000,
  maxPoints: process.env.MAX_POINTS_IN_ONE_MESSAGE || 20
}