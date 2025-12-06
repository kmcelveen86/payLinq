import { Brand } from '@marketplace/types/marketplace';
import { Card, CardContent } from '@marketplace/components/ui/card';
import { Button } from '@marketplace/components/ui/button';
import { UPPBadge } from './UPPBadge';
import { MapPin, Navigation } from 'lucide-react';

interface LocalMerchantCardProps {
  merchant: Brand;
  onClick: (brand: Brand) => void;
}

export const LocalMerchantCard = ({ merchant, onClick }: LocalMerchantCardProps) => {
  return (
    <Card 
      className="min-w-[280px] sm:min-w-[320px] cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={() => onClick(merchant)}
    >
      <CardContent className="p-4 space-y-3">
        {/* Merchant Image/Logo */}
        <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center text-6xl">
          {merchant.logo}
        </div>

        {/* Info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-base">{merchant.name}</h3>
              <p className="text-sm text-muted-foreground">{merchant.category}</p>
            </div>
            <UPPBadge 
              rate={merchant.uppEarningRate} 
              type={merchant.uppEarningType} 
              size="sm"
            />
          </div>

          {/* Distance */}
          {merchant.distance !== undefined && (
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {merchant.distance} miles away
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onClick(merchant);
              }}
            >
              Shop Now
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                // Handle directions
              }}
            >
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
