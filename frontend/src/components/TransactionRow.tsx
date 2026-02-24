import {
  ListItem,
  ListItemText,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import type { Transaction } from '../types/up';

interface Props {
  transaction: Transaction;
}

export default function TransactionRow({ transaction }: Props) {
  const { description, amount, createdAt, status } = transaction.attributes;
  const isDebit = amount.valueInBaseUnits < 0;
  const date = new Date(createdAt).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <ListItem divider sx={{ px: 0 }}>
      <ListItemText
        primary={description}
        secondary={
          <Box display="flex" alignItems="center" gap={1} mt={0.5}>
            <Typography variant="caption" color="text.secondary">
              {date}
            </Typography>
            {status === 'HELD' && (
              <Chip label="Pending" size="small" variant="outlined" />
            )}
          </Box>
        }
      />
      <Typography
        variant="body2"
        fontWeight={600}
        color={isDebit ? 'error.main' : 'success.main'}
      >
        {isDebit ? '' : '+'}
        {amount.currencyCode} {amount.value}
      </Typography>
    </ListItem>
  );
}
