import { Brand } from '@marketplace/types/marketplace';
import { Card, CardContent } from '@marketplace/components/ui/card';
import { Button } from '@marketplace/components/ui/button';
import { Badge } from '@marketplace/components/ui/badge';
import { UPPBadge } from './UPPBadge';
import { MapPin, TrendingUp, Sparkles, Star } from 'lucide-react';
import { cn } from '@marketplace/lib/utils';

interface BrandCardProps {
  brand: Brand;
  onClick: (brand: Brand) => void;
}

export const BrandCard = ({ brand, onClick }: BrandCardProps) => {
  const getTagIcon = (tag: string) => {
    switch (tag) {
      case 'local':
        return <MapPin className="h-3 w-3" />;
      case 'trending':
        return <TrendingUp className="h-3 w-3" />;
      case 'new':
        return <Sparkles className="h-3 w-3" />;
      case 'editors-pick':
        return <Star className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'local':
        return 'bg-primary/10 text-primary';
      case 'trending':
        return 'bg-orange-100 text-orange-700';
      case 'new':
        return 'bg-purple-100 text-purple-700';
      case 'editors-pick':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return '';
    }
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={() => onClick(brand)}
    >
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        {/* Brand Logo */}
        <div className="w-20 h-20 flex items-center justify-center text-5xl bg-muted rounded-xl group-hover:scale-110 transition-transform duration-300">
          {brand.logo}
        </div>

        {/* Brand Info */}
        <div className="space-y-2 w-full">
          <h3 className="font-semibold text-lg text-foreground">{brand.name}</h3>
          <p className="text-sm text-muted-foreground">{brand.category}</p>
        </div>

        {/* UPP Badge */}
        <UPPBadge 
          rate={brand.uppEarningRate} 
          type={brand.uppEarningType} 
          size="sm"
        />

        {/* Tags */}
        {brand.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-center">
            {brand.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline"
                className={cn(
                  'text-xs px-2 py-0.5 capitalize',
                  getTagColor(tag)
                )}
              >
                <span className="mr-1">{getTagIcon(tag)}</span>
                {tag.replace('-', ' ')}
              </Badge>
            ))}
          </div>
        )}

        {/* Distance for local */}
        {brand.isLocal && brand.distance !== undefined && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {brand.distance} miles away
          </p>
        )}

        {/* CTA Button */}
        <Button 
          className="w-full mt-2"
          onClick={(e) => {
            e.stopPropagation();
            onClick(brand);
          }}
        >
          Shop Now
        </Button>
      </CardContent>
    </Card>
  );
};
