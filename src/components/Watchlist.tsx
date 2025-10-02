import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockStocks } from "@/data/mockStocks";
import { TrendingUp, TrendingDown, Star } from "lucide-react";
import { useState } from "react";

const Watchlist = () => {
  const [watchlist] = useState(mockStocks.slice(0, 5));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-primary text-primary" />
          Watchlist
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {watchlist.map((stock) => {
          const isPositive = stock.change >= 0;
          return (
            <div key={stock.symbol} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <div>
                <div className="font-semibold">{stock.symbol}</div>
                <div className="text-sm text-muted-foreground">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-semibold">${stock.price.toFixed(2)}</div>
                <div className={`flex items-center gap-1 justify-end text-sm ${isPositive ? 'text-success' : 'text-danger'}`}>
                  {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
        <Button variant="outline" className="w-full">
          Add to Watchlist
        </Button>
      </CardContent>
    </Card>
  );
};

export default Watchlist;
