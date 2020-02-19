import { User } from '../interfaces/User'
import { getUserInfo } from '../api/user'
import { useAuth, AuthState } from '../stores/auth'

const getUser = ({ authenticationHeader, isAuthed}: AuthState) => async (): Promise<User> => {
  if (!isAuthed || !authenticationHeader) {
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
  const auth = useAuth()

  return {
    getUser: getUser(auth),
  }
}
