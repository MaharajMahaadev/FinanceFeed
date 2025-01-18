'use client';

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/card";
import { useEffect, useState } from "react"

type PriceData = {
  c : number,
  p : number,
  s: string,
  t: EpochTimeStamp,
  v: number,
}

type NewPriceData = {
  data: PriceData[],
  type: string,
}

export function RealTimeStock({symbol} : {symbol: string}) {
  const [ priceArr, setPriceArr] = useState<PriceData[]>([]);

    useEffect(() =>{
        const ws = new WebSocket(`wss://ws.finnhub.io?token=${process.env.FINNHUB_KEY}`);

        ws.addEventListener('open', function (event) {
            ws.send(JSON.stringify({'type':'subscribe', 'symbol': symbol}))
        });

        ws.addEventListener('message', function (event) {
            
        });

        
        ws.onmessage = (event) => {
            const eventData: NewPriceData = JSON.parse(event.data);
            eventData.data===undefined?console.log('No'):
            setPriceArr((prevArr) => {
                const newArr = [...prevArr, ...eventData.data];
                return newArr.slice(-5); // Keep the last 5 items
            });
            console.log('Message from server ', eventData.data);
        }

        ws.onopen = () =>{
            console.log("Connected");
        }

        ws.onclose = () =>{
            console.log("Disconnected");
        }

        return () => {
            ws.close();
          };

    }, []);

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Real-Time Trading</h3>
      <div className="space-y-4">
        {priceArr.map((trade, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-border/30 last:border-0 pb-3 last:pb-0 transition-all duration-300"
            style={{
              animation: `fadeIn 0.3s ease-out forwards ${index * 0.1}s`,
              opacity: 0
            }}
          >
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                {trade.t}
              </span>
              <span className="text-sm font-medium">
                {trade.v} volume
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">${trade.p}</span>
              <span className={`flex items-center ${trade.p >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trade.p >= 0 ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
                {Math.abs(trade.p).toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}