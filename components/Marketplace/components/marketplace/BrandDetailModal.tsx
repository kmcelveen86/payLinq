import { Brand } from '@marketplace/types/marketplace';
import { useState, useEffect } from 'react';
import { toggleFavorite } from '@/app/actions/toggleFavorite';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@marketplace/components/ui/dialog';
import { Button } from '@marketplace/components/ui/button';
import { Badge } from '@marketplace/components/ui/badge';
import { UPPBadge } from './UPPBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@marketplace/components/ui/card';
import { Separator } from '@marketplace/components/ui/separator';
import {
  Heart,
  Share2,
  MapPin,
  Navigation,
  Clock,
  TrendingUp,
  Sparkles,
  Star,
  Info
} from 'lucide-react';
import { cn } from '@marketplace/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@marketplace/components/ui/tooltip';

interface BrandDetailModalProps {
  brand: Brand | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BrandDetailModal = ({ brand, open, onOpenChange }: BrandDetailModalProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (brand) {
      setIsFavorited(!!brand.isFavorited);
    }
  }, [brand]);

  const handleToggleFavorite = async () => {
    if (!brand) return;

    // Optimistic update
    const previousState = isFavorited;
    setIsFavorited(!previousState);

    try {
      const result = await toggleFavorite(brand.id);
      if (!result.success) {
        // Revert on failure
        setIsFavorited(previousState);
        toast.error("Failed to update favorite");
      } else {
        toast.success(result.favorited ? "Added to favorites" : "Removed from favorites");
        // Invalidate merchants query to refresh the list in Marketplace
        queryClient.invalidateQueries({ queryKey: ['merchants'] });
      }
    } catch (error) {
      setIsFavorited(previousState);
      toast.error("Something went wrong");
    }
  };

  if (!brand) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{brand.name} Details</DialogTitle>
        </DialogHeader>

        {/* Header Block */}
        <div className="flex flex-col items-center text-center space-y-4 pt-4">
          {/* Logo */}
          <div className="w-24 h-24 flex items-center justify-center text-6xl bg-muted rounded-2xl overflow-hidden">
            {brand.logo.startsWith('http') || brand.logo.startsWith('/') ? (
              <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
            ) : (
              brand.logo
            )}
          </div>

          {/* Brand Name & Tagline */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{brand.name}</h2>
            {brand.tagline && (
              <p className="text-muted-foreground">{brand.tagline}</p>
            )}
          </div>

          {/* Category Chip */}
          <Badge variant="secondary" className="text-sm">
            {brand.category}
          </Badge>

          {/* Tags & UPP Badge */}
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <UPPBadge
              rate={brand.uppEarningRate}
              type={brand.uppEarningType}
              size="md"
            />
            {brand.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={cn(
                  'text-xs px-2 py-1 capitalize',
                  getTagColor(tag)
                )}
              >
                <span className="mr-1">{getTagIcon(tag)}</span>
                {tag.replace('-', ' ')}
              </Badge>
            ))}
          </div>
        </div>

        {/* Core Action Area */}
        <div className="space-y-3 py-4">
          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              if (brand.affiliateLink) {
                window.open(brand.affiliateLink, '_blank');
              }
            }}
            disabled={!brand.affiliateLink}
          >
            Shop & Earn UPP
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleToggleFavorite}
            >
              <Heart className={cn("h-4 w-4 mr-2", isFavorited && "fill-current text-red-500")} />
              {isFavorited ? "Favorited" : "Favorite"}
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Local Actions */}
          {brand.isLocal && (
            <div className="space-y-2 pt-2">
              <Button variant="secondary" className="w-full">
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
              {brand.address && (
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{brand.address}</span>
                </div>
              )}
              {brand.distance !== undefined && (
                <p className="text-sm text-muted-foreground">
                  {brand.distance} miles away
                </p>
              )}
              {brand.hours && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{brand.hours}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <Separator />

        {/* UPP Earning Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Earn UPP on Every Purchase
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{`UPP is Paylinq's universal reward currency redeemable anywhere Paylinq is accepted.`}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-lg font-semibold text-primary">
              {brand.uppEarningType === 'percentage'
                ? `${brand.uppEarningRate}% back in UPP`
                : `${brand.uppEarningRate} UPP per $10 spent`
              }
            </p>
            <p className="text-sm text-muted-foreground">
              {brand.uppEarningType === 'percentage'
                ? `Spend $100, earn ${brand.uppEarningRate * 100} UPP instantly`
                : `Every $10 you spend earns you ${brand.uppEarningRate} UPP`
              }
            </p>
          </CardContent>
        </Card>

        {/* Description */}
        {brand.description && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About {brand.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{brand.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Offers */}
        {brand.offers && brand.offers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Offers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {brand.offers.map((offer) => (
                <div key={offer.id} className="p-3 bg-success-light rounded-lg space-y-1">
                  <h4 className="font-semibold text-success-light-foreground">{offer.title}</h4>
                  <p className="text-sm text-muted-foreground">{offer.description}</p>
                  <p className="text-sm font-medium text-success">
                    Bonus: {offer.bonusUpp} UPP
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Featured Items */}
        {brand.featuredItems && brand.featuredItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Featured Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {brand.featuredItems.map((item) => (
                  <div key={item.id} className="min-w-[120px] space-y-2">
                    <div className="w-[120px] h-[120px] bg-muted rounded-lg flex items-center justify-center text-4xl">
                      🏷️
                    </div>
                    <p className="text-sm font-medium text-center">{item.category}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mobile Sticky CTA - shown at bottom on small screens */}
        <div className="sticky bottom-0 left-0 right-0 bg-background pt-4 pb-2 border-t sm:hidden">
          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              if (brand.affiliateLink) {
                window.open(brand.affiliateLink, '_blank');
              }
            }}
            disabled={!brand.affiliateLink}
          >
            Shop & Earn UPP
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
