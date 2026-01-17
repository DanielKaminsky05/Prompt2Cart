"use client";

import { Product } from "@/lib/mockData";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import Image from "next/image";

interface RecommendationsProps {
    products: Product[];
    selectedProducts: Product[];
    onToggleProduct: (product: Product) => void;
}

export function Recommendations({ products, selectedProducts, onToggleProduct }: RecommendationsProps) {
    if (products.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 space-y-6"
        >
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-accent rounded-full" />
                <h2 className="text-xl font-semibold text-white">Frequently Bought Together</h2>
            </div>

            {/* Horizontal scroll */}
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                {products.map((product, index) => {
                    const isSelected = selectedProducts.some((p) => p.id === product.id);
                    return (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.02, y: -3 }}
                            transition={{ delay: 0.1 * index }}
                            className={`
                                flex-shrink-0 w-48 glass-card rounded-xl overflow-hidden cursor-pointer transition-all duration-300
                                ${isSelected ? "ring-2 ring-primary glow-primary" : "hover:ring-2 hover:ring-accent"}
                            `}
                            onClick={() => onToggleProduct(product)}
                        >
                            <div className="relative aspect-square">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                {/* Checkbox */}
                                <div className="absolute top-2 right-2 z-10">
                                    <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={() => onToggleProduct(product)}
                                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                        className="h-5 w-5 bg-white/90 border border-white/20 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary shadow-lg"
                                    />
                                </div>

                                {/* Price badge */}
                                <div className="absolute bottom-2 right-2">
                                    <span className={`glass px-2 py-1 rounded-full text-sm font-bold ${isSelected ? "text-primary" : "text-accent"}`}>
                                        ${product.price.toFixed(0)}
                                    </span>
                                </div>
                            </div>
                            <div className="p-3">
                                <h4 className="text-sm font-medium text-white line-clamp-1">{product.name}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{product.store}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
