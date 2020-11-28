module.exports = {
  rabbitmq: {
    username: process.env.RABBITMQ_USERNAME || 'guest',
    password: process.env.RABBITMQ_PASSWORD || 'guest',
    queue: process.env.RABBITMQ_QUEUE || 'general_queue',
    host: process.env.PUBSUB_RABBITMQ_SERVICE_HOST || 'localhost',
    port: process.env.PUBSUB_RABBITMQ_SERVICE_PORT_AMQP || 5672
  },
  port: process.env.PORT || 3000,
  frequency: process.env.FREQUENCY || 30000,
  maxPoints: process.env.MAX_POINTS_IN_ONE_MESSAGE || 20
}