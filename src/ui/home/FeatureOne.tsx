import { ArrowRight, Link } from "lucide-react";
import { Button } from "../components/button";

export default function FeaturesOne(){

const stockData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.52, change: 2.15 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.89, change: 1.75 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91, change: 3.21 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 175.35, change: 2.89 },
    { symbol: 'META', name: 'Meta Platforms', price: 485.92, change: 4.12 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 193.57, change: -1.23 },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 592.13, change: 1.98 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: 5.43 }
  ];

    return(
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                Trade Smarter
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-500">
                  with AI Power
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Experience the future of trading with our AI-powered platform. Real-time analytics, predictive insights, and smart portfolio management.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="rounded-full" asChild>
                  <Link href="/dashboard">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  Watch Demo
                </Button>
              </div>
            <div
              className="relative"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-2xl blur opacity-30 animate-pulse" />
                <div className="glass-card rounded-2xl p-6 relative">
                  <div className="grid grid-cols-2 gap-4">
                    {stockData.slice(0, 4).map((stock) => (
                      <div
                        key={stock.symbol}
                        className="p-4 rounded-xl bg-background/50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{stock.symbol}</span>
                          <span className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change}%
                          </span>
                        </div>
                        <div className="text-2xl font-bold">${stock.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
}