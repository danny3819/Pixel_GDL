'use client';

import { useState } from 'react';
import { getWhatsAppQuoteLink } from '@/lib/whatsapp';
import { Wrench, Send } from 'lucide-react';

export default function QuoteWidget() {
  const [brand, setBrand] = useState('Apple / iPhone');
  const [model, setModel] = useState('');
  const [issue, setIssue] = useState('Cambio de Pantalla / Display');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim()) {
      alert('Por favor escribe el modelo de tu teléfono.');
      return;
    }
    const link = getWhatsAppQuoteLink(brand, model, issue);
    window.open(link, '_blank');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-4 text-blue-600">
        <Wrench className="w-7 h-7" />
        <h2 className="text-xl font-bold text-gray-800">Cotiza tu reparación al instante</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marca del celular</label>
          <select 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
          >
            <option value="Apple / iPhone">Apple / iPhone</option>
            <option value="Samsung">Samsung</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Motorola">Motorola</option>
            <option value="OPPO / Vivo / Realme">OPPO / Vivo / Realme</option>
            <option value="Otra marca">Otra marca</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Modelo exacto</label>
          <input 
            type="text" 
            placeholder="Ejemplo: iPhone 12, Redmi Note 11" 
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Falla o Servicio necesario</label>
          <select 
            value={issue} 
            onChange={(e) => setIssue(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
          >
            <option value="Cambio de Pantalla / Display">Cambio de Display / Pantalla</option>
            <option value="Cambio de Batería">Cambio de Batería</option>
            <option value="Centro de Carga">Centro de Carga / No carga</option>
            <option value="Tapa trasera">Tapa trasera / Cristal</option>
            <option value="Mantenimiento por agua">Mantenimiento por mojado</option>
            <option value="Software / Liberación / Desbloqueo">Software / Liberación / Desbloqueo</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-green-500/20"
        >
          <Send className="w-5 h-5" />
          Enviar Cotización a WhatsApp
        </button>
      </form>
    </div>
  );
}
