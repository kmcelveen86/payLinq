import { useState, useMemo } from 'react';
import { Brand, CategoryType, FilterType, SortType } from '@marketplace/types/marketplace';
import { mockBrands } from '@marketplace/data/mockBrands';
import { SearchBar } from '@marketplace/components/marketplace/SearchBar';
import { CategoryChips } from '@marketplace/components/marketplace/CategoryChips';
import { FilterBar } from '@marketplace/components/marketplace/FilterBar';
import { BrandCard } from '@marketplace/components/marketplace/BrandCard';
import { LocalMerchantCard } from '@marketplace/components/marketplace/LocalMerchantCard';
import { BrandDetailModal } from '@marketplace/components/marketplace/BrandDetailModal';
import { EmptyState } from '@marketplace/components/marketplace/EmptyState';
import { Button } from '@marketplace/components/ui/button';
import { Card, CardContent } from '@marketplace/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import marketplaceHero from '@marketplace/assets/marketplace-hero.jpg';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [filterType, setFilterType] = useState<FilterType>('both');
  const [sortType, setSortType] = useState<SortType>('recommended');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);

  // Hero carousel items
  const heroItems = [
    { title: 'Shop Anywhere', subtitle: 'Earn UPP Everywhere', image: marketplaceHero },
    { title: 'Support Local', subtitle: 'Get Rewarded', image: marketplaceHero },
    { title: 'Premium Brands', subtitle: 'Maximum Rewards', image: marketplaceHero },
  ];

  // Filter and sort brands
  const filteredBrands = useMemo(() => {
    let filtered = mockBrands;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((brand) =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((brand) => 
        selectedCategory === 'Local' 
          ? brand.isLocal 
          : brand.category === selectedCategory
      );
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
  }, [searchQuery, selectedCategory, filterType, sortType]);

  const localMerchants = useMemo(() => 
    mockBrands.filter((brand) => brand.isLocal),
    []
  );

  const trendingBrands = useMemo(() => 
    mockBrands.filter((brand) => brand.tags.includes('trending')),
    []
  );

  const topEarners = useMemo(() => 
    [...mockBrands].sort((a, b) => b.uppEarningRate - a.uppEarningRate).slice(0, 6),
    []
  );

  const nextHero = () => {
    setHeroIndex((prev) => (prev + 1) % heroItems.length);
  };

  const prevHero = () => {
    setHeroIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-[hsl(var(--hero-gradient-to))] text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroItems[heroIndex].image} 
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              {heroItems[heroIndex].title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {heroItems[heroIndex].subtitle}
            </p>
          </div>
          
          {/* Hero Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevHero}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="flex gap-2">
              {heroItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === heroIndex 
                      ? 'bg-primary-foreground w-8' 
                      : 'bg-primary-foreground/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextHero}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Search & Filters */}
        <section className="space-y-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <div className="space-y-4">
            <CategoryChips 
              selected={selectedCategory} 
              onSelect={setSelectedCategory} 
            />
            <FilterBar
              filterType={filterType}
              sortType={sortType}
              onFilterChange={setFilterType}
              onSortChange={setSortType}
            />
          </div>
        </section>

        {/* Brand Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {searchQuery ? 'Search Results' : 'All Merchants'}
          </h2>
          {filteredBrands.length === 0 ? (
            <EmptyState type="no-results" />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {filteredBrands.map((brand) => (
                <BrandCard 
                  key={brand.id} 
                  brand={brand} 
                  onClick={setSelectedBrand}
                />
              ))}
            </div>
          )}
        </section>

        {/* Local Merchants Section */}
        {filterType !== 'online' && (
          <section className="bg-secondary/30 -mx-4 px-4 py-8 md:mx-0 md:rounded-2xl md:px-8">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">Local Businesses Near You</h2>
                <p className="text-muted-foreground">
                  Support your community and earn UPP
                </p>
              </div>

              {localMerchants.length === 0 ? (
                <EmptyState type="no-local" />
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {localMerchants.map((merchant) => (
                    <LocalMerchantCard
                      key={merchant.id}
                      merchant={merchant}
                      onClick={setSelectedBrand}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Trending Now */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {trendingBrands.slice(0, 6).map((brand) => (
              <BrandCard 
                key={brand.id} 
                brand={brand} 
                onClick={setSelectedBrand}
              />
            ))}
          </div>
        </section>

        {/* Top Earners */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Top UPP Earners</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {topEarners.map((brand) => (
              <BrandCard 
                key={brand.id} 
                brand={brand} 
                onClick={setSelectedBrand}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Brand Detail Modal */}
      <BrandDetailModal
        brand={selectedBrand}
        open={!!selectedBrand}
        onOpenChange={(open) => !open && setSelectedBrand(null)}
      />
    </div>
  );
};

export default Marketplace;
