import { Request, Response } from 'express'
import databaseService from '../services/database.services'
import User from '../models/schemas/User.schema'

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
    const result = await databaseService.users.insertOne(
      new User({
        email: email,
        password: password
      })
    )
    console.log(result)
    return res.json({
      message: 'dang ky thanh cong'
    })
  } catch (error) {
    return res.status(400).json({
      message: 'dang ky loi'
    })
  }
}
