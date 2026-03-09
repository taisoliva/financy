import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery } from "@apollo/client/react";
import { CREATE_TRANSACTION } from "@/lib/graphql/mutations/create-transaction";
import { GET_CATEGORIES } from "@/lib/graphql/queries/get-categories";
import { Plus, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const createTransactionSchema = z.object({
    description: z.string().min(1, "A descrição é obrigatória"),
    amount: z.number().min(1, "O valor é obrigatório"),
    date: z.string().min(1, "A data é obrigatória"),
    categoryId: z.string().min(1, "A categoria é obrigatória"),
    type: z.enum(["EXPENSE", "INCOME"]),
});

type CreateTransactionFormValues = z.infer<typeof createTransactionSchema>;

export function CreateTransactionDialog() {
    const [open, setOpen] = React.useState(false);

    const { data: categoriesData } = useQuery(GET_CATEGORIES);
    const categories = categoriesData?.categories.data || [];

    const [createTransaction, { loading, error }] = useMutation(CREATE_TRANSACTION, {
        onCompleted: () => {
            setOpen(false);
            reset();
        },
        refetchQueries: ["Transactions", "CategoriesStats"],
    });

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CreateTransactionFormValues>({
        resolver: zodResolver(createTransactionSchema),
        defaultValues: {
            type: "EXPENSE",
            date: new Date().toISOString().split("T")[0],
            amount: 0,
        },
    });

    const currentType = watch("type");

    const onSubmit = async (data: CreateTransactionFormValues) => {
        console.log("Submit data:", data);

        try {

            const result = await createTransaction({
                variables: {
                    createTransactionInput: {
                        description: data.description,
                        amount: data.amount,
                        date: new Date(data.date).toISOString(),
                        type: data.type,
                        categoryId: data.categoryId,
                    },
                },
            });
            console.log("Sucesso ao criar transação:", result);
        } catch (e) {
            console.error("Erro capturado no catch da transação:", e);
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-brand-base hover:bg-brand-base/90 text-white gap-2">
                    <Plus className="w-4 h-4" />
                    Nova transação
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px] p-8 max-h-[90vh] overflow-y-auto">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-2xl font-bold">Nova transação</DialogTitle>
                    <DialogDescription className="text-gray-500 text-base">
                        Registre sua despesa ou receita
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-600">
                            Ocorreu um erro ao salvar a transação. Tente novamente.
                        </div>
                    )}

                    {/* Type Toggle */}
                    <div className="flex p-1 bg-gray-50 rounded-xl border border-gray-100 h-16">
                        <button
                            type="button"
                            onClick={() => setValue("type", "EXPENSE")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 rounded-lg transition-all font-medium",
                                currentType === "EXPENSE"
                                    ? "bg-white text-gray-900 shadow-sm border border-red-200"
                                    : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            <ArrowDownCircle className={cn("w-5 h-5", currentType === "EXPENSE" ? "text-red-500" : "text-gray-400")} />
                            Despesa
                        </button>
                        <button
                            type="button"
                            onClick={() => setValue("type", "INCOME")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 rounded-lg transition-all font-medium",
                                currentType === "INCOME"
                                    ? "bg-white text-gray-900 shadow-sm border border-emerald-200"
                                    : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            <ArrowUpCircle className={cn("w-5 h-5", currentType === "INCOME" ? "text-emerald-500" : "text-gray-400")} />
                            Receita
                        </button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-base font-medium">Descrição</Label>
                        <Input
                            id="description"
                            placeholder="Ex. Almoço no restaurante"
                            {...register("description")}
                            disabled={loading}
                            className={cn(
                                "h-12 border-gray-200 focus:border-brand-base",
                                errors.description && "border-red-500"
                            )}
                        />
                        {errors.description && (
                            <p className="text-xs text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-base font-medium">Data</Label>
                            <Input
                                id="date"
                                type="date"
                                {...register("date")}
                                disabled={loading}
                                className={cn(
                                    "h-12 border-gray-200 focus:border-brand-base",
                                    errors.date && "border-red-500"
                                )}
                            />
                            {errors.date && (
                                <p className="text-xs text-red-500">{errors.date.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-base font-medium">Valor</Label>
                            <Controller
                                name="amount"
                                control={control}
                                render={({ field }) => {
                                    const displayValue = new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(field.value / 100);

                                    return (
                                        <Input
                                            id="amount"
                                            placeholder="R$ 0,00"
                                            value={displayValue}
                                            disabled={loading}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, "");
                                                field.onChange(value ? parseInt(value) : 0);
                                            }}
                                            className={cn(
                                                "h-12 border-gray-200 focus:border-brand-base font-medium",
                                                errors.amount && "border-red-500"
                                            )}
                                        />
                                    );
                                }}
                            />
                            {errors.amount && (
                                <p className="text-xs text-red-500">{errors.amount.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-base font-medium">Categoria</Label>
                        <Controller
                            name="categoryId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={loading}
                                >
                                    <SelectTrigger className={cn(
                                        "h-12 border-gray-200 focus:border-brand-base",
                                        errors.categoryId && "border-red-500"
                                    )}>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.categoryId && (
                            <p className="text-xs text-red-500">{errors.categoryId.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-brand-dark hover:bg-brand-dark/90 text-white text-lg font-semibold mt-4 rounded-xl shadow-sm"
                    >
                        {loading ? "Salvando..." : "Salvar"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
