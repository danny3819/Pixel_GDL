import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// GET: Obtener todos los teléfonos
export async function GET() {
  try {
    const phones = await sql`
      SELECT 
        id,
        title,
        brand,
        price,
        condition,
        description,
        image_url AS "imageUrl",
        image_url,
        available,
        created_at
      FROM phones 
      ORDER BY created_at DESC
    `
    return NextResponse.json(phones)
  } catch (error) {
    console.error('Error en GET /api/phones:', error)
    return NextResponse.json(
      { error: 'Error al obtener teléfonos' },
      { status: 500 }
    )
  }
}

// POST: Crear un nuevo teléfono (Requiere autenticación)
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { title, brand, price, condition, description, imageUrl } =
      await request.json()

    if (!title || !price || !description) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO phones (title, brand, price, condition, description, image_url, available)
      VALUES (${title}, ${brand}, ${Number(price)}, ${condition}, ${description}, ${imageUrl || null}, true)
      RETURNING *, image_url AS "imageUrl"
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error en POST /api/phones:', error)
    return NextResponse.json(
      { error: 'Error al guardar el teléfono' },
      { status: 500 }
    )
  }
}

// PATCH: Cambiar disponibilidad (Disponible / Vendido)
export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id, available } = await request.json()

    if (!id || typeof available !== 'boolean') {
      return NextResponse.json(
        { error: 'Datos inválidos' },
        { status: 400 }
      )
    }

    const result = await sql`
      UPDATE phones
      SET available = ${available}
      WHERE id = ${id}
      RETURNING *, image_url AS "imageUrl"
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error en PATCH /api/phones:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el teléfono' },
      { status: 500 }
    )
  }
}