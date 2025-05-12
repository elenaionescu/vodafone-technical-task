import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, ColourOption, DataOption } from '../types';
import FiveGLogo from '../components/FiveGLogo';
import ProductColorSelector from '../components/ProductColorSelector';
import ProductStorageSelector from '../components/ProductStorageSelector';
import AddToBasketButton from '../components/AddToBasketButton';
import './PhoneDetailsPage.css';

const PhoneDetailsPage: React.FC = () => {
    const { deviceName } = useParams<{ deviceName: string }>();
    const navigate = useNavigate();

    const [phone, setPhone] = useState<Phone | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedColor, setSelectedColor] = useState<ColourOption | null>(null);
    const [selectedStorage, setSelectedStorage] = useState<DataOption | null>(null);

    useEffect(() => {
        const fetchPhoneDetails = async () => {
            try {
                // In a real application, this would be an API call with the deviceName parameter
                const response = await fetch('/phones.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch phone details');
                }

                const data: Phone[] = await response.json();
                const foundPhone = data.find(p => p.deviceName === deviceName);

                if (foundPhone) {
                    setPhone(foundPhone);
                    // Set default selections
                    setSelectedColor(foundPhone.colourOptions[0]);
                    setSelectedStorage(foundPhone.dataOptions[0]);
                } else {
                    throw new Error('Phone not found');
                }
            } catch (err) {
                setError('Failed to load phone details. Please try again later.');
                console.error('Error fetching phone details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (deviceName) {
            fetchPhoneDetails();
        }
    }, [deviceName]);

    const handleColorChange = (color: ColourOption) => {
        setSelectedColor(color);
    };

    const handleStorageChange = (storage: DataOption) => {
        setSelectedStorage(storage);
    };

    if (loading) {
        return <div className="loading">Loading phone details...</div>;
    }

    if (error || !phone) {
        return (
            <div className="error-container">
                <div className="error">{error || 'Phone not found'}</div>
                <button className="back-button" onClick={() => navigate('/')}>
                    Back to Phones
                </button>
            </div>
        );
    }

    return (
        <div className="phone-details-page">
            <div className="phone-details-container">
                <div className="phone-image-section">
                    <div className="brand-name">{phone.brand}</div>
                    <h1 className="phone-name">{phone.deviceName}</h1>

                    <div className="phone-image">
                        <img
                            src={`/images/${phone.deviceName.toLowerCase().replace(/\s+/g, '-')}.png`}
                            alt={phone.deviceName}
                        />
                    </div>
                </div>

                <div className="phone-details-section">
                    <div className="fiveg-badge">
                        {phone.isFiveG && <FiveGLogo />}
                    </div>

                    <div className="selectors-container">
                        <div className="color-selector">
                            <h3>Select colour</h3>
                            <ProductColorSelector
                                colors={phone.colourOptions}
                                selectedColor={selectedColor}
                                onColorSelect={handleColorChange}
                            />
                        </div>

                        <div className="storage-selector">
                            <h3>Select capacity</h3>
                            <ProductStorageSelector
                                storageOptions={phone.dataOptions}
                                selectedStorage={selectedStorage}
                                onStorageSelect={handleStorageChange}
                            />
                        </div>
                    </div>

                    <div className="availability">
                        {phone.stock > 0 ? (
                            <div className="in-stock">
                                <span className="stock-dot"></span> In stock
                            </div>
                        ) : (
                            <div className="out-of-stock">
                                <span className="stock-dot"></span> Out of stock
                            </div>
                        )}
                    </div>

                    <div className="delivery-info">
                        <div className="delivery-icon">🚚</div>
                        <div className="delivery-text">
                            <p>Free home delivery. Order before 10:00pm today and get it tomorrow. Premium delivery slots available. Exclusions apply</p>
                            <p>Or click and collect in store</p>
                        </div>
                    </div>

                    <div className="price-info">
                        <div className="total-price">
                            Total device cost: £{selectedStorage?.price || phone.dataOptions[0].price}
                        </div>
                        <div className="monthly-price">
                            From £{phone.pricing.monthly} per month
                        </div>
                    </div>

                    <AddToBasketButton
                        phone={phone}
                        selectedColor={selectedColor || phone.colourOptions[0]}
                        selectedStorage={selectedStorage || phone.dataOptions[0]}
                        disabled={phone.stock === 0}
                    />
                </div>
            </div>
        </div>
    );
};

export default PhoneDetailsPage;