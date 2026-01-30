import { Badge } from '@marketplace/components/ui/badge';
import { CategoryType } from '@marketplace/types/marketplace';
import { cn } from '@marketplace/lib/utils';

interface CategoryChipsProps {
  selected: CategoryType;
  onSelect: (category: CategoryType) => void;
}

const categories: CategoryType[] = [
  'All',
  'Favorites',
  'Fashion',
  'Beauty',
  'Travel',
  'Electronics',
  'Dining',
  'Grocery',
  'Entertainment',
  'Local',
];

export const CategoryChips = ({ selected, onSelect }: CategoryChipsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selected === category ? 'default' : 'outline'}
          className={cn(
            'cursor-pointer whitespace-nowrap px-4 py-2 transition-colors',
            selected === category
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'hover:bg-secondary'
          )}
          onClick={() => onSelect(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};
