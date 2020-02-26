import { useEffect, useState } from 'react'
import flatMap from 'lodash/flatMap'

interface NoTokenResponse {
  message: string
  loginUrls: {
    [key: string]: Login
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
      `${process.env.REACT_APP_SERVER}/auth/token`,
      {
        method: 'GET'
      }
    )
      .then(result => result.json())
      .then((result: NoTokenResponse) => setLoginLinks(
        Object.keys(result.loginUrls).map(provider => ({
          provider,
          url: generateLoginLink(result.loginUrls[provider]),
        }))
      ))
  }, []);

  return loginLinks;
}

interface Login {
  url: string
  parameters: Record<string, string>
}
const generateLoginLink = ({ url, parameters }: Login): string => {
  return [
    url,
    flatMap(
      {
        ...parameters,
        redirect_uri: `${window.location.origin}/auth/callback`,
      },
      (value: string, key: string) => `${key}=${value}`
    ).join('&'),
  ].join('?')
}

export {
  useLoginLinks,
}
