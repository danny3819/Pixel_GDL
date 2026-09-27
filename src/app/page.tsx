import Link from 'next/link'
import { neon } from '@neondatabase/serverless'
import {
  Smartphone,
  Wrench,
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  PhoneCall,
  CheckCircle2,
  Cpu,
  BatteryCharging,
  Unlock,
  Award,
  ArrowRight,
  MessageSquare,
  Navigation,
  ExternalLink,
} from 'lucide-react'

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

const PHONE_NUMBER = '+523343737488'
const PHONE_DISPLAY = '+52 33 4373 7488'
const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/j7mYzDMzxkNtayYN7'

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

  const defaultWhatsappMsg = encodeURIComponent(
    'Hola Pixel Center GDL, me interesa cotizar una reparación o consultar información sobre sus servicios.'
  )

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white pb-20 md:pb-0">
      {/* Top Banner de Promoción */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 text-white text-[11px] sm:text-xs py-2 px-3 text-center font-medium shadow-inner">
        🚀 Diagnóstico gratis en taller • Garantía por escrito en todas nuestras reparaciones en GDL
      </div>

      {/* Header / Navbar (Mobile Optimized) */}
      <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-blue-600/10 border border-blue-500/30 rounded-xl group-hover:bg-blue-600/20 transition-all">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-white block leading-tight">
                Pixel Center <span className="text-blue-500">GDL</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">
                Repara Ya! Móvil
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#servicios" className="hover:text-blue-400 transition-colors">Servicios</a>
            <a href="#catalogo" className="hover:text-blue-400 transition-colors">Venta de Celulares</a>
            <a href="#ubicacion" className="hover:text-blue-400 transition-colors">Ubicación</a>
            <a href="#nosotros" className="hover:text-blue-400 transition-colors">¿Quiénes Somos?</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin"
              className="text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 px-3 py-2 rounded-xl transition-all"
            >
              Admin
            </Link>
            <a
              href={`https://wa.me/${PHONE_NUMBER}?text=${defaultWhatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section - Mobile First */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:pt-16 sm:pb-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 sm:h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                Reparación Express & Venta Garantizada
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                Reparación profesional y <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">venta segura</span> de celulares
              </h1>

              <p className="text-slate-400 text-sm sm:text-lg leading-relaxed">
                En <strong className="text-slate-200">Pixel Center GDL</strong> arreglamos fallas de pantalla, baterías, centros de carga y micro-soldadura. Además contamos con catálogo de seminuevos garantizados.
              </p>

              {/* Botones Primarios Grandes para Táctil */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
                    'Hola, quiero cotizar la reparación de mi celular.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold px-6 py-4 rounded-2xl text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/50 transition-all"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  Cotizar por WhatsApp
                </a>
                <a
                  href="#catalogo"
                  className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold px-6 py-4 rounded-2xl text-base flex items-center justify-center gap-2 transition-all text-center"
                >
                  <span>Ver Celulares en Venta</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Badges de Confianza */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-slate-800/80">
                <div className="bg-slate-900/40 border border-slate-800/60 p-3 rounded-2xl text-center">
                  <div className="text-lg sm:text-2xl font-black text-white">100%</div>
                  <div className="text-[10px] sm:text-xs text-slate-400">Garantía Escrita</div>
                </div>
                <div className="bg-slate-900/40 border border-slate-800/60 p-3 rounded-2xl text-center">
                  <div className="text-lg sm:text-2xl font-black text-blue-400">Express</div>
                  <div className="text-[10px] sm:text-xs text-slate-400">Entrega Rápida</div>
                </div>
                <div className="bg-slate-900/40 border border-slate-800/60 p-3 rounded-2xl text-center">
                  <div className="text-lg sm:text-2xl font-black text-emerald-400">Original</div>
                  <div className="text-[10px] sm:text-xs text-slate-400">Refacciones A+</div>
                </div>
              </div>
            </div>

            {/* Tarjeta de Contacto Directo */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-blue-400" />
                    Contacto Directo
                  </h2>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    Abierto
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Llamadas y WhatsApp</span>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="text-xl font-extrabold text-emerald-400 hover:underline block mt-0.5"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Guadalajara, Jalisco, México</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Lunes a Sábado: 10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Google Pixel, iPhone, Samsung y Xiaomi</span>
                  </div>
                </div>

                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Abrir ubicación en Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Ubicación e Interactividad */}
      <section id="ubicacion" className="py-14 sm:py-20 bg-slate-950 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
            <span className="text-[11px] font-bold text-blue-400 tracking-wider uppercase bg-blue-500/10 px-3.5 py-1 rounded-full border border-blue-500/20 inline-block">
              Encuéntranos Fácilmente
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ubicación del Taller
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Visítanos directamente en Guadalajara para un diagnóstico presencial e inmediato de tu equipo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Contenedor del Mapa Interactivo */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[400px] relative shadow-2xl">
              <iframe
                title="Ubicación Pixel Center GDL"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.27532356395!2d-103.35!3d20.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQwJzE0LjQiTiAxMDPCsDIxJzAwLjAiVw!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                className="w-full h-full border-0 absolute inset-0 opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Panel de Accesos Rápidos para Celular */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Pixel Center GDL</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Ubicados estratégicamente en la zona metropolitana de Guadalajara para atender tus urgencias técnicas el mismo día.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Cómo Llegar (Google Maps)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
                    'Hola, me encuentro cerca de su ubicación y quisiera solicitar informes.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Aviso de Llegada por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Nuestros Servicios */}
      <section id="servicios" className="py-14 sm:py-20 bg-slate-900/40 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20 inline-block">
              Servicios Técnicos
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Especialistas en Reparación Móvil
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/20">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Pantallas y Displays</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Reemplazo de pantallas rotas, touch con fallas y cristal estrellado en tiempo récord.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Centros de Carga y Baterías</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Cambio de pin de carga y baterías dañadas o infladas para recuperar la autonomía de tu móvil.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Tarjeta Lógica y Micro-soldadura</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Reparación de cortocircuitos, equipos mojados o teléfonos que no encienden.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center justify-center border border-cyan-500/20">
                <Unlock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Software y Desbloqueos</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Liberación de compañía, reestablecimiento de sistema operativo y respaldo de información.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/20">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Mantenimiento General</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Limpieza de altavoces, bocinas con bajo sonido, micrófonos y conectores sulfatados.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 bg-rose-500/10 text-rose-400 rounded-xl flex items-center justify-center border border-rose-500/20">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Especialistas Google Pixel</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Contamos con refacciones especializadas para Google Pixel, iPhone, Samsung y Xiaomi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Catálogo de Venta */}
      <section id="catalogo" className="py-14 sm:py-20 bg-slate-950 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 pb-4 sm:pb-6 border-b border-slate-800 gap-4">
            <div>
              <span className="text-[11px] font-bold text-blue-400 tracking-wider uppercase bg-blue-500/10 px-3.5 py-1 rounded-full border border-blue-500/20 inline-block mb-2">
                Inventario
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Celulares Garantizados a la Venta
              </h2>
            </div>
            <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold px-3.5 py-1.5 rounded-xl">
              {phones.length} {phones.length === 1 ? 'Disponible' : 'Disponibles'}
            </span>
          </div>

          {phones.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800 max-w-lg mx-auto my-6">
              <Smartphone className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Sin inventario publicado actualmente</h3>
              <p className="text-slate-400 text-xs px-6">
                Consulta por WhatsApp para conocer los próximos equipos que ingresarán.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {phones.map((phone) => {
                const imageSrc = phone.imageUrl || phone.image_url || ''
                const whatsappMessage = encodeURIComponent(
                  `Hola Pixel Center GDL, me interesa comprar el celular: ${phone.title} ($${Number(
                    phone.price
                  ).toLocaleString('es-MX')} MXN)`
                )

                return (
                  <div
                    key={phone.id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col hover:border-blue-500/40 transition-all duration-300 shadow-lg"
                  >
                    <div className="h-56 bg-slate-950 relative overflow-hidden flex items-center justify-center p-4 border-b border-slate-800/80">
                      {imageSrc.startsWith('/') || imageSrc.startsWith('http') ? (
                        <img
                          src={imageSrc}
                          alt={phone.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-slate-600 font-medium text-xs flex flex-col items-center gap-2">
                          <Smartphone className="w-8 h-8 opacity-40" />
                          <span>Sin imagen</span>
                        </div>
                      )}
                      <span className="absolute top-3 right-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {phone.condition || 'Seminuevo'}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="text-[10px] font-bold tracking-wider text-blue-400 uppercase mb-1">
                          {phone.brand || 'Equipo'}
                        </div>
                        <h3 className="text-lg font-bold text-white leading-snug">
                          {phone.title}
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed mt-2 line-clamp-3">
                          {phone.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase block">Precio</span>
                          <span className="text-xl font-black text-white">
                            ${Number(phone.price).toLocaleString('es-MX')}
                            <span className="text-[10px] text-slate-400 font-normal ml-0.5">MXN</span>
                          </span>
                        </div>

                        <a
                          href={`https://wa.me/${PHONE_NUMBER}?text=${whatsappMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-current" />
                          <span>Comprar</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Sección: ¿Quiénes Somos? */}
      <section id="nosotros" className="py-14 sm:py-20 bg-slate-900/40 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-[11px] font-bold text-blue-400 tracking-wider uppercase bg-blue-500/10 px-3.5 py-1 rounded-full border border-blue-500/20 inline-block">
              ¿Quiénes Somos?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Transparencia y Garantía en GDL
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              En <strong className="text-slate-200">Pixel Center GDL / Repara Ya! Móvil</strong> nos dedicamos a resolver fallas de telefonía celular con diagnóstico honesto, componentes probados y atención directa por técnicos capacitados.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-900 text-xs text-center sm:text-left">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Pixel Center GDL / Repara Ya! Móvil. Todos los derechos reservados.</p>
          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5" />
            Guadalajara, Jalisco
          </a>
        </div>
      </footer>

      {/* Barra Flotante Inferior Exclusiva para Celulares (Mobile Call-To-Action Bar) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 p-2.5 sm:hidden flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex-1 bg-slate-800 hover:bg-slate-700 active:bg-slate-700 text-white font-bold py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
        >
          <PhoneCall className="w-4 h-4 text-blue-400" />
          <span>Llamar</span>
        </a>

        <a
          href={`https://wa.me/${PHONE_NUMBER}?text=${defaultWhatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>

        <a
          href={GOOGLE_MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center border border-blue-400/30 transition-all"
          aria-label="Google Maps"
        >
          <Navigation className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}