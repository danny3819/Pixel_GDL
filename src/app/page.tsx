import { prisma } from '@/lib/prisma'
import RepairQuote from '@/components/RepairQuote'
import { MapPin, Phone, Smartphone, ShieldCheck } from 'lucide-react'

export const revalidate = 0 // Carga dinámica de teléfonos desde Neon DB

export default async function HomePage() {
  const phones = await prisma.phoneForSale.findMany({
    where: { available: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-7 h-7 text-red-500" />
            <span className="font-extrabold text-xl tracking-tight text-white">
              Pixel Center <span className="text-red-500">GDL</span>
            </span>
          </div>
          <a
            href="https://wa.me/523300000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-700 text-xs font-medium transition-colors"
          >
            <Phone className="w-4 h-4 text-green-400" />
            Contacto Directo
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center px-4 py-16">
        <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          Especialistas en Reparación & Venta
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white mt-4 tracking-tight">
          Reparación profesional y celulares seminuevos en GDL
        </h1>
        <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
          Servicio técnico multimarca especializado en Google Pixel, Samsung y iPhone. Equipos garantizados y atención directa.
        </p>
      </section>

      {/* Cotizador */}
      <div className="px-4">
        <RepairQuote />
      </div>

      {/* Catálogo de Celulares a la Venta */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Equipos Disponibles</h2>
            <p className="text-slate-400 text-sm">Celulares probados con garantía de funcionamiento</p>
          </div>
          <span className="bg-slate-800 border border-slate-700 text-xs text-slate-300 px-3 py-1 rounded-lg">
            {phones.length} disponibles
          </span>
        </div>

        {phones.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-500">
            No hay equipos en inventario actualmente. ¡Vuelve a consultar pronto!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phones.map((phone) => (
              <div
                key={phone.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
              >
                <div>
                  {phone.imageUrl && (
                    <img
                      src={phone.imageUrl}
                      alt={phone.title}
                      className="w-full h-48 object-cover rounded-xl mb-4 bg-slate-800"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                      {phone.brand}
                    </span>
                    <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md border border-slate-700">
                      {phone.condition}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{phone.title}</h3>
                  <p className="text-slate-400 text-xs mt-2 line-clamp-3">{phone.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Precio</span>
                    <span className="text-xl font-black text-green-400">${phone.price.toLocaleString('es-MX')} MXN</span>
                  </div>
                  <a
                    href={`https://wa.me/523300000000?text=Hola,%20me%20interesa%20comprar%20el%20${encodeURIComponent(phone.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Comprar
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Ubicación */}
      <section className="bg-slate-900 border-t border-slate-800 py-12 px-4 text-center mt-12">
        <h3 className="text-2xl font-bold text-white">Ubicación y Horarios</h3>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-2">
          Mercado Lomas del Camichín, Tonalá, Jalisco. Local establecido a menos de 15 minutos de la Central Nueva.
        </p>
        <div className="mt-6">
          <a
            href="https://maps.app.goo.gl/WNu32fg3mcaaBVQA7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors shadow-md"
          >
            <MapPin className="w-5 h-5" />
            Abrir ubicación en Google Maps
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-6 text-center text-xs border-t border-slate-900">
        <p>© {new Date().getFullYear()} Pixel Center GDL / Repara Ya! Movil. Todos los derechos reservados.</p>
      </footer>
    </main>
  )
}