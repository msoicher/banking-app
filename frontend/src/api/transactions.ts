import { useQuery } from '@tanstack/react-query';
import client from './client';
import type { Transaction, UpListResponse } from '../types/up';

const getRecentTransactions = async (pageSize = 10): Promise<Transaction[]> => {
  const res = await client.get<UpListResponse<Transaction>>('/transactions', {
    params: { pageSize },
  });
  return res.data.data;
};

export const useRecentTransactions = (pageSize = 10) =>
  useQuery({ queryKey: ['transactions', pageSize], queryFn: () => getRecentTransactions(pageSize) });
