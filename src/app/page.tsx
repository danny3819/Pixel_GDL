import Link from 'next/link'
import { neon } from '@neondatabase/serverless'

export const dynamic = 'force-dynamic'

interface Phone {
  id: number
  title: string
  brand: string
  price: number
  condition: string
  description: string
  imageUrl?: string
  image_url?: string
  available: boolean
}

async function getPhones(): Promise<Phone[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
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
      WHERE available = true
      ORDER BY created_at DESC
    `
    return phones as Phone[]
  } catch (error) {
    console.error('Error al obtener teléfonos en la vista principal:', error)
    return []
  }
}

export default async function HomePage() {
  const phones = await getPhones()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Header / Navbar */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-blue-400">
              Pixel Center <span className="text-white">GDL</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors border border-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-800"
            >
              Panel Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Reparación y Venta de Celulares
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Equipos Disponibles con Garantía
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Todos nuestros equipos están 100% probados, inspeccionados y listos para usar en Guadalajara.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Catálogo de Teléfonos</h2>
            <p className="text-sm text-slate-500">Selecciona un equipo para solicitar información por WhatsApp</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full">
            {phones.length} {phones.length === 1 ? 'Disponible' : 'Disponibles'}
          </span>
        </div>

        {phones.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto my-8">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No hay equipos disponibles por ahora</h3>
            <p className="text-slate-500 text-sm">
              Actualmente no tenemos inventario publicado. ¡Vuelve a consultar muy pronto!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {phones.map((phone) => {
              const imageSrc = phone.imageUrl || phone.image_url || '/placeholder-phone.png'
              const whatsappMessage = encodeURIComponent(
                `Hola Pixel Center GDL, me interesa el celular: ${phone.title} ($${Number(
                  phone.price
                ).toLocaleString('es-MX')} MXN)`
              )

              return (
                <div
                  key={phone.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group"
                >
                  {/* Image Container */}
                  <div className="h-64 bg-slate-100 relative overflow-hidden flex items-center justify-center p-4">
                    {imageSrc.startsWith('/') || imageSrc.startsWith('http') ? (
                      <img
                        src={imageSrc}
                        alt={phone.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-slate-400 font-medium text-sm flex flex-col items-center gap-2">
                        <span>📷</span>
                        Sin imagen
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="text-xl font-bold text-slate-900 leading-snug">
                          {phone.title}
                        </h3>
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                          {phone.condition || 'Seminuevo'}
                        </span>
                      </div>
                      {phone.brand && (
                        <p className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">
                          {phone.brand}
                        </p>
                      )}
                      <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                        {phone.description}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <div>
                        <span className="text-xs text-slate-400 block">Precio</span>
                        <span className="text-2xl font-black text-slate-900">
                          ${Number(phone.price).toLocaleString('es-MX')}
                          <span className="text-xs text-slate-500 font-normal ml-1">MXN</span>
                        </span>
                      </div>

                      <a
                        href={`https://wa.me/?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-sm"
                      >
                        Comprar
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 px-4 text-center text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Pixel Center GDL. Todos los derechos reservados.</p>
          <p className="text-slate-500 text-xs">Reparación y venta de celulares en Guadalajara</p>
        </div>
      </footer>
    </div>
  )
}