import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// GET: Verifica si existe la cookie de sesión activa
export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (session && session.value === 'authenticated') {
      return NextResponse.json({ authenticated: true }, { status: 200 })
    }

    return NextResponse.json({ authenticated: false }, { status: 200 })
  } catch (error) {
    console.error('Error en GET /api/admin/login:', error)
    return NextResponse.json({ authenticated: false }, { status: 200 })
  }
}

// POST: Inicia sesión
export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

    if (password === ADMIN_PASSWORD) {
      const cookieStore = await cookies()
      cookieStore.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 día
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  } catch (error) {
    console.error('Error en POST /api/admin/login:', error)
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 })
  }
}

// DELETE: Cierra sesión
export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error en DELETE /api/admin/login:', error)
    return NextResponse.json({ error: 'Error al cerrar sesión' }, { status: 500 })
  }
}