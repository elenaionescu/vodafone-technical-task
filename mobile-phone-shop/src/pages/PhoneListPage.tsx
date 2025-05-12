import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone } from '../types';
import PhoneCard from '../components/PhoneCard';
import FilterSection from '../components/FilterSection';
import './PhoneListPage.css';

const PhoneListPage: React.FC = () => {
    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPhones = async () => {
            try {
                // In a real application, this would be an API call
                const response = await fetch('/phones.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch phones');
                }
                const data = await response.json();
                setPhones(data);
            } catch (err) {
                setError('Failed to load phones. Please try again later.');
                console.error('Error fetching phones:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPhones();
    }, []);

    const handlePhoneClick = (deviceName: string) => {
        // Navigate to the phone details page when a phone is clicked
        navigate(`/phone/${encodeURIComponent(deviceName)}`);
    };

    if (loading) {
        return <div className="loading">Loading phones...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="phone-list-page">
            <div className="list-header">
                <div className="filter-section">
                    <FilterSection />
                </div>
                <div className="items-count">
                    <span>{phones.length} items</span>
                    <div className="sort-dropdown">
                        <select aria-label="Sort by">
                            <option>Sort by</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Name: A to Z</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="phone-grid">
                {phones.map((phone) => (
                    <PhoneCard
                        key={phone.deviceName}
                        phone={phone}
                        onClick={() => handlePhoneClick(phone.deviceName)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhoneListPage;