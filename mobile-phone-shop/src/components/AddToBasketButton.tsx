import React from 'react';
import { Phone, ColourOption, DataOption } from '../types';
import { useBasket } from '../context/BasketContext';
import './AddToBasketButton.css';

interface AddToBasketButtonProps {
    phone: Phone;
    selectedColor: ColourOption;
    selectedStorage: DataOption;
    disabled?: boolean;
}

const AddToBasketButton: React.FC<AddToBasketButtonProps> = ({
                                                                 phone,
                                                                 selectedColor,
                                                                 selectedStorage,
                                                                 disabled = false,
                                                             }) => {
    const { addToBasket, removeFromBasket, isInBasket } = useBasket();

    const phoneInBasket = isInBasket(phone.deviceName);

    const handleClick = () => {
        if (disabled) return;

        if (phoneInBasket) {
            removeFromBasket(phone.deviceName);
        } else {
            addToBasket(phone.deviceName, selectedColor, selectedStorage);
        }
    };

    return (
        <button
            className={`basket-button ${phoneInBasket ? 'remove' : 'add'} ${disabled ? 'disabled' : ''}`}
            onClick={handleClick}
            disabled={disabled}
            aria-label={phoneInBasket ? `Remove ${phone.deviceName} from basket` : `Add ${phone.deviceName} to basket`}
        >
            {phoneInBasket ? 'Remove from basket' : 'Add to basket'}
        </button>
    );
};

export default AddToBasketButton;