import { Card, CardContent, CardHeader, CardTitle } from "./components/card";

function StockPriceElement(){
    return(
        <div className="space-y-2 w-full">
            <div className="flex h-4 w-full items-center space-x-2 bg-slate-300 animate-pulse">
            </div>
            <p className="bg-slate-300 animate-pulse h-10"></p>
          </div>
    )
}


export function StockPriceSkeleton(){
    return(
        <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Stock Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <StockPriceElement />    
          <StockPriceElement /> 
          <StockPriceElement /> 
          <StockPriceElement /> 
          <StockPriceElement /> 
          <StockPriceElement /> 
        </div>
        <div className="space-y-2">
            <div className="flex items-center mt-3 space-x-2 bg-slate-300 animate-pulse h-4">
            </div>
            <p className="bg-slate-300 animate-pulse h-10"></p>
          </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Day Range</span>
            <div className="h-5 w-4/6 space-x-2 bg-slate-300 animate-pulse">
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    )
}

function StockInfoElements(){
    return(
        <div className="flex items-center space-x-2 bg-slate-300 animate-pulse h-10">
        </div>
    )
}

export function StockInfoSkeleton(){
    return(
        <Card className="w-full">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <div className="relative h-12 w-12 bg-slate-300 animate-pulse"></div>
        <div className="relative h-10 w-3/6 bg-slate-300 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-8">
          <div className="grid grid-cols-2 gap-4">
            <StockInfoElements />
            <StockInfoElements />
            <StockInfoElements />
            <StockInfoElements />
            <StockInfoElements />
            <StockInfoElements />
          </div>
        </div>
      </CardContent>
    </Card>
    )
}