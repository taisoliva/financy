import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "@/lib/graphql/queries/get-categories";
import { GET_CATEGORIES_STATS } from "@/lib/graphql/queries/get-categories-stats";
import { CATEGORY_ICONS, type CategoryIconId } from "../utils/icons";
import { Title } from "@/components/ui/common/title";
import { ArrowUpDown, Utensils } from "lucide-react";
import { Categories } from "../components";

export const CategoriesScreen = () => {
    const { data: listData, loading: listLoading } = useQuery(GET_CATEGORIES);
    const { data: statsData } = useQuery(GET_CATEGORIES_STATS);

    const categories = listData?.categories.data || [];

    const stats = statsData?.categoriesStats;
    const totalCategories = stats?.totalCategories || 0;
    const totalTransactions = stats?.totalTransactions || 0;
    const mostUsedCategory = stats?.mostUsedCategory;

    return (
        <div className="w-auto h-auto p-10">
            <div className="flex items-center justify-between">
                <Title title="Categorias" description="Organize suas transações por categorias" />
                <Categories.CreateCategoryDialog />
            </div>

            <div className="w-full mt-8 flex justify-between gap-4">
                <Categories.CardDashboard
                    icon={CATEGORY_ICONS.tag}
                    title={totalCategories.toString()}
                    description="Total de categorias"
                />

                <Categories.CardDashboard
                    icon={ArrowUpDown}
                    title={totalTransactions.toString()}
                    description="Total de transações"
                />

                <Categories.CardDashboard
                    icon={mostUsedCategory ? (CATEGORY_ICONS[mostUsedCategory.icon as CategoryIconId] || CATEGORY_ICONS.tag) : Utensils}
                    title={mostUsedCategory?.title || "Nenhuma"}
                    description="Categoria mais utilizada"
                />
            </div>

            <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {listLoading ? (
                    <p className="text-muted-foreground italic">Carregando categorias...</p>
                ) : categories.length > 0 ? (
                    categories.map((category) => (
                        <Categories.CardList
                            key={category.id}
                            category={category as any}
                        />
                    ))
                ) : (
                    <p className="text-muted-foreground">Nenhuma categoria encontrada.</p>
                )}
            </div>
        </div>
    );
};