import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BasketProvider } from '../context/BasketContext';
import AddToBasketButton from '../components/AddToBasketButton';

// Mock data
const mockPhone = {
    deviceName: 'iPhone 16 Pro',
    brand: 'Apple',
    colourOptions: [
        { name: 'Desert Titanium', hex: 'BFA48F' }
    ],
    dataOptions: [
        { name: '128GB', price: 904 }
    ],
    pricing: {
        monthly: 37
    },
    stock: 3,
    isFiveG: true
};

const mockColor = { name: 'Desert Titanium', hex: 'BFA48F' };
const mockStorage = { name: '128GB', price: 904 };

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <BasketProvider>
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </BasketProvider>
    );
};

describe('AddToBasketButton Component', () => {
    test('renders add to basket button initially', () => {
        renderWithProviders(
            <AddToBasketButton
                phone={mockPhone}
                selectedColor={mockColor}
                selectedStorage={mockStorage}
            />
        );

        expect(screen.getByText('Add to basket')).toBeInTheDocument();
    });

    test('changes to "Remove from basket" after adding to basket', async () => {
        renderWithProviders(
            <AddToBasketButton
                phone={mockPhone}
                selectedColor={mockColor}
                selectedStorage={mockStorage}
            />
        );

        // Click the button to add to basket
        fireEvent.click(screen.getByText('Add to basket'));

        // Check if the button text changes
        await waitFor(() => {
            expect(screen.getByText('Remove from basket')).toBeInTheDocument();
        });
    });

    test('button is disabled when disabled prop is true', () => {
        renderWithProviders(
            <AddToBasketButton
                phone={mockPhone}
                selectedColor={mockColor}
                selectedStorage={mockStorage}
                disabled={true}
            />
        );

        expect(screen.getByText('Add to basket')).toBeDisabled();
    });

    test('toggles between add and remove when clicked multiple times', async () => {
        renderWithProviders(
            <AddToBasketButton
                phone={mockPhone}
                selectedColor={mockColor}
                selectedStorage={mockStorage}
            />
        );

        // Add to basket
        fireEvent.click(screen.getByText('Add to basket'));
        await waitFor(() => {
            expect(screen.getByText('Remove from basket')).toBeInTheDocument();
        });

        // Remove from basket
        fireEvent.click(screen.getByText('Remove from basket'));
        await waitFor(() => {
            expect(screen.getByText('Add to basket')).toBeInTheDocument();
        });
    });
});