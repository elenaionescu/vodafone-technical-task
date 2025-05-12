import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BasketProvider } from '../context/BasketContext';
import PhoneCard from '../components/PhoneCard';

// Mock phone data
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

// Mock function
const mockOnClick = jest.fn();

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <BasketProvider>
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </BasketProvider>
    );
};

describe('PhoneCard Component', () => {
    test('renders phone card with correct information', () => {
        renderWithProviders(<PhoneCard phone={mockPhone} onClick={mockOnClick} />);

        // Check if brand name is displayed
        expect(screen.getByText('Apple')).toBeInTheDocument();

        // Check if device name is displayed
        expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument();

        // Check if price is displayed
        expect(screen.getByText('£37')).toBeInTheDocument();
        expect(screen.getByText('per month')).toBeInTheDocument();

        // Check if button is displayed
        expect(screen.getByText('See more details')).toBeInTheDocument();

        // Check if 5G badge is shown
        expect(screen.getByText('5G')).toBeInTheDocument();
    });

    test('calls onClick when card is clicked', () => {
        renderWithProviders(<PhoneCard phone={mockPhone} onClick={mockOnClick} />);

        fireEvent.click(screen.getByText('iPhone 16 Pro'));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('does not show 5G badge when isFiveG is false', () => {
        const nonFiveGPhone = { ...mockPhone, isFiveG: false };
        renderWithProviders(<PhoneCard phone={nonFiveGPhone} onClick={mockOnClick} />);

        expect(screen.queryByText('5G')).not.toBeInTheDocument();
    });
});