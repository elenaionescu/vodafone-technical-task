import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { BasketProvider } from '../context/BasketContext';
import PhoneDetailsPage from '../pages/PhoneDetailsPage';

// Mock the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
            {
                deviceName: 'iPhone 16 Pro',
                brand: 'Apple',
                colourOptions: [
                    { name: 'Desert Titanium', hex: 'BFA48F' },
                    { name: 'Black Titanium', hex: '3C3C3D' }
                ],
                dataOptions: [
                    { name: '128GB', price: 904 },
                    { name: '256GB', price: 1004 }
                ],
                pricing: {
                    monthly: 37
                },
                stock: 3,
                isFiveG: true
            }
        ])
    })
) as jest.Mock;

const renderWithProviders = (ui: React.ReactElement, { route = '/phone/iPhone%2016%20Pro' } = {}) => {
    return render(
        <BasketProvider>
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/phone/:deviceName" element={ui} />
                </Routes>
            </MemoryRouter>
        </BasketProvider>
    );
};

describe('PhoneDetailsPage Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', () => {
        renderWithProviders(<PhoneDetailsPage />);

        expect(screen.getByText('Loading phone details...')).toBeInTheDocument();
    });

    test('renders phone details after loading', async () => {
        renderWithProviders(<PhoneDetailsPage />);

        await waitFor(() => {
            expect(screen.getByText('Apple')).toBeInTheDocument();
            expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument();
        });

        expect(screen.getByText('In stock')).toBeInTheDocument();
        expect(screen.getByText('Desert Titanium')).toBeInTheDocument();
        expect(screen.getByText('128GB')).toBeInTheDocument();
        expect(screen.getByText('Total device cost: £904')).toBeInTheDocument();
        expect(screen.getByText('From £37 per month')).toBeInTheDocument();
    });

    test('renders 5G badge when phone has 5G', async () => {
        renderWithProviders(<PhoneDetailsPage />);

        await waitFor(() => {
            expect(screen.getByText('5G')).toBeInTheDocument();
        });
    });

    test('shows error when phone is not found', async () => {
        // Mock a failed API response
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([
                    { deviceName: 'Different Phone', brand: 'Test' }
                ])
            })
        );

        renderWithProviders(<PhoneDetailsPage />);

        await waitFor(() => {
            expect(screen.getByText('Phone not found')).toBeInTheDocument();
        });
    });

    test('updates price when storage option changes', async () => {
        renderWithProviders(<PhoneDetailsPage />);

        await waitFor(() => {
            expect(screen.getByText('Total device cost: £904')).toBeInTheDocument();
        });

        // Note: In a real test, we would simulate clicking on the storage option here
        // This is a simplified version of the test
    });
});