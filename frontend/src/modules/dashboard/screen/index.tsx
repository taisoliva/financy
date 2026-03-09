import { useQuery } from "@apollo/client/react";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

import { GET_DASHBOARD_STATS } from "@/lib/graphql/queries/get-dashboard-stats";
import { GET_CATEGORIES } from "@/lib/graphql/queries/get-categories";
import { GET_TRANSACTIONS } from "@/lib/graphql/queries/get-transactions";

import Dashboard from "../components";

const formatCurrency = (valueInCents: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueInCents / 100);

type DashboardStats = {
  dashboardStats: {
    balance: number;
    incomeOfMonth: number;
    expenseOfMonth: number;
  };
};

export const DashboardScreen = () => {
  const { data: statsData } = useQuery<DashboardStats>(GET_DASHBOARD_STATS);
  const { data: transactionsData } = useQuery(GET_TRANSACTIONS);
  const { data: categoriesData } = useQuery(GET_CATEGORIES);

  const stats = statsData?.dashboardStats;
  const transactions = transactionsData?.transactions ?? [];
  const categories = categoriesData?.categories?.data ?? [];

  const recentTransactions = transactions;

  const categoriesWithTotals = categories.map((category) => {
    const categoryTransactions = transactions.filter(
      (t) => t.categoryId === category.id,
    );
    const totalValue = categoryTransactions.reduce(
      (sum, t) => sum + (t.amount ?? 0),
      0,
    );
    return {
      id: category.id,
      title: category.title,
      itemCount: category.usageCount ?? 0,
      totalValue,
      color: category.color ?? "#3b82f6",
    };
  });

  return (
    <div className="p-6 md:p-10 space-y-8">
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Dashboard.SummaryCard
          title="Saldo total"
          value={stats ? formatCurrency(stats.balance) : "R$ 0,00"}
          icon={Wallet}
          variant="total"
        />
        <Dashboard.SummaryCard
          title="Receitas do mês"
          value={stats ? formatCurrency(stats.incomeOfMonth) : "R$ 0,00"}
          icon={ArrowUpCircle}
          variant="income"
        />
        <Dashboard.SummaryCard
          title="Despesas do mês"
          value={stats ? formatCurrency(stats.expenseOfMonth) : "R$ 0,00"}
          icon={ArrowDownCircle}
          variant="expense"
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[66%_1fr] gap-6">
        <Dashboard.RecentTransactions transactions={recentTransactions} />
        <Dashboard.CategoriesBreakdown categories={categoriesWithTotals} />
      </section>
    </div>
  );
};
