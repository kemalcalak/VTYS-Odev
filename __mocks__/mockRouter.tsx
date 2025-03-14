import React from 'react';
import { NextRouter } from 'next/router';

export function MockRouterProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Dışa açılan mockRouter nesnesi
export const mockRouter = {
  push: jest.fn(),
  prefetch: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  pathname: '/auth/login',
  asPath: '/auth/login',
  query: {},
  route: '/auth/login',
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
};

// Mock fonksiyonu dışarı aç
export const mockNextUseRouter = () => {
  jest.mock('next/navigation', () => ({
    useRouter: () => mockRouter,
    usePathname: () => '/auth/login',
    useSearchParams: () => new URLSearchParams(),
  }));

  return mockRouter;
};

// Jest mock ayarlarını ayrı tutuyoruz
// Next.js App Router mock işlevleri
jest.mock('next/navigation', () => ({
  useRouter() {
    return mockRouter;
  },
  usePathname() {
    return '/auth/login';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));
