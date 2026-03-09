import { Search, X } from "lucide-react";
import { useQuery } from "@apollo/client/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GET_CATEGORIES } from "@/lib/graphql/queries/get-categories";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { DatePickerWithRange } from "@/components/ui/date-range-picker";

const filterSchema = z.object({
    description: z.string().optional(),
    type: z.string().optional(),
    categoryId: z.string().optional(),
    dateRange: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }).optional(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

interface TransactionFiltersProps {
    onFilterChange: (filters: {
        description: string;
        type: string;
        categoryId: string;
        startDate: string;
        endDate: string;
    }) => void;
}

export function TransactionFilters({ onFilterChange }: TransactionFiltersProps) {
    const { data: categoriesData } = useQuery(GET_CATEGORIES);
    const categories = categoriesData?.categories.data || [];

    const {
        register,
        handleSubmit,
        reset,
        control,
    } = useForm<FilterFormValues>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            description: "",
            type: "ALL",
            categoryId: "ALL",
            dateRange: undefined,
        },
    });

    const onSubmit = (data: FilterFormValues) => {
        onFilterChange({
            description: data.description || "",
            type: data.type === "ALL" ? "" : data.type || "",
            categoryId: data.categoryId === "ALL" ? "" : data.categoryId || "",
            startDate: data.dateRange?.from ? data.dateRange.from.toISOString() : "",
            endDate: data.dateRange?.to ? data.dateRange.to.toISOString() : "",
        });
    };

    const handleClear = () => {
        reset();
        onFilterChange({
            description: "",
            type: "",
            categoryId: "",
            startDate: "",
            endDate: "",
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl border border-border shadow-sm mb-8">
            <div className="flex flex-col lg:flex-row gap-4 w-full">
                <div className="flex-1 w-full space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Buscar por descrição..."
                            {...register("description")}
                            className="pl-10 h-10 w-full"
                        />
                    </div>
                </div>

                <div className="flex-1 w-full space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</label>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="h-10 w-full">
                                    <SelectValue placeholder="Todos os tipos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Todos os tipos</SelectItem>
                                    <SelectItem value="INCOME">Receita</SelectItem>
                                    <SelectItem value="EXPENSE">Despesa</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                <div className="flex-1 w-full space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</label>
                    <Controller
                        name="categoryId"
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="h-10 w-full">
                                    <SelectValue placeholder="Todas as categorias" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Todas as categorias</SelectItem>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                <div className="flex-1 w-full space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Período</label>
                    <Controller
                        name="dateRange"
                        control={control}
                        render={({ field }) => (
                            <DatePickerWithRange
                                className="w-full"
                                date={field.value as any}
                                setDate={field.onChange}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleClear}
                    className="text-gray-500 hover:text-gray-700 h-9 px-3 text-sm"
                >
                    <X className="w-4 h-4 mr-2" />
                    Limpar
                </Button>
                <Button
                    type="submit"
                    className="bg-brand-base hover:bg-brand-base/90 text-white h-9 px-5 text-sm font-medium"
                >
                    Filtrar
                </Button>
            </div>
        </form>
    );
}
