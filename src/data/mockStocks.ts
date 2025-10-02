export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface CandleStick {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const mockStocks: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 178.45, change: 2.34, changePercent: 1.33 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 141.80, change: -1.20, changePercent: -0.84 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.91, change: 4.56, changePercent: 1.22 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 151.94, change: -0.87, changePercent: -0.57 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 242.84, change: 8.12, changePercent: 3.46 },
  { symbol: "META", name: "Meta Platforms", price: 484.03, change: 5.67, changePercent: 1.19 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 495.22, change: 12.45, changePercent: 2.58 },
  { symbol: "AMD", name: "Advanced Micro", price: 166.89, change: -2.34, changePercent: -1.38 },
];

// Generate mock candlestick data
export const generateCandlestickData = (days: number = 30): CandleStick[] => {
  const data: CandleStick[] = [];
  let basePrice = 150;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const open = basePrice + (Math.random() - 0.5) * 10;
    const close = open + (Math.random() - 0.5) * 15;
    const high = Math.max(open, close) + Math.random() * 8;
    const low = Math.min(open, close) - Math.random() * 8;
    const volume = Math.floor(Math.random() * 10000000) + 5000000;
    
    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume,
    });
    
    basePrice = close;
  }
  
  return data;
};
