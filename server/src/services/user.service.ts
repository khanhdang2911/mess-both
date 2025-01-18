import { User } from '~/models/user.model'

const getALlUsersService = async () => {
  const users = await User.find()
  return users
}

export { getALlUsersService }
