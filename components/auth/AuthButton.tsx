'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="bg-gray-100 px-8 py-3 rounded-lg">Cargando...</div>
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-white">Hola, {session.user.name}</span>
        <button
          onClick={() => signOut()}
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
        >
          Cerrar Sesión
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
    >
      Ingresar con Google
    </button>
  )
}