import { SearchX, MapPin, Tag } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-results' | 'no-local' | 'no-offers';
}

export const EmptyState = ({ type }: EmptyStateProps) => {
  const config = {
    'no-results': {
      icon: <SearchX className="h-16 w-16 text-muted-foreground" />,
      title: 'No results found',
      description: 'Try adjusting your search or filters',
    },
    'no-local': {
      icon: <MapPin className="h-16 w-16 text-muted-foreground" />,
      title: 'No local partners nearby yet',
      description: 'More coming soon! Check back later.',
    },
    'no-offers': {
      icon: <Tag className="h-16 w-16 text-muted-foreground" />,
      title: 'No active promotions',
      description: 'This merchant has no current offers',
    },
  };

  const { icon, title, description } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon}
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">{description}</p>
    </div>
  );
};
