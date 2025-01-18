'use client'

import { useState } from 'react';
import { stockinfo } from '@/lib/stockinfo'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

type StockInfo = {
    companyName: string;
    symbol: string;
}

export default function SearchBar(){
    const [ currStockName, setCurrStockName] = useState<string>('');
    const [ suggestions, setSuggestion ] = useState<StockInfo[]>([]);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace} = useRouter();

    function searchTerm(val: string){
        const matchedItems: StockInfo[] = [];

        setCurrStockName(val);

        if(val.length>0){
            stockinfo.forEach(element => {
                const matchedItem = element.companyName.toLowerCase().startsWith(val.toLowerCase());

                if(matchedItem){
                    matchedItems.push(element);
                }
            });

            setSuggestion(matchedItems);
        }
        else{
            setSuggestion([]);
        }
    }

    const handleSearch = (symbol: string, companyName: string) => {
        const params = new URLSearchParams(searchParams);
        if(symbol){
            params.set('symbol', symbol);
        }
        else{
            params.delete('symbol');
        }

        if(pathname.includes('/stockprice')){
            replace(`${pathname}?${params.toString()}`);
        }
        else{   
            replace(`${pathname}stockprice?${params.toString()}`);
        }

        setSuggestion([]);
        setCurrStockName(companyName);
    }

    return(
        
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input onClick={() => setCurrStockName('')} value={currStockName} onChange={(e) => searchTerm(e.target.value)} type="text" placeholder="Search stocks..." className="relative pl-9 h-9 w-64 rounded-full bg-muted/50 px-4 text-sm" />
            {
                suggestions.length>0 && (
                <ul className='absolute top-10 text-muted-foreground bg-background rounded-xl w-auto max-h-[70vh] h-fit overflow-auto'>{
                    suggestions.map((state) => 
                        <li className='cursor-pointer hover:bg-secondary duration-300 active:bg-accent active:duration-0' onClick={() => handleSearch(state.symbol, state.companyName)} key={state.symbol}>{state.companyName}</li>
                    )
                }</ul>
            )}
        </div>
    )
}