import type { Transaction } from "../types/up";
import { formatCurrency } from "./currency";

export const renderTransactionAmount = (transaction: Transaction) => {
    const { amount, foreignAmount } = transaction.attributes;
    const amountStr = formatCurrency(amount.currencyCode, amount.valueInBaseUnits);
    if (foreignAmount) {
        return `${amountStr} (${formatCurrency(foreignAmount.currencyCode, foreignAmount.valueInBaseUnits)})`;
    }
    return amountStr;
}