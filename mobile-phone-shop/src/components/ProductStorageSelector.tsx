import React from 'react';
import { DataOption } from '../types';
import './ProductStorageSelector.css';

interface ProductStorageSelectorProps {
    storageOptions: DataOption[];
    selectedStorage: DataOption | null;
    onStorageSelect: (storage: DataOption) => void;
}

const ProductStorageSelector: React.FC<ProductStorageSelectorProps> = ({
                                                                           storageOptions,
                                                                           selectedStorage,
                                                                           onStorageSelect,
                                                                       }) => {
    return (
        <div className="storage-selector-container">
            <div className="storage-dropdown">
                <div className="selected-storage">
                    <span>{selectedStorage?.name || storageOptions[0].name}</span>
                    <span className="dropdown-arrow">▼</span>
                </div>

                <div className="storage-options">
                    {storageOptions.map((storage) => (
                        <div
                            key={storage.name}
                            className={`storage-option ${selectedStorage?.name === storage.name ? 'selected' : ''}`}
                            onClick={() => onStorageSelect(storage)}
                        >
                            <span className="storage-name">{storage.name}</span>
                            <span className="storage-price">£{storage.price}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductStorageSelector;