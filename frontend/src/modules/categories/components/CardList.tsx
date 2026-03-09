import { Categories } from ".";
import { CATEGORY_ICONS, type CategoryIconId } from "../utils/icons";

interface CategoryData {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    usageCount: number;
}

interface CardListProps {
    category: CategoryData;
}

export const CardList = ({ category }: CardListProps) => {
    const Icon = CATEGORY_ICONS[category.icon as CategoryIconId] || CATEGORY_ICONS.tag;

    return (
        <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl border border-border shadow-sm w-full h-[180px]">
            <Categories.Header icon={Icon} color={category.color} category={category} />
            <Categories.Description category={category.title} description={category.description} />
            <Categories.Footer category={category.title} total={category.usageCount} color={category.color} />
        </div>
    );
};