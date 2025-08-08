'use client'
import { supabase } from '@/lib/supabase'
import AuthButton from '@/components/auth/AuthButton'
import { useState, useEffect } from 'react'

interface Instrument {
  id: number;
  symbol: string;
  name: string;
  current_price: number;
  price_change: number;
  price_change_percent: number;
  updated_at: string;
}

export default function Home() {
  const [instruments, setInstruments] = useState<Instrument[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  async function loadInstruments() {
    const { data } = await supabase
      .from('instruments')
      .select('*')
      .limit(15)
    
    setInstruments(data || [])
    setLoading(false)
  }

  async function updatePrices() {
    setUpdating(true)
    try {
      const response = await fetch('/api/update-prices')
      if (response.ok) {
        await loadInstruments() // Recargar datos
      }
    } catch (error) {
      console.error('Error updating prices:', error)
    }
    setUpdating(false)
  }

  useEffect(() => {
    loadInstruments()
  }, [])

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl">Cargando...</div>
    </div>
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plataforma de Inversiones
          </h1>
          <p className="text-xl text-gray-800 mb-8">
            Señales de inversión inteligentes para tu cartera de largo plazo
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Instrumentos Destacados</h2>
              <button
                onClick={updatePrices}
                disabled={updating}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {updating ? 'Actualizando...' : 'Actualizar Precios'}
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Símbolo</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Nombre</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Precio</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Cambio</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">%</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actualizado</th>
                  </tr>
                </thead>
                <tbody>
                  {instruments.map((instrument) => (
                    <tr key={instrument.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
  <div className="flex items-center gap-2">
    <span className="font-semibold">{instrument.symbol}</span>
    <span className={`px-2 py-1 text-xs rounded-full ${
      instrument.type === 'stock' ? 'bg-blue-100 text-blue-800' :
      instrument.type === 'etf' ? 'bg-green-100 text-green-800' :
      'bg-purple-100 text-purple-800'
    }`}>
      {instrument.type.toUpperCase()}
    </span>
  </div>
</td>
                      <td className="py-3 px-4">{instrument.name}</td>
                      <td className="py-3 px-4">${instrument.current_price?.toFixed(2)}</td>
                      <td className={`py-3 px-4 ${instrument.price_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${instrument.price_change?.toFixed(2)}
                      </td>
                      <td className={`py-3 px-4 ${instrument.price_change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {instrument.price_change_percent?.toFixed(2)}%
                      </td>
                      <td className="py-3 px-4 text-gray-800 text-sm font-medium">
                        {new Date(instrument.updated_at).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-blue-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h3>
            <p className="mb-6">Regístrate gratis y accede a señales de inversión profesionales</p>
            <AuthButton />
          </div>
        </div>
      </div>
    </main>
  )
}