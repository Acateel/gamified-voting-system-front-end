'use client'

import { createContext, useContext, useState } from 'react'

type authContextType = {
  user: any
  setUser: (user: any) => void
  isLoading: boolean
  setIsLoading: (isLogin: boolean) => void
  token: string
  setToken: (token: string) => void
}

const AuthContext = createContext<authContextType>({
  user: null,
  setUser: () => null,
  isLoading: false,
  setIsLoading: () => null,
  token: '',
  setToken: () => null,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
