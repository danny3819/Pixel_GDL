'use client'

import { useState } from 'react'
import { Wrench, Send } from 'lucide-react'

export default function RepairQuote() {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [issue, setIssue] = useState('')

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!brand || !model || !issue) return

    const phoneWhatsApp = '523300000000' // Sustituye con tu número real de WhatsApp
    const message = `Hola Pixel Center GDL, me gustaría cotizar una reparación:%0A%0A• *Marca:* ${brand}%0A• *Modelo:* ${model}%0A• *Falla:* ${issue}`
    
    window.open(`https://wa.me/${phoneWhatsApp}?text=${message}`, '_blank')
  }

  return (
    <section className="bg-slate-800 text-white p-6 rounded-2xl shadow-xl max-w-xl mx-auto my-8">
      <div className="flex items-center gap-3 mb-4">
        <Wrench className="w-6 h-6 text-red-500" />
        <h2 className="text-xl font-bold">Cotiza tu Reparación</h2>
      </div>
      <form onSubmit={handleWhatsApp} className="space-y-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Marca del equipo</label>
          <input
            type="text"
            placeholder="Ej. Google Pixel, Samsung, iPhone"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Modelo exacto</label>
          <input
            type="text"
            placeholder="Ej. Pixel 7 Pro, Galaxy S23"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Detalle o falla</label>
          <textarea
            placeholder="Ej. Pantalla estrellada, cambio de batería, centro de carga"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500 h-24"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          <Send className="w-4 h-4" />
          Enviar a WhatsApp
        </button>
      </form>
    </section>
  )
}
