import * as React from "react";
import { useQuery } from "@apollo/client/react";
import { GET_TRANSACTIONS } from "@/lib/graphql/queries/get-transactions";
import { Title } from "@/components/ui/common/title";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    getTransactionCategoryPillClass,
    getTransactionIcon,
    getTransactionIconContainerClass,
} from "@/lib/transaction-display";
import { cn } from "@/lib/utils";
import * as Transactions from "../components";

export const TransactionsScreen = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [filters, setFilters] = React.useState({
        description: "",
        type: "",
        categoryId: "",
        startDate: "",
        endDate: "",
    });
    const pageSize = 10;

    const queryVariables = React.useMemo(() => {
        const cleaned: any = {};
        if (filters.description) cleaned.description = filters.description;
        if (filters.type) cleaned.type = filters.type;
        if (filters.categoryId) cleaned.categoryId = filters.categoryId;
        if (filters.startDate) cleaned.startDate = filters.startDate;
        if (filters.endDate) cleaned.endDate = filters.endDate;
        return cleaned;
    }, [filters]);

    const { data: transactionsData, loading } = useQuery(GET_TRANSACTIONS, {
        variables: queryVariables,
    });

    const transactions = transactionsData?.transactions || [];

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page when filtering
    };

    // Simple frontend pagination for now
    const totalItems = transactions.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const paginatedItems = transactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value / 100);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("pt-BR");
    };

    return (
        <div className="w-auto h-auto p-10">
            <div className="flex items-center justify-between mb-8">
                <Title title="Transações" description="Gerencie todas as suas transações financeiras" />
                <Transactions.CreateTransactionDialog />
            </div>

            <Transactions.TransactionFilters onFilterChange={handleFilterChange} />

            <div className="mt-8 bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow>
                            <TableHead className="font-semibold py-4 px-6 text-muted-foreground w-14" />
                            <TableHead className="font-semibold py-4 px-6 text-muted-foreground">Descrição</TableHead>
                            <TableHead className="font-semibold py-4 px-6 text-muted-foreground">Data</TableHead>
                            <TableHead className="font-semibold py-4 px-6 text-muted-foreground">Categoria</TableHead>
                            <TableHead className="font-semibold py-4 px-6 text-muted-foreground">Tipo</TableHead>
                            <TableHead className="font-semibold py-4 px-6 text-muted-foreground text-right">Valor</TableHead>
                            <TableHead className="font-semibold py-4 px-6 text-muted-foreground text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground italic">
                                    Carregando transações...
                                </TableCell>
                            </TableRow>
                        ) : paginatedItems.length > 0 ? (
                            paginatedItems.map((transaction: any) => {
                                const Icon = getTransactionIcon(transaction);
                                return (
                                    <TableRow key={transaction.id} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className="py-4 px-4">
                                            <div
                                                className={cn(
                                                    "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
                                                    getTransactionIconContainerClass(transaction)
                                                )}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 px-6 font-medium text-foreground">{transaction.description}</TableCell>
                                        <TableCell className="py-4 px-6 text-muted-foreground">{formatDate(transaction.date)}</TableCell>
                                        <TableCell className="py-4 px-6">
                                            <span
                                                className={cn(
                                                    "px-2.5 py-1 rounded-full text-xs font-semibold",
                                                    getTransactionCategoryPillClass(transaction)
                                                )}
                                            >
                                                {transaction.category?.title || "Sem categoria"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-4 px-6">
                                            <span
                                                className={cn(
                                                    "px-2.5 py-1 rounded-full text-xs font-semibold",
                                                    transaction.type === "INCOME"
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                        : "bg-rose-50 text-rose-700 border border-rose-100"
                                                )}
                                            >
                                                {transaction.type === "INCOME" ? "Entrada" : "Saída"}
                                            </span>
                                        </TableCell>
                                        <TableCell className={cn("py-4 px-6 text-right font-bold tabular-nums", transaction.type === "INCOME" ? "text-emerald-600" : "text-rose-600")}>
                                            {transaction.type === "INCOME" ? "+" : "-"} {formatCurrency(transaction.amount)}
                                        </TableCell>
                                        <TableCell className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-1">
                                                <Transactions.DeleteTransactionDialog
                                                    transactionId={transaction.id}
                                                    transactionDescription={transaction.description}
                                                />
                                                <Transactions.UpdateTransactionDialog transaction={transaction as any} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                    Nenhuma transação encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {totalPages > 1 && (
                    <div className="p-4 border-t border-border bg-gray-50/30">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                                {[...Array(totalPages)].map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            isActive={currentPage === i + 1}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className="cursor-pointer"
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
};