"use client"
import { useTheme } from "next-themes"
import { Bar, BarChart as Graph,  ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { formatLargeNumber } from '@/functions/utils';

export type BarItem = {
    dataKey: string; 
    fill: string; 
}

interface BarChartProps {
    data: any[];
    labels: BarItem[]; 
};
 
const BarChart: React.FC<BarChartProps> = ({
    data, labels
  }) => {
    const { theme } = useTheme();
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <Graph data={data}>
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
                {
                    labels.map((item, index) => 
                        <Bar 
                            key={index}
                            dataKey={item.dataKey} 
                            fill={item.fill} 
                            radius={[4, 4, 0, 0]} 
                        />     
                    )
                }
            </Graph>
        </ResponsiveContainer>
    )
};

export default BarChart; 