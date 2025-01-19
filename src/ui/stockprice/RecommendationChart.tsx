'use client';

import { useEffect, useState } from "react"
import dynamic from "next/dynamic";
import {  Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { fetchSuggInfo } from "@/lib/actions";

type SuggDataValues = {
  name:string;
  amount: number;
}

type SuggData = {
  date: string;
  values: SuggDataValues[];
}

const COLORS = ["#28b463", "#58d68d ", "#FFBB28", "#e74c3c"];

const renderLabel = (data:{name:string, amount:number}) => {
  return data.name;
}

export function RecommendationChart({symbol} : {symbol: string}) {
  const [ data, setData ] = useState<SuggData[]>([]);
  const [ period, setPeriod ] = useState(0);
  
  const fetchData = async () => {
          try{ 
              const res = await fetchSuggInfo(symbol)
              setData(res || []);
              console.log(res);
          }
          catch(err){
              console.log(err);
          }
      }

    useEffect(() => {
      fetchData();
    }, []);

    const changeVal = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setPeriod(Number(event.target.value));
    }

  const PieChart = dynamic(
        () => (
            import("recharts").then(recharts => recharts.PieChart)
        ), 
        { 
            ssr: false 
        }
    );

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Analyst Recommendation Trends</h3>
      <div className="space-y-4">
        <select className="z-10 inline-flex" onChange={changeVal}>
          {
            data.map((val, index) =>
              <option key={index} value={index}>{val.date}</option>
            )
          }
        </select>
        <div className="w-full h-[40vh]">
      <ResponsiveContainer width="100%" height="100%">
      <PieChart>
      <Pie
        data={data[period]?.values}
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={80}
        fill="#c0392b"
        paddingAngle={5}
        dataKey="amount"
        label={renderLabel}
      >
        
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
    </ResponsiveContainer>
    </div>
      </div>
    </div>
  );
}