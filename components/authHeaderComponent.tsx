'use client'

import { useAuth } from '@/contexts/authContext'
import Login from './login'
import { User } from 'lucide-react'

export default function AuthHeaderComponent() {
  const { user } = useAuth()

  return (
    <div>
      {user ? (
        <div className='flex flex-row items-center justify-center gap-4'>
          <User width={30} height={30} className='text-sky-600' />
          <div>{user.employee.fullname}</div>
          </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  )
}
