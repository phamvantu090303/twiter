import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '../services/users.services'
import { LogoutReqBody, RegisterReqBody } from '../models/requests/Users.Requests'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '../constants/Messager'

export const loginController = async (req: Request, res: Response) => {
  const { user }: any = req // Trực tiếp lấy đối tượng user từ req.user mà bạn vừa gán bên user.middleware
  const user_id = user._id as ObjectId
  const result = await usersService.login(user_id.toString())
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (
  // khi người dùng gửi một yêu cầu HTTP đến endpoint đăng ký, dữ liệu mà họ nhập vào và gửi sẽ đc lưu req.body
  req: Request<ParamsDictionary, any, RegisterReqBody>, // sẽ được kiểm tra dựa trên cấu trúc của interface(RegisterReqBody) này.nếu đúng thì lm tiếp mà nếu sai với cấu trúc interface (RegisterReqBody) đc khai báo thì sẽ next báo lổi
  res: Response,
  next: NextFunction
) => {
  // throw new Error('test err')
  // const { email, password, data_of_birth, confirm_password, name } = req.body //body có kiểu RegisterReqBody được khai baó thành interface để lấy ra các trường dử liệu

  //bên users.services dùng asyn thì khi gọi sang bên này thì phải dùng await
  const result = await usersService.register(req.body)
  return res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}
export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const { decoded_authorization }: any = req // Lấy thông tin giải mã từ access token từ  req.decoded_authorization = decoded_authorization

  // Kiểm tra xem access token có thuộc về người dùng hiện tại không
  const user = await usersService.getUserById(decoded_authorization._id)
  if (!user) {
    return res.status(403).json({ message: USERS_MESSAGES.INVALID_TOKEN })
  }
   // Kiểm tra xem refresh_token có thuộc về người dùng này hay không
  // const isValidRefreshToken = await usersService.verifyRefreshToken(user._id, refresh_token)

  // if (!isValidRefreshToken) {
  //   return res.status(403).json({ message: USERS_MESSAGES.INVALID_REFRESH_TOKEN })
  // }
  const result = await usersService.logout(refresh_token)
  return res.json(result)
}
