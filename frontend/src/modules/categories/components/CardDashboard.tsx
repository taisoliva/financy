import type { LucideIcon } from 'lucide-react';

interface CardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const CardDashboard = ({ icon: Icon, title, description }: CardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4 w-full">
      <div className="w-[10%] flex shrink-0 justify-center mb-5">
        <div className="flex items-center justify-center">
          <Icon className="w-6 h-6 text-brand-base" />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <p className="text-4xl font-bold leading-tight">{title}</p>
        <p className="text-muted-foreground text-sm font-medium">{description}</p>
      </div>
    </div>
  );
};