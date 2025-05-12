import React from 'react';
import { Link } from 'react-router-dom';
import { useBasket } from '../context/BasketContext';
import './Header.css';

const Header: React.FC = () => {
    const { basketItems } = useBasket();
    const itemCount = basketItems.length;

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <Link to="/">
                        <h1>Mobile Shop</h1>
                    </Link>
                </div>

                <nav className="navigation">
                    <ul>
                        <li>
                            <Link to="/">Phones</Link>
                        </li>
                        <li>
                            <Link to="/">Accessories</Link>
                        </li>
                        <li>
                            <Link to="/">Deals</Link>
                        </li>
                    </ul>
                </nav>

                <div className="header-actions">
                    <button className="search-button" aria-label="Search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>

                    <div className="basket-icon">
                        <button className="basket-button" aria-label={`Shopping basket with ${itemCount} items`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            {itemCount > 0 && (
                                <span className="basket-count">{itemCount}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;