import DatabaseService from './services/database.services'
import UserRouter from './routes/users.routes'
import express from 'express'
import { defaultErrorHandler } from './middlewares/ErrorHandler'
import path from 'path'
import cors from 'cors' // Import cors

const app = express()
// Sử dụng cookie-parser middleware

const port = 3000
app.use(cors())
app.use(express.json())

// Middleware để phục vụ các file tĩnh
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api', UserRouter)
//database
DatabaseService.connect()

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
