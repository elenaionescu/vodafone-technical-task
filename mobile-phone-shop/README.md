# Mobile Phone Shop - React & TypeScript

This project is a mobile phone e-commerce application built with React and TypeScript. It allows users to browse phones, view their details, select colors and storage options, and add them to their basket.

## Features

- Browse a list of available phones
- View detailed information for each phone
- See phone color and storage options
- Add/remove phones from the basket
- Check stock availability
- View 5G capability of phones

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/elenaionescu/mobile-phone-shop.git
cd mobile-phone-shop
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at http://localhost:3000.

## Project Structure

```
mobile-phone-shop/
├── public/
│   ├── phones.json        # Phone data
│   └── images/            # Phone images
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # React Context for state management
│   ├── pages/             # Page components
│   ├── __tests__/         # Unit tests
│   ├── types.ts           # TypeScript interfaces
│   ├── App.tsx            # Main App component
│   └── index.tsx          # Entry point
├── e2e/                   # End-to-end tests
├── package.json
└── tsconfig.json
```

## Technologies Used

- React
- TypeScript
- React Router
- React Context API (for state management)
- CSS Modules
- Jest + React Testing Library (for unit testing)
- Playwright (for end-to-end testing)

## Testing

### Unit Tests

Run the unit tests:
```bash
npm test
# or
yarn test
```

### End-to-End Tests

Run the end-to-end tests:
```bash
npm run test:e2e
# or
yarn test:e2e
```

## API Integration

Currently, the application uses a local JSON file for data. To integrate with a real API:

1. Create an API service in `src/services/api.ts`
2. Update the data fetching methods in the page components
3. Update the basket context to use the API for basket operations

## Future Improvements

- Add pagination for the phone list
- Implement search and filtering functionality
- Add user authentication
- Integrate with a real payment gateway
- Improve accessibility features
- Add more comprehensive error handling
- Implement internationalization (i18n)

## Performance Considerations

- Implement lazy loading for images
- Add pagination or infinite scrolling for large product lists
- Optimize bundle size with code splitting
- Implement caching for API responses
- Use React.memo for performance-critical components

## Security Considerations

- Implement proper input validation
- Use HTTPS for API communications
- Sanitize user inputs
- Add CSRF protection
- Implement rate limiting for API endpoints

## License

This project is licensed under the MIT License.
