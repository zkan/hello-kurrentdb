import express from 'express'
import { FORWARDS, jsonEvent, KurrentDBClient, START } from '@kurrent/kurrentdb-client'
import type { Request, Response } from 'express'

const app = express()
const port = 8080

const client = KurrentDBClient.connectionString('kurrentdb://0.0.0.0:2113?tls=false')

const visitorsStream = 'visitorsStream'

interface VisitorGreetedEvent {
  type: string
  data: {
    visitor: string
  }
}

app.get('/hello-world', async (req: Request, res: Response) => {
  const visitor =
    typeof req.query.visitor === 'string'
      ? req.query.visitor
      : 'Visitor'

  const event = jsonEvent<VisitorGreetedEvent>({
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

  const visitorsGreeted: string[] = []
  for await (const { event } of eventStream) {
    // @ts-ignore
    const visitorGreetedEvent = event as VisitorGreetedEvent
    visitorsGreeted.push(visitorGreetedEvent.data.visitor)
  }

  res.send(`${visitorsGreeted.length} visitors have been greeted, they are: [${visitorsGreeted.join(',')}]`)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
