import { useEffect, useState } from "react";
import { mockStocks, type Stock } from "@/data/mockStocks";
import { TrendingUp, TrendingDown } from "lucide-react";

const TickerBar = () => {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 2,
          change: stock.change + (Math.random() - 0.5) * 0.5,
          changePercent: stock.changePercent + (Math.random() - 0.5) * 0.2,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tickerItems = [...stocks, ...stocks];

  return (
    <div className="w-full bg-secondary border-b border-border overflow-hidden">
      <div className="flex animate-ticker hover:animation-pause">
        {tickerItems.map((stock, index) => {
          const isPositive = stock.change >= 0;
          return (
            <div
              key={`${stock.symbol}-${index}`}
              className="flex items-center gap-3 px-6 py-3 whitespace-nowrap border-r border-border/50"
            >
              <span className="font-semibold text-foreground">{stock.symbol}</span>
              <span className="font-mono text-lg">${stock.price.toFixed(2)}</span>
              <div className={`flex items-center gap-1 ${isPositive ? 'text-success' : 'text-danger'}`}>
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span className="text-sm font-medium">
                  {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TickerBar;
