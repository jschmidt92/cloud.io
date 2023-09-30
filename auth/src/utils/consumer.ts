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
                case 'CREATEUSER':
                  console.log('Consuming CREATEUSER action', parsed.data)
                  break
                case 'FETCHUSERS':
                  console.log('Consuming FETCHUSERS action', parsed.data)
                  break
                case 'FETCHUSER':
                  console.log('Consuming FETCHUSER action', parsed.data)
                  break
                case 'UPDATEUSER':
                  console.log('Consuming UPDATEUSER action', parsed.data)
                  break
                case 'DELETEUSER':
                  console.log('Consuming DELETEUSER action', parsed.data)
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
