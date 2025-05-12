import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BasketItem, ColourOption, DataOption } from '../types';

interface BasketContextType {
    basketItems: BasketItem[];
    addToBasket: (
        deviceName: string,
        colour: ColourOption,
        storage: DataOption
    ) => void;
    removeFromBasket: (deviceName: string) => void;
    isInBasket: (deviceName: string) => boolean;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) {
        throw new Error('useBasket must be used within a BasketProvider');
    }
    return context;
};

interface BasketProviderProps {
    children: ReactNode;
}

export const BasketProvider: React.FC<BasketProviderProps> = ({ children }) => {
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

    const addToBasket = (
        deviceName: string,
        colour: ColourOption,
        storage: DataOption
    ) => {
        const existingItemIndex = basketItems.findIndex(
            (item) => item.deviceName === deviceName
        );

        if (existingItemIndex !== -1) {
            // If the item is already in the basket, update the quantity
            const updatedItems = [...basketItems];
            updatedItems[existingItemIndex].quantity += 1;
            setBasketItems(updatedItems);
        } else {
            // Otherwise, add a new item
            setBasketItems([
                ...basketItems,
                {
                    deviceName,
                    colour,
                    storage,
                    quantity: 1,
                },
            ]);
        }
    };

    const removeFromBasket = (deviceName: string) => {
        setBasketItems(basketItems.filter((item) => item.deviceName !== deviceName));
    };

    const isInBasket = (deviceName: string) => {
        return basketItems.some((item) => item.deviceName === deviceName);
    };

    const value = {
        basketItems,
        addToBasket,
        removeFromBasket,
        isInBasket,
    };

    return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
};