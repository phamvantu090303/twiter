import { error } from 'console'
import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
export const LoginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      error: 'loi email hoac password'
    })
  }
  next()
}
//checkSchema là một kiểu mà đc cài đặt vào để kiểm tra điều kiện của các trường nhập của registerValidator
export const registerValidator = checkSchema({
  name: {
    notEmpty: true,
    isLength: {
      options: {
        min: 1,
        max: 100
      }
    },
    trim: true
  },
  email: {
    notEmpty: true,
    isEmail: true,
    trim: true
  },
  password: {
    notEmpty: true,
    isLength: {
      options: {
        min: 6,
        max: 50
      }
    },
    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      },
      errorMessage: 'password phải có 6 kí tự và có 1 ký tự viết hoa ,1 số và 1 ký tự đặc biệt'
    }
  },
  confirm_password: {
    notEmpty: true,
    isLength: {
      options: {
        min: 6,
        max: 50
      }
    },
    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      },
      errorMessage: 'password phải có 6 kí tự và có 1 ký tự viết hoa ,1 số và 1 ký tự đặc biệt'
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Xác nhận mật khẩu nhập lại không khớp với mật khẩu ban đầu')
        }
        return true
      }
    }
  },

  date_of_birth: {
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      }
    }
  }
})
