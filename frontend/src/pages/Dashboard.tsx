import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import AccountCard from '../components/AccountCard';
import TransactionRow from '../components/TransactionRow';
import { useAccounts } from '../api/accounts';
import { useRecentTransactions } from '../api/transactions';
import { formatCurrency } from '../utils/currency';

export default function Dashboard() {
  const { data: accounts = [], isLoading: accountsLoading, error: accountsError } = useAccounts();
  const { data: transactions = [], isLoading: txnsLoading, error: txnsError } = useRecentTransactions(10);

  const isLoading = accountsLoading || txnsLoading;
  const error = accountsError || txnsError;

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

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + acc.attributes.balance.valueInBaseUnits,
    0,
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Total balance:{' '}
          <strong>{formatCurrency('AUD', totalBalance)}</strong>
        </Typography>
      </Box>

      {/* Accounts */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        Accounts
      </Typography>
      <Grid container spacing={2} mb={5}>
        {accounts.map((account) => (
          <Grid key={account.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <AccountCard account={account} />
          </Grid>
        ))}
      </Grid>

      {/* Recent transactions */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        Recent Transactions
      </Typography>
      <Card variant="outlined">
        <CardContent>
          {transactions.length === 0 ? (
            <Typography color="text.secondary">No transactions found.</Typography>
          ) : (
            <List disablePadding>
              {transactions.map((txn) => (
                <TransactionRow key={txn.id} transaction={txn} />
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
