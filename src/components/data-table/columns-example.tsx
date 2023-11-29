"use client"

import { ColumnDef } from "@tanstack/react-table";

import { Avatar } from "@/components";
// import DeleteUser from "./delete-user";

import { formatDateToString } from "@/functions/utils";

export type UserColumn = {
    id: string; 
    name: string;
    email: string; 
    avatar: string; 
    createdAt: Date; 
    phone: string; 
    role: string; 
    posts: number; 
}

export const columns: ColumnDef<UserColumn>[] = [
    {
        id: "avatar",
        cell: ({ row }) => (
            <Avatar 
                src={row.original.avatar}
                name={row.original.name}
                dimension="w-[50px] h-[50px]"
            />
        )
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "phone",
        header: "Phone"
    },
    {
        accessorKey: "role",
        header: "Role"
    },
    {
        accessorKey: "posts",
        header: "Posts"
    },
    {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => (
            <>{formatDateToString(row.original.createdAt)}</>
        )
    },
    
]