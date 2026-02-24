import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import type { Account } from '../types/up';

interface Props {
  account: Account;
}

const accountTypeLabel: Record<Account['attributes']['accountType'], string> = {
  TRANSACTIONAL: 'Spending',
  SAVER: 'Saver',
  HOME_LOAN: 'Home Loan',
};

const accountTypeColor: Record<
  Account['attributes']['accountType'],
  'primary' | 'secondary' | 'default'
> = {
  TRANSACTIONAL: 'primary',
  SAVER: 'secondary',
  HOME_LOAN: 'default',
};

export default function AccountCard({ account }: Props) {
  const { displayName, accountType, balance } = account.attributes;

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            {displayName}
          </Typography>
          <Chip
            label={accountTypeLabel[accountType]}
            color={accountTypeColor[accountType]}
            size="small"
          />
        </Box>
        <Typography variant="h4" fontWeight={700}>
          {balance.currencyCode} {balance.value}
        </Typography>
      </CardContent>
    </Card>
  );
}
