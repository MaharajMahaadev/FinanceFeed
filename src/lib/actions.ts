'use server'

type PriceData = {
    v: number;
    vw: number;
    o: number;
    c: number;
    h: number;
    l: number;
    t: number;
    n: number;
  };
  
interface ChartData {
  price: number,
  date: string,
}

export async function fetchChartInfo(symbol:string, chartMode:string){
    try{
            var rangeStr: string = '';
            var currDate = new Date();
            currDate.setDate(currDate.getDate() - 3);
            var endDate = new Date();
            endDate.setDate(endDate.getDate() - 3);
            console.log(currDate, endDate);

            if(chartMode === 'day'){
              rangeStr = 'hour'
            }
            else if(chartMode === 'week'){
              rangeStr = 'hour'
              endDate.setDate(endDate.getDate() - 4);
            }
            else if(chartMode === 'month'){
              rangeStr = 'day'
              endDate.setMonth(endDate.getMonth() - 1);
            }
            else if(chartMode === 'year'){
              rangeStr = 'week'
              endDate.setFullYear(endDate.getFullYear() - 1);
            }

            console.log(rangeStr, endDate.toDateString());

            const toDate = currDate.getFullYear() + '-' + ((currDate.getMonth()+1)<10?'0':'') + (currDate.getMonth()+1) + '-' + (currDate.getDate()<10?'0':'') + currDate.getDate();
            const fromDate = endDate.getFullYear() + '-' + ((endDate.getMonth()+1)<10?'0':'') + (endDate.getMonth()+1) + '-' + (endDate.getDate()<10?'0':'') + endDate.getDate();
            console.log(fromDate, toDate);
            const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/${rangeStr}/${fromDate}/${toDate}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_KEY}`);
            const res = await response.json();

            var xIndices: number = 0;

            if(chartMode === 'day'){
              xIndices = Math.ceil(12/res.resultsCount);
            }
            else if(chartMode === 'week'){
              xIndices = Math.ceil(40/res.resultsCount);       
            }
            else if(chartMode === 'month'){
              xIndices = Math.floor(720/res.resultsCount);
            }
            else if(chartMode === 'year'){
              xIndices = Math.floor(364/res.resultsCount);
            }
            
            endDate.setHours(10);
            endDate.setMinutes(0);
            xIndices === 0 ? xIndices = 1 : xIndices = xIndices;

            const dataVal: ChartData[] = [];
            res.results.map((item: PriceData) => {
                if(chartMode === 'day'){
                  dataVal.push({price: item.c, date: endDate.toLocaleTimeString('IN')});
                  endDate.setHours(endDate.getHours() + xIndices);
                }
                else if(chartMode === 'week' || chartMode === 'month'){
                  dataVal.push({price: item.c, date: endDate.toLocaleDateString('IN')});
                  endDate.setHours(endDate.getHours() + xIndices);
                }
                else if(chartMode === 'year'){
                  dataVal.push({price: item.c, date: endDate.toLocaleDateString('IN')});
                  endDate.setDate(endDate.getDate() + xIndices);
                }
                console.log(item.c, endDate.toString());
            })
            
            return dataVal;
        }
        catch(err){
            console.log(err);
        }
}

type SuggDataValues = {
  name:string;
  amount: number;
}

type SuggData = {
  date: string;
  values: SuggDataValues[];
}

type SuggInfoFetched = {
  buy: number;
  hold: number;
  period: string;
  sell: number;
  strongBuy: number;
  strongSell: number;
  symbol: string;
}

export async function fetchSuggInfo(symbol:string){
  try{
    const res = await fetch(`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${process.env.FINNHUB_KEY}`)
    const data = await res.json();

    const suggData:SuggData[] = [];
    
    data.map((info:SuggInfoFetched) => {
        suggData.push({date:info.period, values: [
          {name:"Strong Buy", amount:info.strongBuy},
          {name:"Buy", amount:info.buy},
          {name:"Hold", amount:info.hold},
          {name:"Sell", amount:info.sell},
          {name:"Strong Sell", amount:info.strongSell}
        ]})
      })


    return suggData
  }
  catch(err){
    console.log(err);
    throw new Error('Failed');
  }
}