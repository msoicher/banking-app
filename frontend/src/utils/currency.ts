export const formatCurrency = (currencyCode: string, valueInBaseUnits: number): string =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: currencyCode }).format(
    valueInBaseUnits / 100,
  );
