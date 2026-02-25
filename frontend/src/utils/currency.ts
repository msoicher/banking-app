export const formatCurrency = (currencyCode: string, valueInBaseUnits: number): string =>
  new Intl.NumberFormat(navigator.language, { style: 'currency', currency: currencyCode }).format(
    valueInBaseUnits / 100,
  );
