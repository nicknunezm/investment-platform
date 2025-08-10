// Generar datos de precios simulados para gráficos
export function generatePriceHistory(currentPrice: number, symbol: string) {
  const data = [];
  const hoursBack = 24;
  
  for (let i = hoursBack; i >= 0; i--) {
    const time = new Date(Date.now() - i * 60 * 60 * 1000);
    
    // Simular variación de precio (±2% random)
    const variation = (Math.random() - 0.5) * 0.04; // ±2%
    const basePrice = currentPrice * (1 - variation);
    
    // Agregar algo de volatilidad realista
    const noise = (Math.random() - 0.5) * 0.01; // ±0.5%
    const price = basePrice * (1 + noise);
    
    data.push({
      time: time.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      price: Math.max(0, price) // Evitar precios negativos
    });
  }
  
  return data;
}

// Determinar color del gráfico según el cambio
export function getChartColor(priceChange: number) {
  return priceChange >= 0 ? '#10B981' : '#EF4444'; // Verde o rojo
}