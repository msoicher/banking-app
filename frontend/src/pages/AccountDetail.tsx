import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAccount } from '../api/accounts';
import { useAccountTransactions } from '../api/transactions';
import { formatCurrency } from '../utils/currency';
import { renderTransactionAmount } from '../utils/renderTransactionAmount';

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

  // Cursor stack: index 0 = first page (no cursor), subsequent entries are 'after' cursors
  const [cursorStack, setCursorStack] = useState<(string | undefined)[]>([undefined]);
  const [page, setPage] = useState(0);

  const currentCursor = cursorStack[page];

  const { data: account, isLoading: accountLoading, error: accountError } = useAccount(id);
  const { data: txnPage, isLoading: txnsLoading, error: txnsError } = useAccountTransactions(
    id,
    PAGE_SIZE,
    currentCursor,
  );

  const isLoading = accountLoading || txnsLoading;
  const error = accountError || txnsError;

  const nextCursor = extractCursor(txnPage?.links.next ?? null);
  const hasNext = !!nextCursor;
  const hasPrev = page > 0;

  const handleNextPage = useCallback(() => {
    if (!nextCursor) return;
    setCursorStack((prev) => {
      const next = [...prev];
      // Only push if this page's cursor isn't already in the stack
      if (next.length <= page + 1) {
        next.push(nextCursor);
      }
      return next;
    });
    setPage((p) => p + 1);
  }, [nextCursor, page]);

  const handlePrevPage = useCallback(() => {
    setPage((p) => Math.max(0, p - 1));
  }, []);

  if (isLoading) {
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

  const transactions = txnPage?.data ?? [];

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

      {/* Transactions table */}
      <Paper variant="outlined">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((txn) => {
                  const { description, status, amount, createdAt } = txn.attributes;
                  const isDebit = amount.valueInBaseUnits < 0;
                  const date = new Date(createdAt).toLocaleDateString('en-AU', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <TableRow key={txn.id} hover>
                      <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                        {date}
                      </TableCell>
                      <TableCell>{description}</TableCell>
                      <TableCell>
                        <Chip
                          label={status}
                          size="small"
                          color={status === 'SETTLED' ? 'success' : 'warning'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: 600,
                          color: isDebit ? 'error.main' : 'success.main',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {renderTransactionAmount(txn)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={-1}
          rowsPerPage={PAGE_SIZE}
          rowsPerPageOptions={[PAGE_SIZE]}
          page={page}
          onPageChange={(_e, newPage) => {
            if (newPage > page) handleNextPage();
            else handlePrevPage();
          }}
          slotProps={{
            actions: {
              nextButton: { disabled: !hasNext },
              previousButton: { disabled: !hasPrev },
            },
          }}
          labelDisplayedRows={({ page: p }) => `Page ${p + 1}`}
        />
      </Paper>
    </Container>
  );
}
