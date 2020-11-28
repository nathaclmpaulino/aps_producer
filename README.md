# aps_producer

Um produtor escrito em Javascript que publica seus dados em uma fila de um broker RabbitMQ.

Este produtor utiliza dados processados no arquivo em src/data/dataset.js para criar uma estrutura envio de 20 pontos para uma queue no broker RabbitMQ utilizando um client do RabbitMQ.

## Env variables

RABBITMQ_HOST=
RABBITMQ_PORT=
RABBITMQ_PROTOCOL=
RABBITMQ_USERNAME=
RABBITMQ_PASSWORD=
RABBITMQ_QUEUE=
FREQUENCY=
MAX_POINTS_IN_ONE_MESSAGE=
PORT=