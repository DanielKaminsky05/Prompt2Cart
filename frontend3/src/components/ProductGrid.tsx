"use client";

import { Product } from "@/lib/mockData";
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";

interface ProductGridProps {
    products: Product[];
    selectedProducts: Product[];
    onToggleProduct: (product: Product) => void;
}

export function ProductGrid({ products, selectedProducts, onToggleProduct }: ProductGridProps) {
    if (products.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <ProductCard
                        product={product}
                        isSelected={selectedProducts.some((p) => p.id === product.id)}
                        onToggle={onToggleProduct}
                    />
                </motion.div>
            ))}
        </div>
    );
}
