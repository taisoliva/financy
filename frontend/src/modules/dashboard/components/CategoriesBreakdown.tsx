import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

interface CategoryStat {
  id: string;
  title: string;
  itemCount: number;
  totalValue: number;
  color?: string;
}

interface CategoriesBreakdownProps {
  categories: CategoryStat[];
}

const PILL_COLORS = [
  "bg-blue-100 text-blue-800",
  "bg-purple-100 text-purple-800",
  "bg-amber-100 text-amber-800",
  "bg-pink-100 text-pink-800",
  "bg-yellow-100 text-yellow-800",
  "bg-emerald-100 text-emerald-800",
] as const;

const formatCurrency = (valueInCents: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueInCents / 100);

export const CategoriesBreakdown = ({ categories }: CategoriesBreakdownProps) => {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col h-full">
      <div className="p-6 flex items-center justify-between border-b border-border">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Categorias
        </h3>
        <Link
          to="/categories"
          className="text-brand-base text-xs font-semibold hover:underline flex items-center gap-0.5"
        >
          Gerenciar <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="p-4 flex-1 space-y-4">
        {categories.length > 0 ? (
          categories.map((category, index) => {
            const isHex = category.color?.startsWith("#");
            const pillClass = isHex
              ? undefined
              : PILL_COLORS[index % PILL_COLORS.length];
            return (
              <div
                key={category.id}
                className="flex items-center justify-between gap-4"
              >
                <span
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold shrink-0",
                    pillClass
                  )}
                  style={
                    isHex && category.color
                      ? {
                          backgroundColor: `${category.color}20`,
                          color: category.color,
                        }
                      : undefined
                  }
                >
                  {category.title}
                </span>

                <div className="flex items-center gap-6 min-w-0">
                  <span className="text-xs text-muted-foreground font-medium shrink-0">
                    {category.itemCount} itens
                  </span>
                  <span className="text-sm font-semibold text-foreground tabular-nums text-right min-w-[100px]">
                    {formatCurrency(category.totalValue)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center text-muted-foreground italic text-sm">
            Nenhuma categoria encontrada.
          </div>
        )}
      </div>
    </div>
  );
};
