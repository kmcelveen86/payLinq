import { Coffee, ShoppingBag, Utensils, Car, Home } from "lucide-react";

// Recent transactions for the current month
const recentTransactions = [
  {
    id: 1,
    merchant: "Starbucks Coffee",
    date: "Today",
    amount: 7.45,
    points: 7, // 1 point per $1 (everyday purchases)
    category: "dining",
    icon: <Coffee size={20} />,
  },
  {
    id: 2,
    merchant: "Amazon.com",
    date: "Yesterday",
    amount: 34.99,
    points: 35, // 1 point per $1 (everyday purchases)
    category: "shopping",
    icon: <ShoppingBag size={20} />,
  },
  {
    id: 3,
    merchant: "Local Bistro",
    date: "2 days ago",
    amount: 86.23,
    points: 86, // 1 point per $1 (everyday purchases)
    category: "dining",
    icon: <Utensils size={20} />,
  },
  {
    id: 4,
    merchant: "Uber",
    date: "3 days ago",
    amount: 12.5,
    points: 13, // 1 point per $1 (everyday purchases)
    category: "travel",
    icon: <Car size={20} />,
  },
  {
    id: 5,
    merchant: "Whole Foods",
    date: "4 days ago",
    amount: 65.78,
    points: 66, // 1 point per $1 (everyday purchases)
    category: "grocery",
    icon: <Home size={20} />,
  },
];

// Calculate points from recent transactions
const pointsFromRecentTransactions = recentTransactions.reduce(
  (sum, transaction) => sum + transaction.points,
  0
); // = 207 points

// Mock user data
const userData = {
  name: "Greg Davis",
  profileImage: "",
  totalPoints: 12845, // Historical total (includes all past months)
  pointsThisMonth: pointsFromRecentTransactions, // Points earned this month from recent transactions = 207
  cardLastFour: "4832",
  planTier: "White",
  memberSince: "October 2023",
  recentTransactions,
  upcomingRewards: [
    {
      id: 1,
      name: "Coffee Shop Voucher",
      points: 1000,
      discount: "$10 value",
    },
    {
      id: 2,
      name: "Gift Card",
      points: 5000,
      discount: "$50 value",
    },
    {
      id: 3,
      name: "Cash Redemption",
      points: 10000,
      discount: "$100 value",
    },
  ],
  whiteLimits: {
    redemptionRate: 0.01, // $0.01 per point (1000 points = $10 for White tier)
  },
};

export default userData;
