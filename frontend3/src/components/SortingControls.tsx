"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpDown, TrendingUp, DollarSign, Clock, Star } from "lucide-react";

export type SortOption = "relevance" | "price-low" | "price-high" | "delivery" | "rating";

interface SortingControlsProps {
    currentSort: SortOption;
    onSortChange: (sort: SortOption) => void;
}

const sortOptions = [
    { value: "relevance" as SortOption, label: "Relevance", icon: TrendingUp },
    { value: "price-low" as SortOption, label: "Price: Low", icon: DollarSign },
    { value: "price-high" as SortOption, label: "Price: High", icon: DollarSign },
    { value: "delivery" as SortOption, label: "Fastest", icon: Clock },
    { value: "rating" as SortOption, label: "Top Rated", icon: Star },
];

export function SortingControls({ currentSort, onSortChange }: SortingControlsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 flex-wrap"
        >
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                <ArrowUpDown className="h-4 w-4" />
                Sort by:
            </span>
            <div className="flex gap-1.5 flex-wrap">
                {sortOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = currentSort === option.value;
                    return (
                        <Button
                            key={option.value}
                            variant={isActive ? "default" : "outline"}
                            size="sm"
                            onClick={() => onSortChange(option.value)}
                            className={`
                h-8 px-3 text-xs gap-1.5 rounded-full transition-all
                ${isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "glass border-white/10 text-muted-foreground hover:text-white hover:bg-white/5"
                                }
              `}
                        >
                            <Icon className="h-3 w-3" />
                            {option.label}
                        </Button>
                    );
                })}
            </div>
        </motion.div>
    );
}
