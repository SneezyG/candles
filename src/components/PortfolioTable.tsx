import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockPortfolio, calculatePortfolioStats } from "@/data/mockPortfolio";
import { TrendingUp, TrendingDown } from "lucide-react";

const PortfolioTable = () => {
  const stats = calculatePortfolioStats(mockPortfolio);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Portfolio Holdings</CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold">${stats.totalValue}</div>
            <div className={`flex items-center gap-1 justify-end ${parseFloat(stats.totalPL) >= 0 ? 'text-success' : 'text-danger'}`}>
              {parseFloat(stats.totalPL) >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="text-sm font-medium">
                {parseFloat(stats.totalPL) >= 0 ? '+' : ''}${stats.totalPL} ({stats.totalPLPercent}%)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Shares</TableHead>
              <TableHead>Avg Price</TableHead>
              <TableHead>Current</TableHead>
              <TableHead className="text-right">P/L</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPortfolio.map((holding) => {
              const totalValue = holding.shares * holding.currentPrice;
              const totalCost = holding.shares * holding.avgPrice;
              const pl = totalValue - totalCost;
              const plPercent = ((pl / totalCost) * 100).toFixed(2);
              const isPositive = pl >= 0;

              return (
                <TableRow key={holding.symbol}>
                  <TableCell className="font-semibold">{holding.symbol}</TableCell>
                  <TableCell>{holding.shares}</TableCell>
                  <TableCell className="font-mono">${holding.avgPrice.toFixed(2)}</TableCell>
                  <TableCell className="font-mono">${holding.currentPrice.toFixed(2)}</TableCell>
                  <TableCell className={`text-right font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
                    {isPositive ? '+' : ''}${pl.toFixed(2)} ({plPercent}%)
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PortfolioTable;
