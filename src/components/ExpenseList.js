import React, { useState } from 'react';

export default function ExpenseList({ transactionsList, onDeleteTransaction, onEditTransaction }) {

    const [categoryFilter, setCategoryFilter] = useState('');

    const filteredTransactions = transactionsList.filter(transaction =>
        categoryFilter === '' || transaction.selection === categoryFilter
    );

    const formatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        signDisplay: "always",
    });

    return (
        <div className="container-fluid expenseList">
            <h1>Your Transaction List</h1>
            <div className="filter">
                <span>Filter By: </span>
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="form-select"
                >
                    <option value="">All</option>
                    <option value="Stationary">Stationary</option>
                    <option value="Food">Food</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Credit" style={{ color: '#90c400', fontWeight: 600 }}>Credit</option>
                </select>
            </div>
            <div id="items">
                <table className="transactionsTable">
                    <tbody>
                        {filteredTransactions.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>No transactions yet!</td>
                            </tr>
                        ) : (
                            filteredTransactions.map(({ id, description, selection, amount, type, date }) => (
                                <tr key={id}>
                                    <td className="buttons">
                                        <button className="icon del" onClick={() => onDeleteTransaction(id)}><i className="fa-solid fa-trash" style={{ color: 'white' }}></i></button>
                                        <button className="icon edit" onClick={() => onEditTransaction(id)}><i className="fa-solid fa-pen" style={{ color: 'white' }}></i></button>
                                    </td>
                                    <td className="date">
                                        <p>{date}</p>
                                    </td>
                                    <td className="category">
                                        <p>{selection}</p>
                                    </td>
                                    <td className="description">
                                        <p>{description}</p>
                                    </td>
                                    <td className={`amount ${type}`}>
                                        <p>{formatter.format(type === 'income' ? amount : -amount)}</p>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
