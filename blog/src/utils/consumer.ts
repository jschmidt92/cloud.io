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
                case 'CREATEBLOG':
                  console.log('Consuming CREATEBLOG action', parsed.data)
                  break
                case 'FETCHBLOGS':
                  console.log('Consuming FETCHBLOGS action', parsed.data)
                  break
                case 'FETCHBLOG':
                  console.log('Consuming FETCHBLOG action', parsed.data)
                  break
                case 'UPDATEBLOG':
                  console.log('Consuming UPDATEBLOG action', parsed.data)
                  break
                case 'DELETEBLOG':
                  console.log('Consuming DELETEBLOG action', parsed.data)
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
