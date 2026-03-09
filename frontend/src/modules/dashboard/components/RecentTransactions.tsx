import { CircleArrowDown, CircleArrowUp, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import {
  getTransactionCategoryPillClass,
  getTransactionIcon,
  getTransactionIconContainerClass,
} from "@/lib/transaction-display";
import { cn } from "@/lib/utils";

interface TransactionItem {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: string;
  categoryId: string;
  category?: {
    id: string;
    title: string;
    icon?: string;
    color?: string;
  } | null;
}

interface RecentTransactionsProps {
  transactions: TransactionItem[];
}

const formatCurrency = (valueInCents: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueInCents / 100);

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

const RECENT_LIMIT = 5;

export const RecentTransactions = ({
  transactions,
}: RecentTransactionsProps) => {
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, RECENT_LIMIT);

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 flex items-center justify-between border-b border-border">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Transações recentes
        </h3>
        <Link
          to="/transactions"
          className="text-brand-base text-xs font-semibold hover:underline flex items-center gap-0.5"
        >
          Ver todas <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="divide-y divide-border">
        {recentTransactions.length > 0 ? (
          recentTransactions.map((transaction) => {
            const Icon = getTransactionIcon(transaction);
            const isIncome = transaction.type === "INCOME";
            return (
              <div
                key={transaction.id}
                className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors"
              >
                <div
                  className={cn(
                    "p-2 rounded-lg shrink-0",
                    getTransactionIconContainerClass(transaction),
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction.date)}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-semibold",
                      getTransactionCategoryPillClass(transaction),
                    )}
                  >
                    {transaction.category?.title ?? "Sem categoria"}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-foreground">
                    {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
                  </span>
                  {isIncome ? (
                    <span className="flex h-6 w-6 items-center justify-center">
                      <CircleArrowUp className="h-3.5 w-3.5 text-emerald-600" />
                    </span>
                  ) : (
                    <span className="flex h-6 w-6 items-center justify-center">
                      <CircleArrowDown className="h-3.5 w-3.5 text-rose-600" />
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-muted-foreground italic text-sm">
            Nenhuma transação recente.
          </div>
        )}
      </div>

      <div className="p-4 bg-muted/20 flex justify-center border-t border-border">
        <Link
          to="/transactions"
          className="inline-flex items-center gap-2 text-brand-base font-semibold hover:underline text-sm"
        >
          <Plus className="w-4 h-4" />
          Nova transação
        </Link>
      </div>
    </div>
  );
};
