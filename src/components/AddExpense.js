import React, { useState, useEffect } from 'react';

export default function AddExpense({ onAddTransaction, editingTransaction }) {

    const [description, setDescription] = useState('');

    const [amount, setAmount] = useState('');

    const [selection, setSelection] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTransaction = {
            id: editingTransaction ? editingTransaction.id : Date.now(),
            description,
            amount: parseFloat(amount),
            selection,
            type: selection === "Credit" ? "income" : "expense",
            date: new Date().toLocaleString()
        };
        console.log(newTransaction);
        onAddTransaction(newTransaction);
        setDescription('');
        setAmount('');
        setSelection('');
    }

    const handleAmountBlur = () => {
        setAmount(parseFloat(amount).toFixed(2));
    }

    useEffect(() => {
        if (editingTransaction) {
            setDescription(editingTransaction.description);
            setAmount(editingTransaction.amount.toFixed(2));
            setSelection(editingTransaction.selection);
        }
    }, [editingTransaction]);
    
    return (
        <>
            <div className="container-fluid addExpense">
                <h1>{editingTransaction ? 'Edit Your Transaction' : 'Add Your Expense!'}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="addItem">
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description..."
                                required
                            />
                        </div>
                        <div className="addAmt">
                            <span>&#8377;</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                onBlur={handleAmountBlur}
                                placeholder="0.00"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="addCategory">
                            <select
                                value={selection}
                                onChange={(e) => setSelection(e.target.value)}
                                className="form-select"
                                required
                            >
                                <option value="">Category</option>
                                <option value="Stationary">Stationary</option>
                                <option value="Food">Food</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Credit" style={{ color: '#90c400', fontWeight: 600 }}>Credit</option>
                            </select>
                        </div>
                        <div className="submit">
                            <button type="submit" className="subBtn" disabled={!description || !amount || !selection}>{editingTransaction ? 'Update Transaction' : 'Add Transaction +'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
