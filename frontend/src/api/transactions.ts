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

const getAccountTransactions = async (
  accountId: string,
  pageSize: number,
  pageAfter?: string,
): Promise<UpListResponse<Transaction>> => {
  const res = await client.get<UpListResponse<Transaction>>(
    `/transactions/account/${accountId}`,
    { params: { pageSize, pageAfter } },
  );
  return res.data;
};

export const useAccountTransactions = (
  accountId: string,
  pageSize: number,
  pageAfter?: string,
) =>
  useQuery({
    queryKey: ['accountTransactions', accountId, pageSize, pageAfter],
    queryFn: () => getAccountTransactions(accountId, pageSize, pageAfter),
  });
