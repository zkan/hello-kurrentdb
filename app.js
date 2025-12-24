import express from 'express'

const app = express()
const port = 8080

app.get('/hello-world', async (req, res) => {
  res.send(`greeted`)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
