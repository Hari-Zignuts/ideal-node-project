// tests/jest.setup.js

// Set global mocks, environment variables, etc.
jest.setTimeout(30000); // Set test timeout to 30 seconds

// Example: Mocking fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Mocked response" }),
  })
);