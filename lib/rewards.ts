
// WOW Points Table - Fixed Reward Points per Transaction by Category
// Source: Discord "WOW Base Paylinq Cash" tables

export const WOW_POINTS_TABLE: Record<string, number> = {
    // Travel & Transportation (Signature WOW)
    "flights": 1500,
    "hotels": 1000, // Per night (Note: Transaction level logic may just see "Hotel" charge)
    "vacation_rentals": 1000,
    "car_rentals": 500,
    "rideshare": 80,
    "cruises": 1800,

    // Retail & Commerce
    "apparel": 150,
    "footwear": 180,
    "accessories": 100,
    "jewelry": 250,
    "beauty": 120,
    "health": 110,
    "eyewear": 200,
    "bags": 220,
    "luxury": 350,
    "streetwear": 250,

    // Food & Beverage
    "restaurants": 150, // Dine-In
    "fast_food": 80,
    "coffee": 60,
    "bars": 120,
    "food_delivery": 150,
    "grocery": 120,
    "meal_kits": 180,
    "specialty_food": 200,

    // Entertainment
    "movies": 100,
    "live_events": 400,
    "sports": 400,
    "amusement_parks": 350,
    "gaming": 120,
    "events": 600,

    // Home & Living
    "furniture": 400,
    "home_decor": 200,
    "appliances": 500,
    "home_improvement": 350,
    "smart_home": 300,
    "landscaping": 300,
    "moving": 600,

    // Media & Lifestyle
    "books": 80,

    // Mobility, Family & Pets
    "vehicle_accessories": 200,
    "toys": 120,
    "baby": 150,
    "pet_food": 120
};

const DEFAULT_POINTS = 100; // General Retail fallback

/**
 * Calculates the fixed WOW points for a given category.
 * Currently ignores amount_cents as the model is fixed-per-transaction.
 */
export function calculateWowPoints(category: string | null | undefined, amount_cents: number): number {
    if (!category) return DEFAULT_POINTS;

    // Normalize category string: lowercase, remove special chars if needed
    const normalizedKey = category.toLowerCase().trim().replace(/\s+/g, '_').replace(/&/g, '').replace(/__+/g, '_');

    // Direct lookup
    if (WOW_POINTS_TABLE[normalizedKey]) {
        return WOW_POINTS_TABLE[normalizedKey];
    }

    // Fuzzy matching / Fallbacks
    if (normalizedKey.includes('flight') || normalizedKey.includes('airline')) return WOW_POINTS_TABLE['flights'];
    if (normalizedKey.includes('hotel') || normalizedKey.includes('lodging')) return WOW_POINTS_TABLE['hotels'];
    if (normalizedKey.includes('taxi') || normalizedKey.includes('uber') || normalizedKey.includes('lyft')) return WOW_POINTS_TABLE['rideshare'];
    if (normalizedKey.includes('food') || normalizedKey.includes('restaurant') || normalizedKey.includes('dining')) return WOW_POINTS_TABLE['restaurants'];
    if (normalizedKey.includes('grocery') || normalizedKey.includes('supermarket')) return WOW_POINTS_TABLE['grocery'];
    if (normalizedKey.includes('coffee') || normalizedKey.includes('cafe')) return WOW_POINTS_TABLE['coffee'];

    return DEFAULT_POINTS;
}
