import TickerBar from "@/components/TickerBar";
import CandlestickChart from "@/components/CandlestickChart";
import PortfolioTable from "@/components/PortfolioTable";
import PortfolioPieChart from "@/components/PortfolioPieChart";
import PerformanceLineChart from "@/components/PerformanceLineChart";
import Watchlist from "@/components/Watchlist";
import { TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">MarketPro</h1>
              <p className="text-sm text-muted-foreground">Financial Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      {/* Ticker Bar */}
      <TickerBar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Top Row - Chart & Watchlist */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CandlestickChart />
          </div>
          <div>
            <Watchlist />
          </div>
        </div>

        {/* Portfolio Table */}
        <PortfolioTable />

        {/* Portfolio Allocation */}
        <PortfolioPieChart />

        {/* Portfolio Performance */}
        <PerformanceLineChart />
      </div>
    </div>
  );
};

export default Index;
