import AuthHeaderComponent from '@/components/authHeaderComponent'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/logo.svg" alt="Logo" height={40} width={40} />
          <h1 className="text-2xl font-extrabold text-sky-600 tracking-wide">
            Gamified voting system
          </h1>
        </div>
        <AuthHeaderComponent />
      </div>
    </header>
  )
}
