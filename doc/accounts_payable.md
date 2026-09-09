# Accounts Payable

The client supports purchase lookup, supplier bills, manual settlement, attachments, reports and CSV exports. Read the [settlement contract](https://github.com/hivesolutions/omni/blob/master/doc/design/010-accounts_payable.md) for opening balances, supplier credits, returns, currency handling and reversals.

## Creating a Supplier Bill

Bill creation references an existing purchase and preserves its stock and document records.

```javascript
const bill = await api.createSupplierBill({
    supplier_bill: {
        purchase: { object_id: 10 },
        reference: "INV/2026/1",
        payment_terms_days: 30
    }
});
```

## Confirming the Opening Balance

Entry type 2 records a historical adjustment and confirms the opening balance without creating a payment. A zero historical adjustment confirms that the full opening balance is unpaid. Positive historical adjustments record past settlement without creating a payment.

```javascript
await api.createPaymentSupplierBill(bill.object_id, {
    supplier_bill_payment: {
        entry_type: 2,
        applied_amount: 0,
        currency: bill.currency,
        description: "Opening balance confirmed against supplier statement",
        request_key: "statement-2026-1"
    }
});
```

## Registration Types

Use `createPaymentSupplierBill` for the following registrations:

| Entry Type | Registration          | Effect                                                 |
| ---------- | --------------------- | ------------------------------------------------------ |
| 1          | Payment               | Records a payment already made                         |
| 2          | Historical adjustment | Records historical settlement and confirms the balance |
| 3          | Supplier credit       | Records credit against the bill                        |
| 4          | Refund                | Records a received supplier refund                     |
| 5          | Credit transfer       | Applies available credit from another bill             |

After confirming the opening balance, register payments already made or apply supplier credits, refunds and credit transfers. These methods do not send money or invoke a payment provider. Preserve the request key when retrying the same registration.

## Permissions

`getPermissionsSupplierBill()` returns server-validated action permissions. The server validates permissions and the current balance when registering a payment.

## Reports and Exports

`listSupplierBills`, `reportSupplierBills` and `exportSupplierBills` accept the existing `options.params` filters. CSV export requires the gateway to preserve `.csv` URLs.

## Attachments

Workflow message uploads use the existing `{ body, files: File[] }` payload.

## Testing

Run `npm test` for request-contract tests and `npm run coverage` for the new purchase and payable methods. Coverage uses c8 against the original sources through the existing Rollup source maps.
