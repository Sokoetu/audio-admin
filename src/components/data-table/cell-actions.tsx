'use client';
import React from "react";
import { useParams, useRouter } from "next/navigation";

import { Edit, MoreHorizontal, Trash, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { UserColumn } from "./columns-example";
 

interface CellActionProps {
    data: UserColumn
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const [loading, setLoading] = React.useState(false); 
    const [openDelete, setOpenDelete] = React.useState(false); 

    const [open, setOpen] = React.useState(false)

    const router = useRouter(); 
    const params = useParams(); 

    const onDelete = async () => {
        setLoading(true) 
         
        setLoading(false)
    }

    return (
        <>
             
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel className='flex items-center justify-between'>
                        Actions
                        <Button variant={`ghost`} size={`icon`}>
                            <X className={`w-4 h-4`}/>
                        </Button>
                    </DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4"/>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}