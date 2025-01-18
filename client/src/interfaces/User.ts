interface IUser {
  id: string
  firstname: string
  lastname: string
  email: string
  accessToken: string
}
interface IUserRegister {
  firstname: string
  lastname: string
  email: string
  password: string
  gender: string
}
interface IUserLogin {
  email: string
  password: string
}
interface IUserGet {
  _id: string
  firstname: string
  lastname: string
  email: string
  gender: string
}
export type { IUser, IUserRegister, IUserLogin, IUserGet }
