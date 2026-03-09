import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@apollo/client/react";
import { UPDATE_CATEGORY } from "@/lib/graphql/mutations/update-category";
import { SquarePen } from "lucide-react";
import { ICONS_LIST } from "../utils/icons";

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
import { cn } from "@/lib/utils";

const COLORS = [
    { id: "green", value: "#1f6f43" },
    { id: "blue", value: "#3b82f6" },
    { id: "purple", value: "#a855f7" },
    { id: "pink", value: "#ec4899" },
    { id: "red", value: "#ef4444" },
    { id: "orange", value: "#f97316" },
    { id: "yellow", value: "#eab308" },
];

const updateCategorySchema = z.object({
    title: z.string().min(1, "O título é obrigatório"),
    description: z.string().optional(),
});

type UpdateCategoryFormValues = z.infer<typeof updateCategorySchema>;

interface CategoryData {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

interface UpdateCategoryDialogProps {
    category: CategoryData;
}

export function UpdateCategoryDialog({ category }: UpdateCategoryDialogProps) {
    // Find color ID based on hex value
    const currentColorId = COLORS.find(c => c.value.toLowerCase() === category.color.toLowerCase())?.id || COLORS[0].id;

    const [selectedIcon, setSelectedIcon] = React.useState(category.icon);
    const [selectedColor, setSelectedColor] = React.useState(currentColorId);
    const [open, setOpen] = React.useState(false);

    const [updateCategory, { loading, error }] = useMutation(UPDATE_CATEGORY, {
        onCompleted: () => {
            setOpen(false);
        },
        refetchQueries: ["Categories", "CategoriesStats"],
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateCategoryFormValues>({
        resolver: zodResolver(updateCategorySchema),
        defaultValues: {
            title: category.title,
            description: category.description,
        }
    });

    const onSubmit = async (data: UpdateCategoryFormValues) => {
        try {
            await updateCategory({
                variables: {
                    data: {
                        id: category.id,
                        title: data.title,
                        description: data.description || "",
                        icon: selectedIcon,
                        color: COLORS.find(c => c.id === selectedColor)?.value || category.color
                    }
                }
            });
        } catch (e) {
            console.error("Erro ao atualizar categoria:", e);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <SquarePen className="w-5 h-5 text-gray-500 hover:text-brand-base transition-colors" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px] p-8 max-h-[90vh] overflow-y-auto">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-2xl font-bold">Editar categoria</DialogTitle>
                    <DialogDescription className="text-gray-500 text-base">
                        Atualize as informações da sua categoria
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-600">
                            Ocorreu um erro ao atualizar a categoria. Tente novamente.
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-base font-medium">Título</Label>
                        <Input
                            id="title"
                            placeholder="Ex. Alimentação"
                            {...register("title")}
                            disabled={loading}
                            className={cn(
                                "h-12 border-gray-200 focus:border-brand-base",
                                errors.title && "border-red-500"
                            )}
                        />
                        {errors.title && (
                            <p className="text-xs text-red-500">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-base font-medium">Descrição</Label>
                        <Input
                            id="description"
                            placeholder="Descrição da categoria"
                            {...register("description")}
                            disabled={loading}
                            className="h-12 border-gray-200 focus:border-brand-base"
                        />
                        <p className="text-xs text-gray-400">Opcional</p>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-base font-medium">Ícone</Label>
                        <div className="grid grid-cols-8 gap-2">
                            {ICONS_LIST.map(({ id, icon: Icon }) => (
                                <button
                                    key={id}
                                    type="button"
                                    disabled={loading}
                                    onClick={() => setSelectedIcon(id)}
                                    className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 transition-all hover:bg-gray-50",
                                        selectedIcon === id && "border-brand-base ring-1 ring-brand-base",
                                        loading && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    <Icon className={cn("w-5 h-5 text-gray-500", selectedIcon === id && "text-brand-base")} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-base font-medium">Cor</Label>
                        <div className="flex gap-2">
                            {COLORS.map(({ id, value }) => (
                                <button
                                    key={id}
                                    type="button"
                                    disabled={loading}
                                    onClick={() => setSelectedColor(id)}
                                    className={cn(
                                        "h-8 w-12 rounded-md border border-transparent transition-all",
                                        selectedColor === id && "ring-2 ring-brand-base ring-offset-2",
                                        loading && "opacity-50 cursor-not-allowed"
                                    )}
                                    style={{ backgroundColor: value }}
                                />
                            ))}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-brand-dark hover:bg-brand-dark/90 text-white text-lg font-semibold mt-6"
                    >
                        {loading ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
