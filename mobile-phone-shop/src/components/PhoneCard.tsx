import React from 'react';
import { Phone } from '../types';
import FiveGLogo from './FiveGLogo';
import './PhoneCard.css';

interface PhoneCardProps {
    phone: Phone;
    onClick: () => void;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ phone, onClick }) => {
    return (
        <div className="phone-card">
            {/* Card header with "Offers Available" label */}
            <div className="card-header">
                <div className="offers-label">Offers Available</div>
            </div>

            {/* Card main content section */}
            <div style={{ padding: '20px' }}>
                {/* 5G badge if applicable */}
                {phone.isFiveG && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <FiveGLogo />
                    </div>
                )}

                {/* Brand and device name */}
                <div style={{ marginBottom: '5px', color: '#666', fontSize: '16px' }}>
                    {phone.brand}
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 15px 0' }}>
                    {phone.deviceName}
                </h2>

                {/* Phone image */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px',
                    minHeight: '200px'
                }}>
                    <img
                        src={`/images/${phone.deviceName.toLowerCase().replace(/\s+/g, '-')}.png`}
                        alt={phone.deviceName}
                        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                    />
                </div>

                {/* Pricing information */}
                <div style={{ margin: '15px 0' }}>
                    <div style={{ fontSize: '14px', color: '#666' }}>From</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '5px 0' }}>
                        £{phone.pricing.monthly}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>per month</div>
                </div>

                {/* Details button */}
                <button
                    style={{
                        display: 'block',
                        width: '100%',
                        backgroundColor: '#d32f2f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '12px',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        marginTop: '15px',
                        textAlign: 'center'
                    }}
                    onClick={onClick}
                    aria-label={`See more details for ${phone.deviceName}`}
                >
                    See more details
                </button>
            </div>
        </div>
    );
};

export default PhoneCard;