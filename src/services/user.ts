import { User } from '../interfaces/User'
import { getUserInfo } from '../api/user'
import { AuthenticationHeader } from '../interfaces/Auth'

const getUser = async (authenticationHeader: AuthenticationHeader): Promise<User> => {
  if (!authenticationHeader) {
    throw new Error('Need to be authenticated')
  }
  return getUserInfo(authenticationHeader)
    .then(result => result.json())
    .then(result => {
      return {
        name: result.displayName,
        img: result.pictureURL,
        id: result.id,
      }
    })
}

export const useUserService = () => {
  return {
    getUser
  }
}
