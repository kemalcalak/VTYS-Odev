import '@testing-library/jest-dom';

// Next.js App Router mockları
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      prefetch: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: '/auth/login',
    };
  },
  usePathname() {
    return '/auth/login';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));
