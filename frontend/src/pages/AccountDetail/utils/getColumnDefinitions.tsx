import type { GridColDef } from "@mui/x-data-grid"
import type { Transaction } from "../../../types/up"
import { renderTransactionAmount } from "../../../utils/renderTransactionAmount";
import { Chip, Typography } from "@mui/material";

export const getColumns: GridColDef<Transaction>[] = [
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 130,
      valueGetter: (_value, row) =>
        new Date(row.attributes.createdAt).toLocaleDateString('en-AU', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 180,
      valueGetter: (_value, row) => row.attributes.description,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      valueGetter: (_value, row) => row.attributes.status,
      renderCell: ({ value }) => (
        <Chip
          label={value}
          size="small"
          color={value === 'SETTLED' ? 'success' : 'warning'}
          variant="outlined"
        />
      ),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      align: 'right',
      headerAlign: 'right',
      valueGetter: (_value, row) => row.attributes.amount.valueInBaseUnits,
      renderCell: ({ row }) => {
        const isDebit = row.attributes.amount.valueInBaseUnits < 0;
        return (
          <Typography
            variant="body2"
            fontWeight={600}
            color={isDebit ? 'error.main' : 'success.main'}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {renderTransactionAmount(row)}
          </Typography>
        );
      },
    },
  ];