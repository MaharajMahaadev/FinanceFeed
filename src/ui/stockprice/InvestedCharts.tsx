'use client'

import dynamic from "next/dynamic"
import { Pie } from "recharts";

export default function InvestedCharts(){

    const data1 = [
        { name:"Invested", value:100},
        {name:"Vault", value: 250}
    ];

    const data01 = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 }
      ];

    const data02 = [
        { name: "A1", value: 100 },
        { name: "A2", value: 300 },
        { name: "B1", value: 100 },
        { name: "B2", value: 80 },
        { name: "B3", value: 40 },
        { name: "B4", value: 30 },
        { name: "B5", value: 50 },
        { name: "C1", value: 100 },
        { name: "C2", value: 200 },
        { name: "D1", value: 150 },
        { name: "D2", value: 50 }
      ];

    const PieChart = dynamic(
        () => (
            import("recharts").then(recharts => recharts.PieChart)
        ),
        {
            ssr: false
        }
    );

    return(
        <div className="bg-slate-50 h-96 w-96 z-50">
        <PieChart width={400} height={400}>
            <Pie  dataKey={"value"}
            data={data1}
            cx={200}
            cy={200}
            outerRadius={60}
            fill="#8884d8"
            label
            />
            <Pie  dataKey={"value"}
            data={data02}
            cx={200}
            cy={200}
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
            />
        </PieChart>
        </div>
    )
}