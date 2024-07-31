import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'

//validations:RunnableValidationChains<ValidationChain:quy định rằng tham số validations phải là một tập hợp các chuỗi xác thực  có thể chạy được.
export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validations.run(req) //Dòng này chạy tất cả các chuỗi xác thực trên đối tượng request
    const errors = validationResult(req)
    //nếu mà  không có lổi thì next
    if (errors.isEmpty()) {
      return next()
    }
    res.status(400).json({ errors: errors.mapped() }) //mapped:
  }
}
