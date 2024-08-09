import jwt, { SignOptions } from 'jsonwebtoken'
import { config } from 'dotenv'

export const signToken = ({//đoạn code này dùng để quy định kiểu dử liệu khi truyền tham số vào
  payload,
  privatekey = process.env.JWT_SECRET as string,
  options = {
    algorithm: 'RS256'
  }
}: {
  payload: string | Buffer | object //kiểu dử liệu của từng tham số
  privatekey?: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {  //Promises là một cách để đại diện cho một giá trị trong tương lai, có thể là một giá trị thành công(resolve) hoặc một lỗi(reject).
    jwt.sign(payload, privatekey, options, (error, token) => { //khi chạy xong jwt.sign thì mới chạy (error, token) là một function nó nhận giá trị nếu thành công thì gán giá trị token cho resolve và ngược lại lổi thì reject cho err
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}
