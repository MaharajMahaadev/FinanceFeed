import { Globe, Building2, Users2, Flag, Banknote, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/card";
import Image from "next/image";

interface StockInfoProps {
  country: string;
  currency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  name: string;
  weburl: string;
}

async function getInfo(symbol:string){
  try{
    const res = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.FINNHUB_KEY}`);
    const stockInfo = await res.json();

    return stockInfo;
  }
  catch(err){
    console.log('Failed to fetch Stock Information: ' + err);
    throw new Error('Failed to fetch Stock Information')
  }
}

export async function StockInfo({symbol} : {symbol:string}) {

  const companyInfo:StockInfoProps = await getInfo(symbol);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <div className="relative h-12 w-12">
          <Image
            src={companyInfo?.logo || '/favicon.ico'}
            alt={`${companyInfo?.name} logo`}
            fill
            className="rounded-lg object-contain"
          />
        </div>
        <CardTitle>{companyInfo?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a href={companyInfo?.weburl} target="_blank" rel="noopener noreferrer" 
                 className="text-sm text-blue-500 hover:underline">
                Website
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{companyInfo?.finnhubIndustry}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{companyInfo?.country}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Banknote className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{companyInfo?.currency}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{companyInfo?.ipo}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{companyInfo?.exchange}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}