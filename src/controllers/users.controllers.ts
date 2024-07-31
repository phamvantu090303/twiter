import { Request, Response } from 'express'
import usersService from '../services/users.services'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'phamvantu@gmail.com' && password === '123') {
    return res.status(200).json({
      message: 'login thanh cong'
    })
  }

  return res.status(400).json({
    message: 'login loi'
  })
}

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await usersService.register({ email, password })
    return res.json({
      message: 'dang ky thanh cong',
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'dang ky loi'
    })
  }
}
