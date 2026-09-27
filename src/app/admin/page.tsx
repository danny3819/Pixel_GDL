'use client'

import { useState, useEffect } from 'react'
import {
  Smartphone,
  Lock,
  LogOut,
  Plus,
  CheckCircle,
  XCircle,
  Tag,
  DollarSign,
  Image as ImageIcon,
  Eye,
  EyeOff,
} from 'lucide-react'

interface PhoneItem {
  id: string
  title: string
  brand: string
  price: number
  condition: string
  description: string
  imageUrl: string | null
  available: boolean
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [phones, setPhones] = useState<PhoneItem[]>([])
  const [loading, setLoading] = useState(false)

  // Formulario nuevo teléfono
  const [title, setTitle] = useState('')
  const [brand, setBrand] = useState('Google')
  const [price, setPrice] = useState('')
  const [condition, setCondition] = useState('Excelente')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/login')
      if (res.ok) {
        const data = await res.json()
        if (data.authenticated) {
          setIsAuthenticated(true)
          fetchPhones()
          return
        }
      }
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Error de red o conexión al verificar sesión:', error)
      setIsAuthenticated(false)
    }
  }

  const fetchPhones = async () => {
    try {
      const res = await fetch('/api/phones')
      if (res.ok) {
        const data = await res.json()
        setPhones(data)
      }
    } catch (err) {
      console.error('Error al obtener teléfonos:', err)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setIsLoggingIn(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        setIsAuthenticated(true)
        fetchPhones()
      } else {
        const data = await res.json()
        setLoginError(data.error || 'Contraseña incorrecta')
      }
    } catch {
      setLoginError('Error al conectar con el servidor')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setIsAuthenticated(false)
    setPassword('')
  }

  const handleCreatePhone = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/phones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        brand,
        price,
        condition,
        description,
        imageUrl,
      }),
    })

    if (res.ok) {
      setTitle('')
      setPrice('')
      setDescription('')
      setImageUrl('')
      fetchPhones()
    } else {
      alert('Error al agregar el teléfono. Verifica la sesión.')
    }
    setLoading(false)
  }

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    const res = await fetch('/api/phones', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, available: !currentStatus }),
    })

    if (res.ok) {
      fetchPhones()
    }
  }

  // Pantalla de carga inicial
  if (isAuthenticated === null) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm text-slate-400">Verificando sesión...</p>
      </main>
    )
  }

  // Vista Formulario Login
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <Lock className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-white">Panel de Administración</h1>
          <p className="text-slate-400 text-xs text-center mt-1 mb-6">
            Pixel Center GDL / Repara Ya! Movil
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Contraseña de acceso</label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setShowPassword((prev) => !prev)
                  }}
                  className="absolute right-3 p-2 text-slate-500 hover:text-slate-200 transition-colors z-20 cursor-pointer select-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 pointer-events-none" />
                  ) : (
                    <Eye className="w-5 h-5 pointer-events-none" />
                  )}
                </button>
              </div>
            </div>
            {loginError && <p className="text-red-400 text-xs text-center">{loginError}</p>}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg"
            >
              {isLoggingIn ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  // Vista Panel de Administración
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
          <div className="flex items-center gap-3">
            <Smartphone className="w-7 h-7 text-red-500" />
            <div>
              <h1 className="font-extrabold text-xl text-white">Admin Panel</h1>
              <p className="text-slate-400 text-xs">Gestión de Inventario de Celulares</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs px-4 py-2.5 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario Agregar */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-bold text-white">Publicar Equipo</h2>
            </div>

            <form onSubmit={handleCreatePhone} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Título / Nombre</label>
                <input
                  type="text"
                  placeholder="Ej. Google Pixel 7 Pro 128GB"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Marca</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Google">Google</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Otra">Otra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Estado</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Como nuevo">Como nuevo</option>
                    <option value="Excelente">Excelente</option>
                    <option value="Bueno">Bueno</option>
                    <option value="Detalle estético">Detalle estético</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Precio (MXN)</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="number"
                    placeholder="6500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">URL de la Imagen</label>
                <div className="relative">
                  <ImageIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="url"
                    placeholder="https://..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Descripción corta</label>
                <textarea
                  placeholder="Sin detalles, libre para cualquier compañía, incluye cargador."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 h-20"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 text-sm"
              >
                {loading ? 'Guardando...' : 'Publicar Celular'}
              </button>
            </form>
          </div>

          {/* Inventario */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-red-500" />
              Inventario Registrado ({phones.length})
            </h2>

            {phones.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-500">
                No hay productos registrados en Neon DB.
              </div>
            ) : (
              <div className="space-y-3">
                {phones.map((phone) => (
                  <div
                    key={phone.id}
                    className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4 shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      {phone.imageUrl ? (
                        <img
                          src={phone.imageUrl}
                          alt={phone.title}
                          className="w-16 h-16 object-cover rounded-lg bg-slate-950 border border-slate-800"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center text-slate-600">
                          <Smartphone className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-sm">{phone.title}</h3>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                              phone.available
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}
                          >
                            {phone.available ? 'Disponible' : 'Vendido'}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs mt-0.5">
                          {phone.brand} • ${phone.price.toLocaleString('es-MX')} MXN
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleAvailability(phone.id, phone.available)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        phone.available
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          : 'bg-green-600/20 text-green-400 border border-green-500/30'
                      }`}
                    >
                      {phone.available ? (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-red-400" />
                          Marcar Vendido
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                          Reactivar
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}