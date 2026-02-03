import { Coffee, ShoppingBag, Utensils, Car, Home } from "lucide-react";

// Recent transactions for the current month
// Recent transactions for the current month
const recentTransactions: any[] = [];

// Calculate points from recent transactions
const pointsFromRecentTransactions = recentTransactions.reduce(
  (sum, transaction) => sum + transaction.points,
  0
); // = 207 points

// Basic types for dashboard data
export interface Transaction {
  id: number;
  merchant: string;
  date: string;
  amount: number;
  points: number;
  category: string;
  icon: any;
}

export interface Reward {
  id: number;
  name: string;
  points: number;
  discount: string;
}

// Mock user data (Defaults for new users until real data loads)
const userData = {
  name: "Member",
  profileImage: "",
  totalPoints: 0,
  pointsThisMonth: 0,
  cardLastFour: "----",
  planTier: "none",
  memberSince: "2024",
  recentTransactions: [] as Transaction[],
  upcomingRewards: [] as Reward[],
  whiteLimits: {
    redemptionRate: 0.01,
  },
};

export default userData;
