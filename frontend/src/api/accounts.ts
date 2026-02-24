import { useQuery } from '@tanstack/react-query';
import client from './client';
import type { Account, UpListResponse, UpSingleResponse } from '../types/up';

const getAccounts = async (): Promise<Account[]> => {
  const res = await client.get<UpListResponse<Account>>('/accounts');
  return res.data.data;
};

const getAccount = async (id: string): Promise<Account> => {
  const res = await client.get<UpSingleResponse<Account>>(`/accounts/${id}`);
  return res.data.data;
};

export const useAccounts = () =>
  useQuery({ queryKey: ['accounts'], queryFn: getAccounts });

export const useAccount = (id: string) =>
  useQuery({ queryKey: ['accounts', id], queryFn: () => getAccount(id) });
