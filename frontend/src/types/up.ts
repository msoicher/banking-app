// Types are generated from Up Banking's official OpenAPI spec.
// To regenerate: npm run generate:types
import type { components } from './up-api';

export type Account = components['schemas']['AccountResource'];
export type Transaction = components['schemas']['TransactionResource'];

// Generic paginated list wrapper — matches the shape of all Up list responses
// (ListAccountsResponse, ListTransactionsResponse, etc.) but keeps our API
// hooks generic rather than tied to a specific resource type.
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
