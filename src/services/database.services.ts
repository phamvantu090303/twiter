import { config } from 'dotenv' // để sử dụng được biến môi trường env
config() // config(): Chức năng này đọc tệp .env và làm cho nội dung của nó có sẵn thông qua process.env
import { MongoClient, Db, Collection } from 'mongodb'
import User from '../models/schemas/User.schema'

// sử dụng process để trỏ đến file env để sử dụng tài nguyên từ file đó
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.jdianmg.mongodb.net/?retryWrites=true&w=majority&appName=Twitte`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri) //tạo đường dẩn kết nối đến database theo uri(twitter.jdianmg.mongodb.net)
    this.db = this.client.db(process.env.DB_NAME) //chọn ra tên của database cần sử dụng gán vào db
  }

  async connect() {
    try {
      // kết nối từ client đến server
      // await được sử dụng để chờ một Promise. Nó chỉ có thể được sử dụng bên trong một khối async
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Erorr', error)
      throw error
    }
  }
  get users(): Collection<User> {
    //kết nối với cột Users trong database(cột user đươc khai báo trong env và bắt buộc gán á string để ko lổi)
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
