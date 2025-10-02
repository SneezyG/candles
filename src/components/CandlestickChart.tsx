import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Line } from "recharts";
import { generateCandlestickData } from "@/data/mockStocks";

type TimeRange = "1D" | "1W" | "1M" | "6M" | "1Y";

const timeRangeDays: Record<TimeRange, number> = {
  "1D": 1,
  "1W": 7,
  "1M": 30,
  "6M": 180,
  "1Y": 365,
};

const CandlestickChart = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("1M");
  
  const chartData = useMemo(() => {
    return generateCandlestickData(timeRangeDays[selectedRange]);
  }, [selectedRange]);

  const CustomCandlestick = (props: any) => {
    const { x, width, payload, yAxisMap, dataPointFormatter } = props;
    
    if (!payload || !yAxisMap) return null;
    
    const yAxis = yAxisMap[Object.keys(yAxisMap)[0]];
    const { scale } = yAxis;
    
    const isPositive = payload.close >= payload.open;
    const color = isPositive ? "hsl(var(--success))" : "hsl(var(--danger))";
    
    // Scale the values to pixel positions
    const highY = scale(payload.high);
    const lowY = scale(payload.low);
    const openY = scale(payload.open);
    const closeY = scale(payload.close);
    
    const bodyTop = Math.min(openY, closeY);
    const bodyBottom = Math.max(openY, closeY);
    const bodyHeight = Math.abs(closeY - openY) || 1;
    
    return (
      <g>
        {/* Wick line */}
        <line
          x1={x + width / 2}
          y1={highY}
          x2={x + width / 2}
          y2={lowY}
          stroke={color}
          strokeWidth={1}
        />
        {/* Body */}
        <rect
          x={x + 1}
          y={bodyTop}
          width={Math.max(width - 2, 2)}
          height={bodyHeight}
          fill={color}
          stroke={color}
        />
      </g>
    );
  };

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AAPL - Apple Inc.</CardTitle>
          <div className="flex gap-2">
            {(Object.keys(timeRangeDays) as TimeRange[]).map((range) => (
              <Button
                key={range}
                variant={selectedRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRange(range)}
                className="h-8 px-3"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={chartData}>
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Bar
              dataKey="high"
              fill="transparent"
              shape={(props: any) => <CustomCandlestick {...props} />}
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CandlestickChart;
