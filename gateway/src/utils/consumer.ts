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
                case 'CREATECHARACTER':
                  console.log('Consuming CREATECHARACTER action', parsed.data)
                  break
                case 'FETCHCHARACTERS':
                  console.log('Consuming FETCHCHARACTERS action', parsed.data)
                  break
                case 'FETCHCHARACTER':
                  console.log('Consuming FETCHCHARACTER action', parsed.data)
                  break
                case 'UPDATECHARACTER':
                  console.log('Consuming UPDATECHARACTER action', parsed.data)
                  break
                case 'DELETECHARACTER':
                  console.log('Consuming DELETECHARACTER action', parsed.data)
                  break
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
