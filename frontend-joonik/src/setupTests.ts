// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock axios
const mockAxios = {
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn()
      },
      response: {
        use: jest.fn(),
        eject: jest.fn()
      }
    }
  })),
  isAxiosError: jest.fn((error) => error?.isAxiosError || false),
  AxiosError: class AxiosError extends Error {
    isAxiosError = true;
    constructor(message: string) {
      super(message);
      this.name = 'AxiosError';
    }
  }
};

jest.mock('axios', () => mockAxios);
