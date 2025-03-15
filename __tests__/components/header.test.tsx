import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header1 } from '../../components/ui/header';
import { mockRouter } from '../../__mocks__/mockRouter';

// Mock fetch API
global.fetch = jest.fn();

// Jest manuel mock - mockRouter'ı doğrudan import ediyoruz
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockReset();
    // Her test öncesinde mockları temizle
    mockRouter.push.mockClear();
  });

  test('renders header with logo link', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({})
    });

    render(<Header1 />);
    
    // Wait for the auth check to complete
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ana sayfa/i })).toBeInTheDocument();
    });
  });

  test('shows login and register buttons when not authenticated', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({})
    });

    render(<Header1 />);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /giriş yap/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /kayıt ol/i })).toBeInTheDocument();
    });
  });

  test('shows profile and logout buttons when authenticated', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({})
    });

    render(<Header1 />);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /profil/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /çıkış yap/i })).toBeInTheDocument();
    });
  });

  test('toggles mobile menu when menu button is clicked', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({})
    });

    // Mock window.innerWidth to simulate mobile view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500
    });

    window.dispatchEvent(new Event('resize'));

    render(<Header1 />);

    // Wait for initial render to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Mobil menü başlangıçta kapalı olmalı - menü butonunu bul ve tıkla
    const menuButton = screen.getByRole('button', { name: '' });
    fireEvent.click(menuButton);

    // Birden fazla "Giriş Yap" butonu varsa, birini seçmek için daha spesifik olalım
    // Mobil görünümde tam genişlikte bir buton kullanılıyor olabilir
    await waitFor(() => {
      const loginButtons = screen.getAllByRole('button', { name: /giriş yap/i });
      // En azından bir login butonu görünür olmalı
      expect(loginButtons.length).toBeGreaterThan(0);
      // İlk butonun görünür olduğunu doğrula
      expect(loginButtons[0]).toBeVisible();
    });
  });

  test('calls logout API and redirects when logout button is clicked', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({})
    });

    // For the logout API call
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true })
    });

    render(<Header1 />);

    // Wait for authenticated UI
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /çıkış yap/i })).toBeInTheDocument();
    });

    // Click logout button
    const logoutButton = screen.getByRole('button', { name: /çıkış yap/i });
    fireEvent.click(logoutButton);

    // Verify logout API was called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/logout', expect.objectContaining({
        method: 'POST',
        credentials: 'include'
      }));
    });

    // Verify redirect
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
