export enum UserVerifyStatus {
  Unverified, //chưa xác thực email mặc định bằng 0
  erified, //đã xác thực email
  Banned //bị khóa
}
export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}
