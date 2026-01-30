import { useState, useMemo } from 'react';
import { Brand, CategoryType, FilterType, SortType } from '@marketplace/types/marketplace';
import { mockBrands } from '@marketplace/data/mockBrands';
import { SearchBar } from '@marketplace/components/marketplace/SearchBar'; // Keeping for reference or fallback
import { ModernHero } from '../components/modern/ModernHero';
import { ModernFilterBar } from '../components/modern/ModernFilterBar';
import { ModernBrandCard } from '../components/modern/ModernBrandCard';
import { ModernBrandDetailModal } from '../components/modern/ModernBrandDetailModal';
import { EmptyState } from '@marketplace/components/marketplace/EmptyState';
import { Button } from '@marketplace/components/ui/button';
import { Card, CardContent } from '@marketplace/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Can remove if not used elsewhere
import marketplaceHero from '@marketplace/assets/marketplace-hero.jpg';
import { useQuery } from '@tanstack/react-query';
import { getMerchants } from '@/app/actions/getMerchants';

import Image from 'next/image';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [filterType, setFilterType] = useState<FilterType>('both');
  const [sortType, setSortType] = useState<SortType>('recommended');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);

  // Fetch real merchants
  const { data: realMerchants = [] } = useQuery({
    queryKey: ['merchants'],
    queryFn: getMerchants,
  });

  // Merge mock and real brands
  const allBrands = useMemo(() => {
    const mappedRealBrands: Brand[] = realMerchants.map((m: any) => ({
      id: m.id,
      name: m.name,
      logo: m.logo || (m.name ? m.name[0] : '?'),
      category: m.category || 'Other',
      uppEarningRate: m.uppEarningRate || 5,
      uppEarningType: m.uppEarningType || 'percentage',
      tags: m.tags && m.tags.length > 0 ? m.tags : ['new'],
      isLocal: m.presence === 'local' || m.presence === 'both',
      tagline: m.tagline || (m.description ? m.description.substring(0, 30) + '...' : 'Merchant partner'),
      description: m.description || 'Visit our store to earn rewards.',
      offers: m.offers || [],
      affiliateLink: m.affiliateLink,
      website: m.website,
      integrationType: m.integrationType,
      isFavorited: m.isFavorited,
    }));

    return [...mockBrands, ...mappedRealBrands];
  }, [realMerchants]);

  // Hero carousel items
  const heroItems = [
    { title: 'Shop Anywhere', subtitle: 'Earn UPP Everywhere', image: marketplaceHero },
    { title: 'Support Local', subtitle: 'Get Rewarded', image: marketplaceHero },
    { title: 'Premium Brands', subtitle: 'Maximum Rewards', image: marketplaceHero },
  ];

  // Filter and sort brands
  const filteredBrands = useMemo(() => {
    let filtered = allBrands;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((brand) =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Favorites') {
        filtered = filtered.filter((brand) => brand.isFavorited);
      } else {
        filtered = filtered.filter((brand) =>
          selectedCategory === 'Local'
            ? brand.isLocal
            : brand.category === selectedCategory
        );
      }
    }

    // Online/Local filter
    if (filterType === 'online') {
      filtered = filtered.filter((brand) => !brand.isLocal);
    } else if (filterType === 'local') {
      filtered = filtered.filter((brand) => brand.isLocal);
    }

    // Sort
    switch (sortType) {
      case 'highest-upp':
        filtered = [...filtered].sort((a, b) => b.uppEarningRate - a.uppEarningRate);
        break;
      case 'trending':
        filtered = [...filtered].sort((a, b) =>
          (b.tags.includes('trending') ? 1 : 0) - (a.tags.includes('trending') ? 1 : 0)
        );
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) =>
          (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0)
        );
        break;
      case 'near-me':
        filtered = [...filtered]
          .filter((b) => b.isLocal)
          .sort((a, b) => (a.distance || 999) - (b.distance || 999));
        break;
      default:
        // recommended - keep original order
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, filterType, sortType, allBrands]);

  const localMerchants = useMemo(() =>
    allBrands.filter((brand) => brand.isLocal),
    [allBrands]
  );

  const trendingBrands = useMemo(() =>
    allBrands.filter((brand) => brand.tags.includes('trending')),
    [allBrands]
  );

  const topEarners = useMemo(() =>
    [...allBrands].sort((a, b) => b.uppEarningRate - a.uppEarningRate).slice(0, 6),
    [allBrands]
  );

  const nextHero = () => {
    setHeroIndex((prev) => (prev + 1) % heroItems.length);
  };

  const prevHero = () => {
    setHeroIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <ModernHero items={heroItems} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Search & Filters */}
        <ModernFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          filterType={filterType}
          onFilterChange={setFilterType}
          sortType={sortType}
          onSortChange={setSortType}
        />

        {/* Brand Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              {searchQuery ? 'Search Results' : 'Explore Merchants'}
            </h2>
            <p className="text-muted-foreground">
              {filteredBrands.length} {filteredBrands.length === 1 ? 'result' : 'results'} found
            </p>
          </div>

          {filteredBrands.length === 0 ? (
            <EmptyState type="no-results" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredBrands.map((brand) => (
                <ModernBrandCard
                  key={brand.id}
                  brand={brand}
                  onClick={setSelectedBrand}
                  onFavorite={async (id) => {
                    // We can just open the modal to toggle favorite for now, OR implement direct toggle
                    // For a better UX, let's open the modal which already has the logic
                    // Or ideally, we should expose the toggle logic here.
                    // Given constraints, I'll pass the toggle logic if accessible, 
                    // but since Toggle logic is inside Modal currently, let's just select the brand to open modal.
                    setSelectedBrand(brand);
                  }}
                />
              ))}
            </div>
          )}
        </section>

        {/* Trending Now (Only if not searching/filtering heavily) */}
        {!searchQuery && selectedCategory === 'All' && filterType === 'both' && (
          <section className="pt-8 border-t border-dashed">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
                <p className="text-muted-foreground mt-1">Hot merchants earning top rewards</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {trendingBrands.slice(0, 5).map((brand) => (
                <ModernBrandCard
                  key={brand.id}
                  brand={brand}
                  onClick={setSelectedBrand}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Brand Detail Modal */}
      <ModernBrandDetailModal
        brand={selectedBrand}
        open={!!selectedBrand}
        onOpenChange={(open) => !open && setSelectedBrand(null)}
      />
    </div >
  );
};

export default Marketplace;
