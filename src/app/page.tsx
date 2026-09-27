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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Banner de Promoción */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 text-white text-xs py-2 px-4 text-center font-medium shadow-inner">
        🚀 Diagnóstico gratis en taller • Garantía por escrito en todas nuestras reparaciones en Guadalajara
      </div>

      {/* Header / Navbar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-blue-600/10 border border-blue-500/30 rounded-2xl group-hover:bg-blue-600/20 transition-all">
              <Smartphone className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white block leading-tight">
                Pixel Center <span className="text-blue-500">GDL</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Repara Ya! Móvil
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#servicios" className="hover:text-blue-400 transition-colors">
              Servicios
            </a>
            <a href="#nosotros" className="hover:text-blue-400 transition-colors">
              ¿Quiénes Somos?
            </a>
            <a href="#catalogo" className="hover:text-blue-400 transition-colors">
              Venta de Celulares
            </a>
            <a href="#garantia" className="hover:text-blue-400 transition-colors">
              Garantía
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="hidden sm:inline-flex text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-xl transition-all"
            >
              Acceso Admin
            </Link>
            <a
              href={`https://wa.me/${PHONE_NUMBER}?text=${defaultWhatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Contactar WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4" />
                Especialistas en Reparación Multimarca & Venta Garantizada
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Reparación rápida y <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">venta segura</span> de celulares en GDL
              </h1>

              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                En <strong className="text-slate-200">Pixel Center GDL (Repara Ya! Móvil)</strong> solucionamos fallas complejas de tarjetas lógicas, pantallas, baterías y centros de carga, además de ofrecer equipos seminuevos 100% probados y garantizados.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
                    'Hola, necesito una cotización rápida para reparar mi celular.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl text-base flex items-center justify-center gap-3 shadow-xl shadow-blue-900/30 transition-all hover:scale-105"
                >
                  <Wrench className="w-5 h-5" />
                  Cotizar Reparación
                </a>
                <a
                  href="#catalogo"
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold px-8 py-4 rounded-2xl text-base flex items-center justify-center gap-2 transition-all"
                >
                  <span>Ver Celulares Disponibles</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Estadísticas de Confianza */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-xs text-slate-400">Garantía por Escrito</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-400">Express</div>
                  <div className="text-xs text-slate-400">Servicio el Mismo Día</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">Original</div>
                  <div className="text-xs text-slate-400">Refacciones Calidad A+</div>
                </div>
              </div>
            </div>

            {/* Tarjeta Destacada de Contacto Directo */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl relative">
                <div className="absolute -top-3 right-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Atención Inmediata
                </div>

                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-blue-400" />
                  Atención Directa & Citas
                </h2>
                <p className="text-xs text-slate-400 mb-6">
                  Habla directamente con un técnico para asesoría personalizada.
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                    <span className="text-xs text-slate-500 block">Teléfono / WhatsApp Oficial</span>
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      className="text-xl font-extrabold text-emerald-400 hover:underline block mt-0.5"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Guadalajara, Jalisco, México</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Lunes a Sábado: 10:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Especialistas en Google Pixel, Apple iPhone y Samsung</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${PHONE_NUMBER}?text=${defaultWhatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    Escribir por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: ¿Quiénes Somos? */}
      <section id="nosotros" className="py-20 bg-slate-950 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-blue-400 tracking-wider uppercase bg-blue-500/10 px-3.5 py-1 rounded-full border border-blue-500/20">
              ¿Quiénes Somos?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Tu Centro de Confianza Técnico en Guadalajara
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              En <strong className="text-slate-200">Pixel Center GDL / Repara Ya! Móvil</strong> nos apasiona devolverle la vida a tu tecnología. Nos especializamos en la reparación avanzada de dispositivos móviles y la venta de telefonía seminueva verificada. Trabajamos con transparencia total, diagnóstico claro sin costos ocultos y refacciones seleccionadas para asegurar la máxima durabilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/60 border border-slate-800/80 p-8 rounded-3xl space-y-3">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Experiencia Técnica</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Técnicos capacitados en micro-soldadura, diagnóstico de circuitos y reparación de las marcas más exigentes del mercado.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 p-8 rounded-3xl space-y-3">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Garantía Real</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Todas nuestras reparaciones y venta de equipos cuentan con garantía respaldada directamente en taller.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 p-8 rounded-3xl space-y-3">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-4 border border-indigo-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Atención Transparente</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Te explicamos exactamente cuál es la falla de tu equipo y las opciones disponibles antes de realizar cualquier procedimiento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Nuestros Servicios */}
      <section id="servicios" className="py-20 bg-slate-900/40 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20">
              Nuestros Servicios
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Soluciones Integrales para tu Móvil
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Atendemos todo tipo de problemas de hardware y software en celulares de todas las marcas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Cambio de Pantalla y Cristal</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Reemplazo de displays rotos, cristales estrellados y fallas del touch. Pantallas de calidad original con excelente brillo y respuesta táctil.
              </p>
            </div>

            {/* Servicio 2 */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Baterías y Centros de Carga</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                ¿Tu teléfono no carga o se apaga rápido? Cambiamos pin de carga tipo C / Lightning y baterías de alta capacidad.
              </p>
            </div>

            {/* Servicio 3 */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Reparación de Tarjeta Lógica</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Solución a equipos mojados, cortos circuitos, teléfonos que no encienden o presentan reinicios constantes (Micro-soldadura).
              </p>
            </div>

            {/* Servicio 4 */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
                <Unlock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Desbloqueos y Software</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Liberación de compañía para uso internacional, restablecimiento de sistema, solución a bucles de inicio y respaldo de datos.
              </p>
            </div>

            {/* Servicio 5 */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Mantenimiento Preventivo</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Limpieza profunda de altavoces, bocinas con bajo volumen, micrófonos, conectores y sellado contra polvo e impurezas.
              </p>
            </div>

            {/* Servicio 6 */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center border border-rose-500/20 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Especialidad Google Pixel & Apple</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Contamos con refacciones difíciles de conseguir para toda la línea Google Pixel, iPhone, Samsung Galaxy y Xiaomi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Catálogo de Venta de Celulares */}
      <section id="catalogo" className="py-20 bg-slate-950 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-blue-400 tracking-wider uppercase bg-blue-500/10 px-3.5 py-1 rounded-full border border-blue-500/20 inline-block mb-3">
                Inventario Disponible
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Venta de Celulares Probados & Garantizados
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Equipos inspeccionados minuciosamente. Listos para entregarse en Guadalajara.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold px-4 py-2 rounded-xl">
                {phones.length} {phones.length === 1 ? 'Equipo disponible' : 'Equipos disponibles'}
              </span>
            </div>
          </div>

          {phones.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/60 rounded-3xl border border-slate-800 max-w-lg mx-auto my-8">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-500">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No hay equipos en inventario actualmente</h3>
              <p className="text-slate-400 text-xs sm:text-sm px-6">
                Estamos actualizando nuestro catálogo. ¡Consulta directamente por WhatsApp para conocer próximos ingresos!
              </p>
              <a
                href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
                  'Hola, me gustaría saber si tienen próximos celulares a la venta.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all"
              >
                <span>Preguntar disponibilidad</span>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {phones.map((phone) => {
                const imageSrc = phone.imageUrl || phone.image_url || ''
                const whatsappMessage = encodeURIComponent(
                  `Hola Pixel Center GDL, me interesa comprar el equipo: ${phone.title} por $${Number(
                    phone.price
                  ).toLocaleString('es-MX')} MXN.`
                )

                return (
                  <div
                    key={phone.id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col hover:border-blue-500/40 transition-all duration-300 shadow-xl group"
                  >
                    {/* Imagen del Producto */}
                    <div className="h-64 bg-slate-950 relative overflow-hidden flex items-center justify-center p-6 border-b border-slate-800/80">
                      {imageSrc.startsWith('/') || imageSrc.startsWith('http') ? (
                        <img
                          src={imageSrc}
                          alt={phone.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-slate-600 font-medium text-xs flex flex-col items-center gap-2">
                          <Smartphone className="w-10 h-10 opacity-40" />
                          <span>Sin imagen disponible</span>
                        </div>
                      )}
                      <span className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
                        {phone.condition || 'Seminuevo'}
                      </span>
                    </div>

                    {/* Contenido de la Tarjeta */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="text-[11px] font-bold tracking-wider text-blue-400 uppercase mb-1">
                          {phone.brand || 'Celular'}
                        </div>
                        <h3 className="text-xl font-bold text-white leading-snug">
                          {phone.title}
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2 line-clamp-3">
                          {phone.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase block">Precio Especial</span>
                          <span className="text-2xl font-black text-white">
                            ${Number(phone.price).toLocaleString('es-MX')}
                            <span className="text-xs text-slate-400 font-normal ml-1">MXN</span>
                          </span>
                        </div>

                        <a
                          href={`https://wa.me/${PHONE_NUMBER}?text=${whatsappMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-950/50"
                        >
                          <MessageSquare className="w-4 h-4 fill-current" />
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

      {/* Sección: Por Qué Elegirnos / Garantía */}
      <section id="garantia" className="py-20 bg-slate-900/60 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 border border-blue-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-400 tracking-wider uppercase bg-blue-500/10 px-3.5 py-1 rounded-full border border-blue-500/20">
                  Garantía y Compromiso
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  ¿Por qué reparar o comprar con nosotros?
                </h2>
                <ul className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Pruebas de Calidad:</strong> Revisamos pantalla, batería, cámaras, señal y micrófonos antes de entregar cualquier equipo.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Sin Engaños:</strong> Si tu equipo no tiene reparación viable, te lo informamos honestamente sin cargos innecesarios.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Soporte Directo por WhatsApp:</strong> Asesoría inmediata al teléfono {PHONE_DISPLAY}.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
                <ShieldCheck className="w-12 h-12 text-blue-400" />
                <h3 className="text-lg font-bold text-white">¿Tienes alguna duda o consulta técnica?</h3>
                <p className="text-xs text-slate-400">
                  Escríbenos directamente y te daremos respuesta el mismo día.
                </p>
                <a
                  href={`https://wa.me/${PHONE_NUMBER}?text=${defaultWhatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-900 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-2">
            <span className="text-lg font-black text-white block">
              Pixel Center <span className="text-blue-500">GDL</span>
            </span>
            <p className="text-slate-500 leading-relaxed max-w-sm">
              Servicio técnico especializado en la reparación de celulares de gama alta y media, micro-soldadura y venta de telefonía garantizada en Guadalajara, Jalisco.
            </p>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-[11px]">Contacto Directo</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                WhatsApp / Tel: <a href={`tel:${PHONE_NUMBER}`} className="text-emerald-400 hover:underline">{PHONE_DISPLAY}</a>
              </li>
              <li>Ubicación: Guadalajara, Jal.</li>
              <li>Horario: Lun - Sáb (10:00 AM - 7:00 PM)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-[11px]">Navegación</h4>
            <ul className="space-y-2">
              <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
              <li><a href="#nosotros" className="hover:text-white transition-colors">¿Quiénes Somos?</a></li>
              <li><a href="#catalogo" className="hover:text-white transition-colors">Venta de Equipos</a></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Panel Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-600">
          <p>© {new Date().getFullYear()} Pixel Center GDL / Repara Ya! Móvil. Todos los derechos reservados.</p>
          <p>Diseñado para máxima velocidad y conversión.</p>
        </div>
      </footer>
    </div>
  )
}