import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { Listing } from '../types';

export function useListings() {
  return useQuery<Listing[]>({
    queryKey: ['listings'],
    queryFn: async () => {
      const res = await api.get('/api/listings/');
      return res.data;
    },
  });
}
