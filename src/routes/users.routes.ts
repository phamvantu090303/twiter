import { validate } from './../../utils/validation'
import { loginController, registerController } from '../controllers/users.controllers'
import { Router } from 'express'
import { LoginValidator, registerValidator } from '../middlewares/users.middlewares'
const UserRouter = Router()
//Khi một yêu cầu POST được gửi đến /login, dữ liệu từ các trường trong form email or password (vidu như form đăng nhập) sẽ có sẵn trong req.body
//và muốn  lấy được các dử liệu đó trong controler thì bạn hảy dùng  const { email, password } = req.body thì các trường sẽ đc use
UserRouter.post('/login', LoginValidator, loginController)
//UserRouter.post('/register', validate(registerValidator), registerController) khi chạy http này thì khi nhập các dử liệu lưu hết và req.body
//khi qua registerController thì (req: Request, res: Response) để sử dụng các trường vừa nhập 
UserRouter.post('/register', validate(registerValidator), registerController)

export default UserRouter
