import * as React from "react";
import { useMutation } from "@apollo/client/react";
import { REMOVE_CATEGORY } from "@/lib/graphql/mutations/remove-category";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteCategoryDialogProps {
    categoryId: string;
    categoryName: string;
}

export function DeleteCategoryDialog({ categoryId, categoryName }: DeleteCategoryDialogProps) {
    const [open, setOpen] = React.useState(false);

    const [removeCategory, { loading }] = useMutation(REMOVE_CATEGORY, {
        onCompleted: () => {
            setOpen(false);
        },
        refetchQueries: ["Categories", "CategoriesStats"],
    });

    const handleDelete = async () => {
        try {
            await removeCategory({
                variables: {
                    id: categoryId,
                },
            });
        } catch (e) {
            console.error("Erro ao excluir categoria:", e);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Trash2 className="text-red-500 w-5 h-5 hover:text-red-600 transition-colors" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-8 max-h-[90vh] overflow-y-auto">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-2xl font-bold">Excluir categoria</DialogTitle>
                    <DialogDescription className="text-gray-500 text-base py-2">
                        Tem certeza que deseja excluir a categoria <span className="font-bold text-gray-900">"{categoryName}"</span>?
                        Essa ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-3 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={loading}
                        className="flex-1 h-12 text-lg font-semibold"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold"
                    >
                        {loading ? "Excluindo..." : "Confirmar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
