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
        <div className="phone-card" onClick={onClick}>
            <div className="card-header">
                <div className="offers-label">Offers Available</div>
            </div>

            <div className="card-content">
                {phone.isFiveG && (
                    <div className="fiveg-badge">
                        <FiveGLogo />
                    </div>
                )}

                <div className="brand-name">{phone.brand}</div>
                <h2 className="phone-name">{phone.deviceName}</h2>

                <div className="phone-image">
                    <img
                        src={`/images/${phone.deviceName.toLowerCase().replace(/\s+/g, '-')}.png`}
                        alt={phone.deviceName}
                    />
                </div>

                <div className="pricing">
                    <div className="price-label">From</div>
                    <div className="price-value">£{phone.pricing.monthly}</div>
                    <div className="price-period">per month</div>
                </div>

                <button className="details-button" aria-label={`See more details for ${phone.deviceName}`}>
                    See more details
                </button>
            </div>
        </div>
    );
};

export default PhoneCard;