import { useState, useCallback, useEffect } from 'react';
import { api } from '../services/api';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  status: 'in-stock' | 'low' | 'critical';
  supplier: string;
  lastUpdated: string;
}

export const useInventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchInventory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.getInventory('');
      setItems(response.data || response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const updateItem = useCallback(
    async (id: string, data: Partial<InventoryItem>) => {
      try {
        await api.updateInventory(id, data);
        await fetchInventory();
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        throw err;
      }
    },
    [fetchInventory]
  );

  const createItem = useCallback(
    async (data: Omit<InventoryItem, 'id'>) => {
      try {
        await api.createInventory(data);
        await fetchInventory();
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        throw err;
      }
    },
    [fetchInventory]
  );

  return {
    items,
    loading,
    error,
    fetchInventory,
    updateItem,
    createItem,
  };
};

export default useInventory;
