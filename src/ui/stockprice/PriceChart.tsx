'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/card";
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchChartInfo } from "@/lib/actions";

interface ChartData {
  price: number,
  date: string,
}

export function PriceChart({symbol}: {symbol: string}) {
  const [ data, setData] = useState<ChartData[]>([]);
    const [ chartMode, setChartMode] = useState<string>('day');

    const fetchData = async () => {
        try{ 
            const res = await fetchChartInfo(symbol, chartMode);
            setData(res || []);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() =>{
        var temp = new Date();
        temp.setMonth(temp.getMonth() - 1);       
        console.log(temp.toLocaleDateString('IN'));
        console.log(temp.toLocaleTimeString('IN'))
        console.log(temp.setMinutes(temp.getMinutes() + 30));
        console.log(temp.toLocaleTimeString('IN'))
    }, []);

    useEffect(() =>{
      fetchData();
    }, [chartMode, symbol]);


    const LineChart = dynamic(
        () => (
            import("recharts").then(recharts => recharts.LineChart)
        ), 
        { 
            ssr: false 
        }
    );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-medium">Price History</CardTitle>
        <div className="flex space-x-2">
          {(['day', 'week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setChartMode(range)}
              className={`px-2 py-1 text-xs rounded-md transition-colors
                ${chartMode === range 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'}`}
            >
              {range}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                domain={["auto", "auto"]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}