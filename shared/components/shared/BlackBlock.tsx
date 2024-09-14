import { cn } from "@/shared/lib/utils";
import React, { PropsWithChildren, ReactNode } from "react";
import { Title } from "./Title";

interface Props {
    className?: string;
    contentClassName?: string;
    title?: string;
    endAdorment?: ReactNode;
}

export const BlackBlock: React.FC<PropsWithChildren<Props>> = ({
    title,
    endAdorment,
    className,
    contentClassName,
    children
}) => {
    return (
        <div className={cn('bg-black rounded-3xl', className)}>
            {title && (
                <div className="flex items-center justify-between p-5 px-7 border-b border-slate-950">
                    <Title text={title} size="sm" className="font-bold"/>
                    {endAdorment}
                </div>
            )}
            <div className={cn(contentClassName, 'px-7 pb-5')}>{children}</div>
        </div>
    )
}