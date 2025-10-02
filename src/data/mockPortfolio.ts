export interface PortfolioHolding {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
}

export interface PortfolioPerformance {
  date: string;
  value: number;
}

export const mockPortfolio: PortfolioHolding[] = [
  { symbol: "AAPL", name: "Apple Inc.", shares: 50, avgPrice: 165.00, currentPrice: 178.45 },
  { symbol: "MSFT", name: "Microsoft Corp.", shares: 30, avgPrice: 350.00, currentPrice: 378.91 },
  { symbol: "GOOGL", name: "Alphabet Inc.", shares: 25, avgPrice: 145.00, currentPrice: 141.80 },
  { symbol: "NVDA", name: "NVIDIA Corp.", shares: 20, avgPrice: 450.00, currentPrice: 495.22 },
  { symbol: "TSLA", name: "Tesla Inc.", shares: 15, avgPrice: 220.00, currentPrice: 242.84 },
];

export const generatePortfolioPerformance = (days: number = 90): PortfolioPerformance[] => {
  const data: PortfolioPerformance[] = [];
  let baseValue = 50000;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const change = (Math.random() - 0.48) * 1000; // Slight upward bias
    baseValue += change;
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(baseValue.toFixed(2)),
    });
  }
  
  return data;
};

export const calculatePortfolioStats = (holdings: PortfolioHolding[]) => {
  let totalValue = 0;
  let totalCost = 0;
  
  holdings.forEach(holding => {
    totalValue += holding.shares * holding.currentPrice;
    totalCost += holding.shares * holding.avgPrice;
  });
  
  const totalPL = totalValue - totalCost;
  const totalPLPercent = ((totalPL / totalCost) * 100).toFixed(2);
  
  return {
    totalValue: totalValue.toFixed(2),
    totalCost: totalCost.toFixed(2),
    totalPL: totalPL.toFixed(2),
    totalPLPercent,
  };
};
