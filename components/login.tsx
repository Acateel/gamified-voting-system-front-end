'use client'

import { useAuth } from '@/contexts/authContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useState } from 'react'
import { votingApi } from '@/lib/votingApi'
import { RotateCw } from 'lucide-react'
import { AxiosError } from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { isLoading, setIsLoading, setToken, setUser } = useAuth()

  const signin = async () => {
    try {
      setIsLoading(true)

      const token = (
        await votingApi.post('/auth/signin', {
          email,
          password,
        })
      ).data.access_token

      setToken(token)
      console.log(`[DEBUG] token: ${token}`)

      const user = (
        await votingApi.get('/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data

      setUser(user)
      console.log(`[DEBUG] user: ${user}`)
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status) {
        setErrorMessage('User with this email and password dont found')
      }
      console.log(`[LOGIN ERROR] ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:msx-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Write down your email and password.
            {errorMessage && <p className="text-rose-600">*{errorMessage}*</p>}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="example@gmail.com"
              className="col-span-3"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              className="col-span-3"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => signin()}>
            {isLoading && (
              <RotateCw width={17} height={17} className="animate-spin mr-2" />
            )}{' '}
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
