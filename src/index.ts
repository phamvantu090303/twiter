import DatabaseService from './services/database.services'
import UserRouter from './routes/users.routes'
import express from 'express'
import { defaultErrorHandler } from './middlewares/ErrorHandler'

const app = express()
// app.use(cors)
const port = 3000

app.use(express.json())
app.use('/api', UserRouter)
//database
DatabaseService.connect()

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
