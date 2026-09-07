# Omni Neo API (for Javascript)

Javascript API client for the new API for the Omni infrastructure.

## License

Omni Neo API for Javascript is currently licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/).

## Build Automation

[![Build Status](https://github.com/hivesolutions/omni-neo-api-js/workflows/Main%20Workflow/badge.svg)](https://github.com/hivesolutions/omni-neo-api-js/actions)
[![npm Status](https://img.shields.io/npm/v/omni-neo-api.svg)](https://www.npmjs.com/package/omni-neo-api)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://www.apache.org/licenses/)

## Accounts Payable

The client supports purchase lookup, supplier bills, manual settlement, approvals,
instalments, recurring schedules, attachments, reports and CSV exports. Bill creation
references an existing purchase and preserves its stock and document records.

```javascript
const bill = await api.createSupplierBill({
    supplier_bill: {
        purchase: { object_id: 10 },
        reference: "INV/2026/1",
        payment_terms_days: 30
    }
});
await api.approveSupplierBill(bill.object_id);
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

A zero historical adjustment confirms that the full opening balance is unpaid.
Positive historical adjustments record past settlement without creating a payment.
After confirmation, entry type 1 registers a payment already made; types 3, 4 and 5
record supplier credit, a refund and credit transferred from another bill. The
manual endpoints do not send money or invoke a payment provider. Preserve the
request key when retrying the same registration.

`getPermissionsSupplierBill()` returns server-validated action permissions. Use
`requestSupplierBill` or `requestPaymentSupplierBill` when an approval policy
requires a separate checker. Review with the approval-request methods; the server
revalidates the current policy and balance when the checker approves.

Lists, reports and exports accept the existing `options.params` filters. CSV export
requires the gateway to preserve `.csv` URLs. Workflow message uploads use the
existing `{ body, files: File[] }` payload. See the backend
[design document](https://github.com/hivesolutions/omni/blob/feat/accounts-payable/doc/design/010-accounts_payable.md)
for the complete settlement contract.

Run `npm test` for request-contract tests and `npm run coverage` for the new purchase,
payable and approval methods. Coverage uses c8 against the original sources through
the existing Rollup source maps.
