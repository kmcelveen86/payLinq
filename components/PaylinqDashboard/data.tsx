import { Coffee, ShoppingBag, Utensils, Car, Home } from "lucide-react";
// Mock user data
const userData = {
  name: "Greg Davis",
  profileImage: "",
  totalPoints: 12845,
  pointsThisMonth: 1250,
  pointsToNextReward: 155,
  cardLastFour: "4832",
  planTier: "FreemiumFake",
  memberSince: "October 2023",
  recentTransactions: [
    {
      id: 1,
      merchant: "Starbucks Coffee",
      date: "Today",
      amount: 7.45,
      points: 15,
      category: "dining",
      icon: <Coffee size={20} />,
      multiplier: 2,
    },
    {
      id: 2,
      merchant: "Amazon.com",
      date: "Yesterday",
      amount: 34.99,
      points: 35,
      category: "shopping",
      icon: <ShoppingBag size={20} />,
      multiplier: 1,
    },
    {
      id: 3,
      merchant: "Local Bistro",
      date: "Oct 20, 2023",
      amount: 86.23,
      points: 172,
      category: "dining",
      icon: <Utensils size={20} />,
      multiplier: 2,
    },
    {
      id: 4,
      merchant: "Uber",
      date: "Oct 19, 2023",
      amount: 12.5,
      points: 25,
      category: "travel",
      icon: <Car size={20} />,
      multiplier: 2,
    },
    {
      id: 5,
      merchant: "Whole Foods",
      date: "Oct 18, 2023",
      amount: 65.78,
      points: 66,
      category: "grocery",
      icon: <Home size={20} />,
      multiplier: 1,
    },
  ],
  upcomingRewards: [
    {
      id: 1,
      name: "Coffee Shop Voucher",
      points: 5000,
      discount: "$25 off",
    },
    {
      id: 2,
      name: "Movie Tickets",
      points: 10000,
      discount: "2 for 1",
    },
    {
      id: 3,
      name: "Cash Redemption",
      points: 20000,
      discount: "$100 value",
    },
  ],
  freemiumLimits: {
    maxPointsPerMonth: 10000,
    maxPointsPerYear: 120000,
    pointMultipliers: {
      everyday: 1,
      dining: 2,
      travel: 2,
    },
    redemptionRate: 0.005, // $0.005 per point
    pointsFor100: 20000,
    expirationMonths: 18,
  },
};

export default userData;
