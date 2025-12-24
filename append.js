import { jsonEvent, KurrentDBClient } from '@kurrent/kurrentdb-client'

const client = KurrentDBClient.connectionString('kurrentdb://0.0.0.0:2113?tls=false')

// Create a new event
const eventType = 'SampleEventType'
const event = jsonEvent({
  type: eventType,
  data: {
    'id': '1',
    'importantData': 'some value',
  },
})

// Append the event object into the stream
const eventStream = 'SampleStream'
await client.appendToStream(eventStream, event)

console.log('Stream: ' + eventStream)
console.log('Event Type: ' + eventType)
console.log('Event Body: ' + JSON.stringify(event.data))
console.log("************************");

client.dispose();
