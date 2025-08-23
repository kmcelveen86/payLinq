"use client";
import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Plus,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CalendarDays,
  DollarSign,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Search,
  Eye,
  EyeOff,
  Building,
} from "lucide-react";

// Type definitions
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  status: "completed" | "pending";
}

interface BankInstitution {
  name: string;
  logo: string;
  color: string;
}

interface BankAccount {
  id: string;
  name: string;
  type: string;
  accountNumber: string;
  balance: number;
  currency: string;
  connected: string;
  institution: BankInstitution;
  transactions: Transaction[];
}

interface PopularBank {
  id: string;
  name: string;
  color: string;
}

// Paylinq brand colors
const COLORS = {
  primary: "#2D9642", // Green
  primaryLight: "#38b053",
  primaryDark: "#27833a",
  secondary: "#C28F49", // Amber/Gold
  secondaryLight: "#d9a55c",
  secondaryDark: "#b3813f",
  success: "#2D9642",
  warning: "#C28F49",
  danger: "#E21836",
  light: "#F2F2F0",
  dark: "#333333",
  white: "#FFFFFF",
};

// Mock data for demonstration
const mockBankAccounts: BankAccount[] = [
  {
    id: "acct_1",
    name: "Primary Checking",
    type: "Checking",
    accountNumber: "****4567",
    balance: 5241.75,
    currency: "USD",
    connected: "2023-09-15",
    institution: {
      name: "Chase Bank",
      logo: "chase.png",
      color: "#117ACA",
    },
    transactions: [
      {
        id: "tx_1",
        date: "2025-05-12",
        description: "Grocery Store",
        amount: -87.32,
        category: "Groceries",
        status: "completed",
      },
      {
        id: "tx_2",
        date: "2025-05-10",
        description: "Monthly Salary",
        amount: 2750.0,
        category: "Income",
        status: "completed",
      },
      {
        id: "tx_3",
        date: "2025-05-09",
        description: "Electric Bill",
        amount: -124.56,
        category: "Utilities",
        status: "completed",
      },
      {
        id: "tx_4",
        date: "2025-05-07",
        description: "Online Shopping",
        amount: -65.99,
        category: "Shopping",
        status: "completed",
      },
    ],
  },
  {
    id: "acct_2",
    name: "Savings Account",
    type: "Savings",
    accountNumber: "****2290",
    balance: 12480.33,
    currency: "USD",
    connected: "2023-12-03",
    institution: {
      name: "Bank of America",
      logo: "boa.png",
      color: "#E21836",
    },
    transactions: [
      {
        id: "tx_5",
        date: "2025-04-28",
        description: "Transfer from Checking",
        amount: 500.0,
        category: "Transfer",
        status: "completed",
      },
      {
        id: "tx_6",
        date: "2025-04-15",
        description: "Interest Payment",
        amount: 12.45,
        category: "Interest",
        status: "completed",
      },
      {
        id: "tx_7",
        date: "2025-03-28",
        description: "Transfer from Checking",
        amount: 500.0,
        category: "Transfer",
        status: "completed",
      },
    ],
  },
  {
    id: "acct_3",
    name: "Joint Account",
    type: "Checking",
    accountNumber: "****8821",
    balance: 3254.12,
    currency: "USD",
    connected: "2024-02-18",
    institution: {
      name: "Wells Fargo",
      logo: "wells.png",
      color: "#D71E28",
    },
    transactions: [
      {
        id: "tx_8",
        date: "2025-05-13",
        description: "Internet Provider",
        amount: -79.99,
        category: "Utilities",
        status: "pending",
      },
      {
        id: "tx_9",
        date: "2025-05-12",
        description: "Dinner Restaurant",
        amount: -128.5,
        category: "Dining",
        status: "completed",
      },
      {
        id: "tx_10",
        date: "2025-05-10",
        description: "Gym Membership",
        amount: -45.0,
        category: "Health & Fitness",
        status: "completed",
      },
    ],
  },
];

// Color function for transaction amounts
const getAmountColor = (amount: number): string => {
  if (amount > 0) return `text-${COLORS.primary.replace("#", "")}`;
  if (amount < 0) return "text-red-600";
  return "text-gray-600";
};

// Format currency
const formatCurrency = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

// Format transaction amount (showing + for positive)
const formatTransactionAmount = (amount: number, currency = "USD"): string => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    signDisplay: "exceptZero",
  }).format(amount);
  return formatted;
};

// BankAccountCard Component
interface BankAccountCardProps {
  account: BankAccount;
}

const BankAccountCard: React.FC<BankAccountCardProps> = ({ account }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentFilter, setCurrentFilter] = useState<string>("all");

  // Filter transactions based on search term and filter
  const filteredTransactions = account.transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (currentFilter === "all") return matchesSearch;
    if (currentFilter === "income")
      return matchesSearch && transaction.amount > 0;
    if (currentFilter === "expense")
      return matchesSearch && transaction.amount < 0;
    if (currentFilter === "pending")
      return matchesSearch && transaction.status === "pending";

    return matchesSearch;
  });

  // Get institution logo placeholder
  const getInstitutionInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className="rounded-2xl shadow-lg overflow-hidden h-full transform transition-all duration-300 hover:shadow-xl"
      style={{
        background:
          "linear-gradient(135deg, rgb(247, 247, 247) 0%, rgb(245, 245, 245) 100%)",
        borderTop: `3px solid ${COLORS.primary}`,
      }}
    >
      <div className="p-6">
        {/* Card Header with Institution Logo */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-3"
              style={{ backgroundColor: account.institution.color }}
            >
              {getInstitutionInitials(account.institution.name)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {account.name}
              </h3>
              <p className="text-sm text-gray-600">
                {account.institution.name} • {account.type}
              </p>
            </div>
          </div>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>

        {/* Account Details */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Current Balance</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-gray-500 hover:text-gray-700"
            >
              {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900 mr-2">
              {showBalance ? formatCurrency(account.balance) : "••••••••"}
            </span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
              Available
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Account Number: {account.accountNumber}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 mb-4">
          <button className="px-3 py-2 bg-white rounded-lg text-sm flex items-center border border-gray-200 shadow-sm hover:bg-gray-50">
            <RefreshCw
              size={14}
              className="mr-1"
              style={{ color: COLORS.primary }}
            />
            <span>Refresh</span>
          </button>
          <button className="px-3 py-2 bg-white rounded-lg text-sm flex items-center border border-gray-200 shadow-sm hover:bg-gray-50">
            <ExternalLink
              size={14}
              className="mr-1"
              style={{ color: COLORS.secondary }}
            />
            <span>Go to Bank</span>
          </button>
        </div>

        {/* Transactions Section - Conditionally rendered based on expanded state */}
        {expanded && (
          <div className="mt-4">
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">
                Recent Transactions
              </h4>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
                <div className="relative w-full">
                  <Search
                    size={16}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2 w-full sm:w-auto">
                  <button
                    onClick={() => setCurrentFilter("all")}
                    className={`px-3 py-2 text-xs rounded-lg ${
                      currentFilter === "all"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setCurrentFilter("income")}
                    className={`px-3 py-2 text-xs rounded-lg ${
                      currentFilter === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    Income
                  </button>
                  <button
                    onClick={() => setCurrentFilter("expense")}
                    className={`px-3 py-2 text-xs rounded-lg ${
                      currentFilter === "expense"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    Expenses
                  </button>
                  <button
                    onClick={() => setCurrentFilter("pending")}
                    className={`px-3 py-2 text-xs rounded-lg ${
                      currentFilter === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    Pending
                  </button>
                </div>
              </div>

              {filteredTransactions.length > 0 ? (
                <div className="space-y-3">
                  {filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className={`p-3 rounded-lg hover:bg-gray-50 ${
                        transaction.status === "pending"
                          ? "border"
                          : "bg-white border border-gray-100"
                      }`}
                      style={
                        transaction.status === "pending"
                          ? {
                              backgroundColor: `${COLORS.secondary}10`,
                              borderColor: `${COLORS.secondary}30`,
                            }
                          : {}
                      }
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.description}
                          </div>
                          <div className="text-xs text-gray-600 flex items-center mt-1">
                            <CalendarDays size={12} className="mr-1" />
                            {new Date(transaction.date).toLocaleDateString()}
                            <span className="mx-2">•</span>
                            {transaction.category}
                            {transaction.status === "pending" && (
                              <>
                                <span className="mx-2">•</span>
                                <span className="text-amber-600 flex items-center">
                                  <AlertCircle
                                    size={12}
                                    className="mr-1"
                                    style={{ color: COLORS.secondary }}
                                  />
                                  <span style={{ color: COLORS.secondary }}>
                                    Pending
                                  </span>
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div
                          className={`font-medium ${getAmountColor(
                            transaction.amount
                          )}`}
                        >
                          {formatTransactionAmount(transaction.amount)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No transactions found</p>
                  <p className="text-sm mt-1">Try adjusting your filters</p>
                </div>
              )}

              {account.transactions.length > 4 && (
                <button
                  className="w-full mt-4 py-2 text-sm text-center font-medium"
                  style={{ color: COLORS.primary }}
                >
                  View All Transactions
                  <ArrowRight size={14} className="inline ml-1" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Connect New Bank Component
const ConnectBankCard: React.FC = () => {
  const [hoveredBank, setHoveredBank] = useState<string | null>(null);
  const popularBanks: PopularBank[] = [
    { id: "chase", name: "Chase", color: "#117ACA" },
    { id: "boa", name: "Bank of America", color: "#E21836" },
    { id: "wells", name: "Wells Fargo", color: "#D71E28" },
    { id: "citi", name: "Citibank", color: "#003B70" },
  ];

  return (
    <div
      className="rounded-2xl shadow-lg overflow-hidden h-full"
      style={{
        background: `linear-gradient(135deg, ${COLORS.primary}08 0%, ${COLORS.secondary}08 100%)`,
        borderTop: `3px solid ${COLORS.secondary}`,
      }}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Connect a Bank Account
          </h3>
          <Building size={24} style={{ color: COLORS.secondary }} />
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Link your bank accounts to track your finances in one place and earn
          more rewards.
        </p>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Popular Banks</h4>
          <div className="grid grid-cols-2 gap-3">
            {popularBanks.map((bank) => (
              <button
                key={bank.id}
                className="p-3 rounded-lg border border-gray-200 flex items-center justify-between bg-white hover:bg-gray-50"
                onMouseEnter={() => setHoveredBank(bank.id)}
                onMouseLeave={() => setHoveredBank(null)}
              >
                <div className="flex items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-2"
                    style={{ backgroundColor: bank.color }}
                  >
                    {bank.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{bank.name}</span>
                </div>
                {hoveredBank === bank.id && (
                  <div style={{ color: COLORS.primary }}>
                    <Plus size={16} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-auto">
          <button
            className="w-full px-4 py-3 text-white rounded-lg font-semibold shadow-sm hover:from-green-700 hover:to-green-800"
            style={{
              background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.primaryLight})`,
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = `linear-gradient(to right, ${COLORS.primaryDark}, ${COLORS.primary})`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = `linear-gradient(to right, ${COLORS.primary}, ${COLORS.primaryLight})`;
            }}
          >
            Connect Any Bank
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Secure connection using bank-level encryption.
            <br />
            Your credentials are never stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Component
const BankAccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>(mockBankAccounts);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [animateBackground, setAnimateBackground] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Trigger background animation on mount
  useEffect(() => {
    if (isMounted) {
      setAnimateBackground(true);
    }
  }, [isMounted]);

  return (
    <div className="relative overflow-hidden min-h-screen p-6 pt-24 font-sans text-gray-800 bg-[#F2F2F0]">
      {/* Main content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Bank Accounts
          </h1>
          <div className="flex items-center">
            <div
              style={{
                width: "3px",
                height: "20px",
                backgroundColor: COLORS.primary,
                marginRight: "10px",
              }}
            ></div>
            <p className="text-gray-600">
              Manage and track all your bank accounts in one place
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Balance</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(
                    accounts.reduce((sum, account) => sum + account.balance, 0)
                  )}
                </h3>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.primary}15` }}
              >
                <DollarSign size={20} style={{ color: COLORS.primary }} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Accounts</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {accounts.length}
                </h3>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.secondary}15` }}
              >
                <CreditCard size={20} style={{ color: COLORS.secondary }} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Recent Transactions</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {accounts.reduce(
                    (sum, account) => sum + account.transactions.length,
                    0
                  )}
                </h3>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#E6F0F9" }}
              >
                <RefreshCw size={20} style={{ color: "#3B82F6" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bank Accounts Grid with Connect New Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {accounts.map((account) => (
            <BankAccountCard key={account.id} account={account} />
          ))}

          <ConnectBankCard />
        </div>
      </div>

      {/* Decorative gradient element at bottom */}
      <div
        className="h-2 w-full fixed bottom-0 left-0"
        style={{
          background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
        }}
      ></div>
    </div>
  );
};

export default BankAccountsPage;
