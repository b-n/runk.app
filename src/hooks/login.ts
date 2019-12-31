import { useEffect, useState } from 'react'

interface NoTokenResponse {
  message: string
  loginUrls: {
    [key: string]: string
  }
}

interface LoginProvider {
  provider: string
  url: string
}

const useLoginLinks = () => {
  const [ loginLinks, setLoginLinks ] = useState([] as Array<LoginProvider>);

  useEffect(() => {
    fetch(
      'http://localhost:3001/auth/token',
      {
        method: 'GET'
      }
    )
      .then(result => result.json())
      .then((result: NoTokenResponse) => setLoginLinks(
        Object.keys(result.loginUrls).map(provider => ({
          provider,
          url: result.loginUrls[provider],
        }))
      ))
  }, []);

  return loginLinks;
}

export {
  useLoginLinks,
}
