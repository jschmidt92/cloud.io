import amqp, { Message } from 'amqplib/callback_api'

const createMQConsumer = (amqpURl: string, queueName: string) => {
  console.log('Connecting to RabbitMQ...')
  return () => {
    amqp.connect(amqpURl, (errConn, conn) => {
      if (errConn) {
        throw errConn
      }

      conn.createChannel((errChan, chan) => {
        if (errChan) {
          throw errChan
        }

        console.log('Connected to RabbitMQ')
        chan.assertQueue(queueName, { durable: true })
        chan.consume(
          queueName,
          (msg: Message | null) => {
            if (msg) {
              const parsed = JSON.parse(msg.content.toString())
              switch (parsed.action) {
                case 'CREATERSS':
                  console.log('Consuming CREATERSS action', parsed.data)
                  break
                case 'FETCHRSS':
                  console.log('Consuming FETCHRSS action', parsed.data)
                  break
                case 'FETCHRSS':
                  console.log('Consuming FETCHRSS action', parsed.data)
                  break
                case 'UPDATERSS':
                  console.log('Consuming UPDATERSS action', parsed.data)
                  break
                case 'DELETERSS':
                  console.log('Consuming DELETERSS action', parsed.data)
                  break
                default:
                  break
              }
            }
          },
          { noAck: true }
        )
      })
    })
  }
}

export default createMQConsumer
