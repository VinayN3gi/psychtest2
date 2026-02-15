import { cn } from "@/lib/utils";
import React from "react";


interface MaxWidthWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
    return (
        <div className={cn("mx-auto w-full max-w-screen-xl p-2.5 md:p-10 ", className)}>
            
            {children}
            
            </div>
    );
}