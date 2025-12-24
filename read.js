import { KurrentDBClient, FORWARDS, START } from '@kurrent/kurrentdb-client'

const client = KurrentDBClient.connectionString('kurrentdb://0.0.0.0:2113?tls=false')

const eventStream = 'SampleStream'
let events = client.readStream(
  eventStream,
  {
    fromRevision: START,
    direction: FORWARDS,
    maxCount: 20,
  }
)

for await (const resolvedEvent of events) {
  console.log('Stream ID: ' + resolvedEvent.event?.id)
  console.log('Stream: ' + resolvedEvent.event?.streamId)
  console.log('Event Type: ' + resolvedEvent.event?.type)
  console.log('Event Body: ' + JSON.stringify(resolvedEvent.event?.data))
  console.log('Created: ' + resolvedEvent.event?.created)
}

client.dispose()
