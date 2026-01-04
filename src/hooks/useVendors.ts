import { useState, useCallback, useEffect } from 'react';
import { api } from '../services/api';

export interface Vendor {
  id: string;
  name: string;
  rating: number;
  location: string;
  products: string[];
  phone?: string;
}

export const useVendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchVendors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.getSuppliers('');
      setVendors(response.data || response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const updateVendor = useCallback(
    async (id: string, data: Partial<Vendor>) => {
      try {
        await api.updateSupplier(id, data);
        await fetchVendors();
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        throw err;
      }
    },
    [fetchVendors]
  );

  return {
    vendors,
    loading,
    error,
    fetchVendors,
    updateVendor,
  };
};

export default useVendors;
