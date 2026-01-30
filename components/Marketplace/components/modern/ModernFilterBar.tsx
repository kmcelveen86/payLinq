"use client";

import { CategoryType, FilterType, SortType } from "@marketplace/types/marketplace";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "../ui/dropdown-menu";

interface ModernFilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: CategoryType;
    onCategorySelect: (category: CategoryType) => void;
    filterType: FilterType;
    onFilterChange: (type: FilterType) => void;
    sortType: SortType;
    onSortChange: (type: SortType) => void;
}

const categories: CategoryType[] = [
    "All",
    "Favorites",
    "Fashion",
    "Beauty",
    "Travel",
    "Electronics",
    "Dining",
    "Grocery",
    "Entertainment",
    "Local",
];

export const ModernFilterBar = ({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategorySelect,
    filterType,
    onFilterChange,
    sortType,
    onSortChange,
}: ModernFilterBarProps) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Input */}
                <div className="relative w-full md:w-96 group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                        <Search className="h-5 w-5" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search merchants, categories, or tags..."
                        className="w-full h-12 pl-10 pr-4 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-sm text-zinc-900 dark:text-white"
                    />
                </div>

                {/* Filter & Sort Controls */}
                <div className="flex items-center gap-2 self-start md:self-auto">
                    <div className="bg-white dark:bg-zinc-900 p-1 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center shadow-sm">
                        <button
                            onClick={() => onFilterChange("both")}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                filterType === "both" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-muted-foreground"
                            )}
                        >
                            All
                        </button>
                        <button
                            onClick={() => onFilterChange("online")}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                filterType === "online" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-muted-foreground"
                            )}
                        >
                            Online
                        </button>
                        <button
                            onClick={() => onFilterChange("local")}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                filterType === "local" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-muted-foreground"
                            )}
                        >
                            Local
                        </button>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-zinc-200 dark:border-zinc-800">
                                <SlidersHorizontal className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={sortType} onValueChange={(v) => onSortChange(v as SortType)}>
                                <DropdownMenuRadioItem value="recommended">Recommended</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="highest-upp">Highest Rewards</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="trending">Trending</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="near-me">Nearest</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {categories.map((category) => (
                    <motion.button
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onCategorySelect(category)}
                        className={cn(
                            "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
                            selectedCategory === category
                                ? "bg-black dark:bg-white text-white dark:text-black border-transparent shadow-lg shadow-black/20"
                                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm"
                        )}
                    >
                        {category}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
