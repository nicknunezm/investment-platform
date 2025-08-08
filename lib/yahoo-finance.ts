import yahooFinance from 'yahoo-finance2';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
}

export async function getStockData(symbols: string[]): Promise<StockData[]> {
  try {
    const quotes = await yahooFinance.quote(symbols);
    
    return symbols.map(symbol => {
      const quote = Array.isArray(quotes) ? quotes.find(q => q.symbol === symbol) : quotes;
      
      if (!quote) {
        throw new Error(`No data found for ${symbol}`);
      }

      return {
        symbol: quote.symbol || symbol,
        name: quote.longName || quote.shortName || symbol,
        price: quote.regularMarketPrice || 0,
        change: quote.regularMarketChange || 0,
        changePercent: quote.regularMarketChangePercent || 0,
        volume: quote.regularMarketVolume || 0,
        marketCap: quote.marketCap || 0,
      };
    });
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
}

export async function updateInstrumentPrices() {
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
    
    // Aquí luego actualizaremos la base de datos
    console.log('Stock data fetched:', stockData);
    return stockData;
  } catch (error) {
    console.error('Error updating prices:', error);
    return [];
  }
}