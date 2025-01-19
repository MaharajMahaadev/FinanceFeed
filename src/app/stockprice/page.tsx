import { RecommendationChart } from "@/ui/stockprice/RecommendationChart";
import { StockInfo } from "@/ui/stockprice/StockInfo";
import { StockPrice } from "@/ui/stockprice/StockPrice";
import { PriceChart } from "@/ui/stockprice/PriceChart";
import { Button } from "@/ui/components/button";

export default async function Page(props: {
  searchParams?: Promise<{
      symbol?: string;
  }>;
}) {
    const searchParams = await props.searchParams;
    const symbol = searchParams?.symbol || '';

  return (
    <div className="min-h-screen">
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            {symbol} Stock Dashboard
          </h1>
        </div>
        
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 fade-in h-fit">
            <div className="glass-card hover-lift rounded-xl h-full">
              <StockPrice
                symbol={symbol}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 fade-in h-fit" >
            <div className="glass-card hover-lift rounded-xl h-full">
              <PriceChart symbol={symbol}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 fade-in h-fit">
            <div className="glass-card hover-lift rounded-xl h-full">
              <StockInfo
                symbol={symbol}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 fade-in h-fit">
            <div className="glass-card hover-lift rounded-xl h-full">
              <RecommendationChart symbol={symbol} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}