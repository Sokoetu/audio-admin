import { Card, CardHeader, CardContent } from "../ui/card";
import  BarChart, { BarItem } from "./bar";
import  AreaChart, { AreaItem } from "./area";

import {Typography} from "@/components"

interface GraphProps {
    title: string; 
    component?: React.ReactNode; 
    data: any[]; 
    type: string; 
    labels: AreaItem[] | BarItem[];
}
 
const Graph: React.FC<GraphProps> = ({title, component, data, type, labels}) => {
    
    return ( 
        <Card className="flex flex-col flex-1">
            <CardHeader 
                className="font-bold flex flex-row items-center justify-between w-100"
            >
                <Typography.H2 
                    title={title}
                />
                {component && <span>{component}</span>}
            </CardHeader>
            <CardContent className='pl-0 flex-1'>
                {   
                    type === 'bar' ? 
                        <BarChart 
                            data={data} 
                            labels={labels} />: 
                        <AreaChart 
                            data={data} 
                            labels={labels} />
                }
            </CardContent>
        </Card>
     );
}
 
export default Graph;