export interface MoneyObject {
  currencyCode: string;
  value: string;
  valueInBaseUnits: number;
}

export interface Account {
  type: 'accounts';
  id: string;
  attributes: {
    displayName: string;
    accountType: 'SAVER' | 'TRANSACTIONAL' | 'HOME_LOAN';
    ownershipType: 'INDIVIDUAL' | 'JOINT';
    balance: MoneyObject;
    createdAt: string;
  };
}

export interface Transaction {
  type: 'transactions';
  id: string;
  attributes: {
    status: 'HELD' | 'SETTLED';
    rawText: string | null;
    description: string;
    message: string | null;
    amount: MoneyObject;
    settledAt: string | null;
    createdAt: string;
  };
  relationships: {
    account: { data: { type: string; id: string } };
    category: { data: { type: string; id: string } | null };
  };
}

export interface UpListResponse<T> {
  data: T[];
  links: {
    prev: string | null;
    next: string | null;
  };
}

export interface UpSingleResponse<T> {
  data: T;
}
