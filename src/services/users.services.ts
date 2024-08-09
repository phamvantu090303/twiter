import { signToken } from './../../utils/jwt'
import { hashPassword } from './../../utils/crypto'
import { RegisterReqBody } from '../models/requests/Users.Requests'
import User from '../models/schemas/User.schema'
import databaseService from './database.services'
import { TokenType } from '../constants/enums'
import RefreshToken from '../models/schemas/ResfestToken.Schema'
import { ObjectId } from 'mongodb'

class UsersService {
  //hàm tạo accessToken
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN //thời gian hết hạn của accesstoken
      }
    })
  }
  //hàm tạo refreshToken
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRSH_TOKEN_EXPIRES_IN
      }
    })
  }

  private signAccessAndRefreshToken(usen_id: string) {
    return Promise.all([this.signAccessToken(usen_id), this.signRefreshToken(usen_id)])
  }
  //đăng kí
  async register(payload: RegisterReqBody) {
    // const { email, password } = payload
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.data_of_birth),
        password: hashPassword(payload.password)
      })
    )
    //lấy user_id ra để đưa vào  payload: {
    //  user_id,
    // token_type: TokenType.RefreshToken
    // }, để tạo AccessToken
    const user_id = result.insertedId.toString() //lấy giá trị id trong trường dử liệu
    const [access_token, refregh_token] = await this.signAccessAndRefreshToken(user_id)
    //access_token, refregh_token sẽ nhận giá trị từ  this.signAccessToken(user_id), this.signRefreshToken(user_id)
    await databaseService.refeshToken.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refregh_token
      })
    )
    return {
      access_token,
      refregh_token
    }
  }
  //đăng nhập
  async login(user_id: string) {
    const [access_token, refregh_token] = await this.signAccessAndRefreshToken(user_id)
    await databaseService.refeshToken.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refregh_token
      })
    )
    return {
      access_token,
      refregh_token
    }
  }
  //kiêmr tra email có tồn tại trong databaseService hay chưa nếu có thì trả về true ngược lại th false
  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    console.log(user)
    return Boolean(user)
  }
}

const usersService = new UsersService()
export default usersService
