import { useEffect, useCallback, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

type StockMap = Record<string, number>;

export function useRealtimeStock(products: Product[]) {
  const [stockMap, setStockMap] = useState<StockMap>(() => {
    const map: StockMap = {};
    products.forEach((p) => {
      if (p.stockQuantity !== undefined) {
        map[p.id] = p.stockQuantity;
      }
    });
    return map;
  });

  // Initialize stock from current products
  useEffect(() => {
    const map: StockMap = {};
    products.forEach((p) => {
      if (p.stockQuantity !== undefined) {
        map[p.id] = p.stockQuantity;
      }
    });
    setStockMap(map);
  }, [products]);

  // Subscribe to real-time changes on the products table
  useEffect(() => {
    const channel = supabase
      .channel('products-stock-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'products',
        },
        (payload) => {
          const newProduct = payload.new as any;
          if (newProduct.id && newProduct.stock_quantity !== undefined) {
            setStockMap((prev) => ({
              ...prev,
              [newProduct.id]: newProduct.stock_quantity,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getStock = useCallback((productId: string): number | undefined => {
    return stockMap[productId];
  }, [stockMap]);

  const isLowStock = useCallback((productId: string, threshold = 3): boolean => {
    const stock = stockMap[productId];
    return stock !== undefined && stock <= threshold && stock > 0;
  }, [stockMap]);

  const isOutOfStock = useCallback((productId: string): boolean => {
    const stock = stockMap[productId];
    return stock !== undefined && stock <= 0;
  }, [stockMap]);

  return {
    stockMap,
    getStock,
    isLowStock,
    isOutOfStock,
  };
}
