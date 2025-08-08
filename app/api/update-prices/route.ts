import { NextResponse } from 'next/server';
import { getStockData } from '@/lib/yahoo-finance';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const symbols = [
  // Tech stocks
  'AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA', 'META', 'AMZN',
  // ETFs
  'SPY', 'QQQ', 'VTI', 'IVV', 'VEA', 'VWO', 'MTUM',
  // Traditional stocks  
  'JPM', 'JNJ', 'PG',
  // Crypto
  'BTC-USD', 'ETH-USD'
];
    const stockData = await getStockData(symbols);
    
    // Actualizar cada instrumento en la base de datos
    for (const stock of stockData) {
      await supabase
        .from('instruments')
        .update({
          name: stock.name,
          current_price: stock.price,
          price_change: stock.change,
          price_change_percent: stock.changePercent,
          volume: stock.volume,
          market_cap: stock.marketCap,
          updated_at: new Date().toISOString()
        })
        .eq('symbol', stock.symbol);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Prices updated successfully',
      data: stockData 
    });
  } catch (error) {
    console.error('Error updating prices:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update prices' },
      { status: 500 }
    );
  }
}