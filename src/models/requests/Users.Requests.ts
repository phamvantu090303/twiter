export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  data_of_birth: string
}
export interface LogoutReqBody {
  refresh_token: string
}
