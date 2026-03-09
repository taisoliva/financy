import { type LucideIcon } from "lucide-react";
import { UpdateCategoryDialog } from "./UpdateCategoryDialog";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";

interface CategoryData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface HeaderProps {
  icon: LucideIcon;
  color?: string;
  category: CategoryData;
}

export const Header = ({ icon: Icon, color, category }: HeaderProps) => {
  return (
    <div className="flex items-center gap-4 justify-between">
      <div
        className="w-10 h-10 border border-border rounded-md flex items-center justify-center transition-colors"
        style={{ backgroundColor: color ? `${color}3A` : undefined }}
      >
        <Icon
          className="w-5 h-5"
          style={{ color: color }}
        />
      </div>
      <div className="flex gap-2">
        <DeleteCategoryDialog categoryId={category.id} categoryName={category.title} />
        <UpdateCategoryDialog category={category} />
      </div>
    </div>
  )
}