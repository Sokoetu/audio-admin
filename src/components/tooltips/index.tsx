"use client"; 
import React from "react"; 

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; 
import { useCustomEffect } from "@/hooks";

interface ToolTipProps {
    children: React.ReactNode;
    tip: string; 
}

const ToolTipProvider: React.FC<ToolTipProps> = ({children, tip}) => {
    const [mounted, setMounted] = React.useState<boolean>(false); 
    useCustomEffect(() => setMounted(true), [])
    if (!mounted) return null
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <span className="capitalize">{tip}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ToolTipProvider; 