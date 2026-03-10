import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AccountCard from '../../components/AccountCard';
import { useAccounts } from '../../api/accounts';
import { useRecentTransactions } from '../../api/transactions';
import { formatCurrency } from '../../utils/currency';
import { sumBy } from 'lodash';
import { getColumnDefinitions } from './utils/getColumnDefinitions';

const transactionColumns = getColumnDefinitions();

export default function Dashboard() {
  const { data: accounts = [], isLoading: accountsLoading, error: accountsError } = useAccounts();
  const { data: transactions = [], isLoading: txnsLoading, error: txnsError } = useRecentTransactions(50);

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

  const totalBalance = sumBy(accounts, (account) => account.attributes.balance.valueInBaseUnits);

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
      <DataGrid
        rows={transactions}
        columns={transactionColumns}
        getRowId={(row) => row.id}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        density='compact'
      />
    </Container>
  );
}
