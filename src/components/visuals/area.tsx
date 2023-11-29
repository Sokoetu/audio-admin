"use client"; 

import { useTheme } from "next-themes"

import { Area, AreaChart as Graph, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis,  } from "recharts"

import { formatLargeNumber } from '@/functions/utils';

export type AreaItem = {
    dataKey: string; 
    fill: string; 
}

interface AreaChartProps {
    data: any[];
    labels: AreaItem[]; 
}

const AreaChart: React.FC<AreaChartProps> = ({
    data, 
    labels}) => {
    const { theme } = useTheme();
    return ( 
        <ResponsiveContainer width='100%' height='100%'>
            <Graph data={data}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis 
                    dataKey={'name'} 
                    stroke={theme === "dark"? "#ffffff": "#000000"}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                /> 
                <YAxis 
                    stroke={theme === "dark"? "#ffffff": "#000000"}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${formatLargeNumber(value)}`}
                />
                <Tooltip 
                    labelStyle={{
                        fontSize: 14, 
                        color: theme === "dark"? "#ffffff": "#000000",
                    }}
                    contentStyle={{
                        fontSize: 12, 
                        color: theme === "dark"? "#ffffff": "#000000",
                        background: theme === "dark" ? "#020817": '#FFFFFF',
                        borderWidth: 0,
                    }}
                    wrapperStyle={{
                        background: theme === "dark" ? "#020817": '#FFFFFF',
                        padding: "0 .4rem",
                        width: 'fit-content',
                        borderRadius: ".4rem"
                    }}
                />
                {
                    labels.map((item, index) => 
                        <Area 
                            key={index}
                            dataKey={item.dataKey} 
                            type="monotone" 
                            fillOpacity={1}
                            fill={item.fill}
                        />    
                     
                    )
                }
            </Graph>
        </ResponsiveContainer>
     );
}
 
export default AreaChart;