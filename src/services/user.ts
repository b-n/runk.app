import { AuthenticationHeader } from '../interfaces/Auth'
import { User } from '../interfaces/User'
import { getUserInfo } from '../api/user'

const getUser = async (authenticationHeader: AuthenticationHeader): Promise<User> => {
  return getUserInfo(authenticationHeader)
    .then(result => result.json())
    .then(result => {
      return {
        name: result.displayName,
        img: result.pictureURL,
      }
    })
}

export default {
  getUser
}
