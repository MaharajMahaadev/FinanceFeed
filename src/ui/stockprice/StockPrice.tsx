import {  DollarSign, ArrowLeftToLine, ChevronsUp, ChevronsDown, Replace, SquarePercent, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/card";

type StockPrice = {
  c: number,
  h: number,
  l: number,
  o: number,
  d: number,
  dp: number,
  pc: number,
  t: EpochTimeStamp,
}

async function getPrice(symbol:string) {
  try{
    const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_KEY}`);
    const quoteData:StockPrice = await res.json();

    return quoteData;
  }
  catch(err){
    console.log('Failed to fetch Stock Price: ' + err);
    throw new Error('Failed to fetch Stock Price');
  }
}

export async function StockPrice({symbol}: {symbol: string}) {

  const quoteData:StockPrice = await getPrice(symbol);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Stock Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Current Price</span>
            </div>
            <p className="text-2xl font-bold">${quoteData?.c}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ArrowLeftToLine className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Previous Close</span>
            </div>
            <p className="text-2xl font-bold">${quoteData?.pc}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ChevronsUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">High</span>
            </div>
            <p className="text-2xl font-bold">${quoteData?.h}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ChevronsDown className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Low</span>
            </div>
            <p className="text-2xl font-bold">${quoteData?.l}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Replace className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Change</span>
            </div>
            <p className="text-2xl font-bold">${quoteData?.d}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <SquarePercent className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Percentage Change</span>
            </div>
            <p className="text-2xl font-bold">{quoteData?.dp}%</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Last Updated</span>
            </div>
            <p className="text-2xl font-bold">{quoteData?.t.toLocaleString("in")}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Day Range</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">${quoteData?.l}</span>
              <div className="w-24 h-1 bg-gray-200 rounded">
                <div className="w-2/3 h-full bg-blue-500 rounded"></div>
              </div>
              <span className="text-sm font-medium">${quoteData?.h}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}