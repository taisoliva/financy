import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    variant: "total" | "income" | "expense";
}

export const SummaryCard = ({ title, value, icon: Icon, variant }: SummaryCardProps) => {
    const variants = {
        total: {
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
        },
        income: {
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
        },
        expense: {
            iconBg: "bg-rose-50",
            iconColor: "text-rose-600",
        },
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", variants[variant].iconBg)}>
                    <Icon className={cn("w-5 h-5", variants[variant].iconColor)} />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {title}
                </span>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">{value}</span>
            </div>
        </div>
    );
};