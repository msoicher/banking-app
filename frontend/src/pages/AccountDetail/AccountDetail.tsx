import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import { DataGrid, type GridPaginationModel } from '@mui/x-data-grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getColumnDefinitions } from '../Dashboard/utils/getColumnDefinitions';
import { useAccount } from '../../api/accounts';
import { useAccountTransactions } from '../../api/transactions';
import { formatCurrency } from '../../utils/currency';

const PAGE_SIZE = 20;

function extractCursor(url: string | null): string | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    return u.searchParams.get('page[after]') ?? undefined;
  } catch {
    return undefined;
  }
}

export default function AccountDetail() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const columns = getColumnDefinitions();

  // Cursor stack: index 0 = first page (no cursor), subsequent entries are 'after' cursors
  const [cursorStack, setCursorStack] = useState<(string | undefined)[]>([undefined]);
  const [page, setPage] = useState(0);

  const currentCursor = cursorStack[page];

  const { data: account, isLoading: accountLoading, error: accountError } = useAccount(id);
  const { data: txnPage, isFetching: txnsFetching, error: txnsError } = useAccountTransactions(
    id,
    PAGE_SIZE,
    currentCursor,
  );

  const error = accountError || txnsError;

  const nextCursor = extractCursor(txnPage?.links.next ?? null);
  const hasNext = !!nextCursor;

  // rowCount tricks the DataGrid into showing/hiding the Next button:
  // if hasNext, report one extra row beyond the current page so Next stays enabled.
  const rowCount = hasNext ? (page + 1) * PAGE_SIZE + 1 : (page + 1) * PAGE_SIZE;

  const handlePaginationModelChange = useCallback(
    (model: GridPaginationModel) => {
      const newPage = model.page;
      if (newPage > page) {
        // Moving forward — push next cursor onto the stack if not already there
        if (nextCursor) {
          setCursorStack((prev) => {
            const next = [...prev];
            if (next.length <= newPage) next.push(nextCursor);
            return next;
          });
        }
      }
      setPage(newPage);
    },
    [page, nextCursor],
  );

  if (accountLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">Failed to load data: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <IconButton onClick={() => navigate('/')} size="small" aria-label="Back to dashboard">
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {account?.attributes.displayName}
          </Typography>
          {account && (
            <Typography variant="body2" color="text.secondary">
              {formatCurrency(
                account.attributes.balance.currencyCode,
                account.attributes.balance.valueInBaseUnits,
              )}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Transactions */}
      <DataGrid
        rows={txnPage?.data ?? []}
        columns={columns}
        getRowId={(row) => row.id}
        paginationMode="server"
        paginationModel={{ page, pageSize: PAGE_SIZE }}
        onPaginationModelChange={handlePaginationModelChange}
        rowCount={rowCount}
        pageSizeOptions={[PAGE_SIZE]}
        loading={txnsFetching}
        disableRowSelectionOnClick
        density='compact'
      />
    </Container>
  );
}
