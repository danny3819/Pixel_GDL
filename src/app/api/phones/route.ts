import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: Obtener todos los teléfonos disponibles
export async function GET() {
  try {
    const phones = await prisma.phoneForSale.findMany({
      where: { available: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(phones)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los teléfonos' },
      { status: 500 }
    )
  }
}

// POST: Registrar un nuevo teléfono
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, brand, price, condition, description, imageUrl } = body

    const newPhone = await prisma.phoneForSale.create({
      data: {
        title,
        brand,
        price: parseFloat(price),
        condition,
        description,
        imageUrl,
      },
    })

    return NextResponse.json(newPhone, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al registrar el teléfono' },
      { status: 500 }
    )
  }
}