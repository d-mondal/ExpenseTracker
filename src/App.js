import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddExpense from './components/AddExpense';
import Balance from './components/Balance';
import Hero from './components/HeroSection';
import Navbar from './components/Navbar';
import ExpenseList from './components/ExpenseList';

const App = () => {
  const [transactions, setTransactions] = useState([
    // {
    //   id: 1,
    //   description: "Salary",
    //   selection: "Credit",
    //   amount: 5000,
    //   type: "income",
    //   date: "28/6/2024, 1:06:49 am"
    // },
    // {
    //   id: 2,
    //   description: "Books",
    //   selection: "Stationary",
    //   amount: 750,
    //   type: "expense",
    //   date: "28/6/2024, 1:06:49 am"
    // },
    // {
    //   id: 3,
    //   description: "CCD",
    //   selection: "Food",
    //   amount: 65,
    //   type: "expense",
    //   date: "28/6/2024, 1:06:49 am"
    // },
  ]);

  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    if (transactions.length) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  }

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(trx => trx.id !== id);
    setTransactions(updatedTransactions);
  }

  const handleEditTransaction = (id) => {
    const transaction = transactions.find(trx => trx.id === id);
    if (transaction) {
      setEditingTransaction(transaction);
    }
  }

  const handleUpdateTransaction = (updatedTransaction) => {
    setTransactions(transactions.map(trx =>
      trx.id === updatedTransaction.id ? updatedTransaction : trx
    ));
    setEditingTransaction(null);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<Hero />} />
          <Route path="/track" element={
            <>
              <AddExpense onAddTransaction={handleAddTransaction} />
              {editingTransaction && (
                <AddExpense
                  onAddTransaction={handleUpdateTransaction}
                  editingTransaction={editingTransaction}
                />
              )}
              <ExpenseList
                transactionsList={transactions}
                onDeleteTransaction={handleDeleteTransaction}
                onEditTransaction={handleEditTransaction}
              />
            </>
          }/>
          <Route path="/balance" element={
              <Balance transactionsList={transactions} />
            }
          />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
