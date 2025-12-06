import { Button } from '@marketplace/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@marketplace/components/ui/select';
import { FilterType, SortType } from '@marketplace/types/marketplace';
import { cn } from '@marketplace/lib/utils';

interface FilterBarProps {
  filterType: FilterType;
  sortType: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
}

export const FilterBar = ({
  filterType,
  sortType,
  onFilterChange,
  onSortChange,
}: FilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Filter Toggle */}
      <div className="flex gap-2">
        <Button
          variant={filterType === 'online' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('online')}
          className={cn('transition-colors')}
        >
          Online
        </Button>
        <Button
          variant={filterType === 'local' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('local')}
          className={cn('transition-colors')}
        >
          Local
        </Button>
        <Button
          variant={filterType === 'both' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('both')}
          className={cn('transition-colors')}
        >
          Both
        </Button>
      </div>

      {/* Sort Dropdown */}
      <Select value={sortType} onValueChange={(value) => onSortChange(value as SortType)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recommended">Recommended</SelectItem>
          <SelectItem value="highest-upp">Highest UPP</SelectItem>
          <SelectItem value="trending">Trending</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="near-me">Near Me</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
