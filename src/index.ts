import express from 'express'
import DatabaseService from './services/database.services'
import UserRouter from './routes/users.routes'

const app = express()
// app.use(cors)
const port = 3000

app.use(express.json())
//database
DatabaseService.connect()

app.use('/api', UserRouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
