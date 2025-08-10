'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface PriceData {
  time: string;
  price: number;
}

interface PriceChartProps {
  data: PriceData[];
  symbol: string;
  color: string;
}

export default function PriceChart({ data, symbol, color }: PriceChartProps) {
  return (
    <div className="w-full h-64 bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{symbol} - Últimas 24 horas</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="time" 
            stroke="#666"
            fontSize={12}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <Tooltip 
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Precio']}
            labelStyle={{ color: '#333' }}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}