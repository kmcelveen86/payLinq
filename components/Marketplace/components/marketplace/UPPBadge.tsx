import { Badge } from '@marketplace/components/ui/badge';
import { cn } from '@marketplace/lib/utils';

interface UPPBadgeProps {
  rate: number;
  type: 'percentage' | 'fixed';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UPPBadge = ({ rate, type, size = 'md', className }: UPPBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const displayText = type === 'percentage' 
    ? `Earn ${rate}% UPP`
    : `Earn ${rate} UPP per $10`;

  return (
    <Badge 
      className={cn(
        'bg-success-light text-success-light-foreground hover:bg-success-light font-semibold',
        sizeClasses[size],
        className
      )}
    >
      {displayText}
    </Badge>
  );
};
