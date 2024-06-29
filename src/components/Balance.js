import React from 'react';

export default function Balance({transactionsList}) {
    const credit = transactionsList
        .filter((trx) => trx.type === "income")
        .reduce((total, trx) => total + trx.amount, 0);

    const debit = transactionsList
        .filter((trx) => trx.type === "expense")
        .reduce((total, trx) => total + trx.amount, 0);

    const balance = (credit - debit) > 0 ? (credit - debit) : 0;

    const formatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        signDisplay: "always",
    });

    return (
        <div className="container balance">
            <div className="total">
                <div>
                    <h4>Total Balance</h4>
                    <span id="total">{formatter.format(balance)}</span>
                </div>
            </div>
            <div className="credit">
                <div>
                    <h4>Credit</h4>
                    <span id="credit">{formatter.format(credit)}</span>
                </div>
            </div>
            <div className="debit">
                <div>
                    <h4>Debit</h4>
                    <span id="debit">{formatter.format(debit * -1)}</span>
                </div>
            </div>
        </div>
    );
}


