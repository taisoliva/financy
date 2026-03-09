import type { LucideIcon } from "lucide-react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ShoppingCart,
  Sprout,
  Utensils,
  Wallet,
} from "lucide-react";

export interface TransactionForDisplay {
  type: string;
  category?: { title?: string; color?: string } | null;
}

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  default: Wallet,
  alimentação: Utensils,
  transporte: ArrowDownCircle,
  mercado: ShoppingCart,
  investimento: Sprout,
  receita: ArrowUpCircle,
};

const CATEGORY_PILL_CLASSES: Record<string, string> = {
  receita: "bg-emerald-100 text-emerald-800",
  alimentação: "bg-blue-100 text-blue-800",
  transporte: "bg-purple-100 text-purple-800",
  mercado: "bg-amber-100 text-amber-800",
  investimento: "bg-emerald-100 text-emerald-800",
};

/** Same color as category pill, for the icon container (lighter bg + icon color) */
const CATEGORY_ICON_CONTAINER_CLASSES: Record<string, string> = {
  receita: "bg-emerald-50 text-emerald-600",
  alimentação: "bg-blue-50 text-blue-600",
  transporte: "bg-purple-50 text-purple-600",
  mercado: "bg-amber-50 text-amber-600",
  investimento: "bg-emerald-50 text-emerald-600",
};

export function getTransactionIcon(
  transaction: TransactionForDisplay
): LucideIcon {
  const title = transaction.category?.title?.toLowerCase() ?? "";
  for (const [key, Icon] of Object.entries(CATEGORY_ICON_MAP)) {
    if (title.includes(key)) return Icon;
  }
  return transaction.type === "INCOME" ? ArrowUpCircle : Wallet;
}

export function getTransactionCategoryPillClass(
  transaction: TransactionForDisplay
): string {
  const title = transaction.category?.title?.toLowerCase() ?? "";
  for (const [key, cls] of Object.entries(CATEGORY_PILL_CLASSES)) {
    if (title.includes(key)) return cls;
  }
  return transaction.type === "INCOME"
    ? "bg-emerald-100 text-emerald-800"
    : "bg-muted text-muted-foreground";
}

export function getTransactionIconContainerClass(
  transaction: TransactionForDisplay
): string {
  const title = transaction.category?.title?.toLowerCase() ?? "";
  for (const [key, cls] of Object.entries(CATEGORY_ICON_CONTAINER_CLASSES)) {
    if (title.includes(key)) return cls;
  }
  return transaction.type === "INCOME"
    ? "bg-emerald-50 text-emerald-600"
    : "bg-rose-50 text-rose-600";
}
