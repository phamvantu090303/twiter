import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '../services/users.services'
import { RegisterReqBody } from '../models/requests/Users.Requests'
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
  const result = await usersService.register(req.body) //req.body chính là RegisterReqBody
  return res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}
