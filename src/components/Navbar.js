import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Expense Tracker</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/track">Add Expense</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/track">Expenses List</Link>
                            </li>
                            <li className="nav-item" id="diff">
                                <Link to="/balance">Check Balance</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}