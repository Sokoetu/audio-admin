// for toggling the theme 
"use client";
import React from "react";

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react";

import { Button } from "../ui/button";
import { useCustomEffect } from "@/hooks";

export default function ThemeToggle () {
    const { theme, setTheme } = useTheme(); 
    const [mounted, setMounted] = React.useState(false)

    useCustomEffect(() => {setMounted(true)}, []); 

    if (!mounted) return (
        <Button variant="ghost" size="icon">
             <Sun  />
        </Button>
    ); 
    return (
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark": "light")}>
            {(theme === "light") ? <Moon  />: <Sun  />}
        </Button>
    )
}