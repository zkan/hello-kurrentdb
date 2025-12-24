import express from 'express'
import { FORWARDS, jsonEvent, KurrentDBClient, START } from '@kurrent/kurrentdb-client'

const app = express()
const port = 8080

const client = KurrentDBClient.connectionString('kurrentdb://0.0.0.0:2113?tls=false')

const visitorsStream = 'visitorsStream'

app.get('/hello-world', async (req, res) => {
  const visitor = req.query.visitor ?? 'Visitor'

  const event = jsonEvent({
    type: 'VisitorGreeted',
    data: {
      visitor,
    },
  })

  await client.appendToStream(visitorsStream, [event])

  const eventStream = client.readStream(visitorsStream, {
    fromRevision: START,
    direction: FORWARDS,
  })

  let visitorsGreeted = []
  for await (const { event } of eventStream) {
    visitorsGreeted.push(event.data.visitor)
  }

  res.send(`${visitorsGreeted.length} visitors have been greeted, they are: [${visitorsGreeted.join(',')}]`)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
