export interface Brand {
  id: string;
  name: string;
  logo: string;
  category: string;
  uppEarningRate: number; // percentage or points per $10
  uppEarningType: 'percentage' | 'fixed';
  tags: ('local' | 'trending' | 'new' | 'editors-pick')[];
  isLocal: boolean;
  tagline?: string;
  description?: string;
  distance?: number; // miles, for local only
  address?: string;
  hours?: string;
  coordinates?: { lat: number; lng: number };
  offers?: Offer[];
  featuredItems?: FeaturedItem[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  bonusUpp: number;
  expiresAt?: Date;
}

export interface FeaturedItem {
  id: string;
  name: string;
  image: string;
  category: string;
}

export type CategoryType = 
  | 'Fashion' 
  | 'Beauty' 
  | 'Travel' 
  | 'Electronics' 
  | 'Dining' 
  | 'Grocery' 
  | 'Entertainment' 
  | 'Local' 
  | 'All';

export type FilterType = 'online' | 'local' | 'both';

export type SortType = 
  | 'recommended' 
  | 'highest-upp' 
  | 'trending' 
  | 'newest' 
  | 'near-me';
