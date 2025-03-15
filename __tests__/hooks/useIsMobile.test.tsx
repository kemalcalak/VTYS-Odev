import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '../../components/hooks/use-mobile';

describe('useIsMobile Hook', () => {
  const originalInnerWidth = window.innerWidth;
  const mockMatchMedia = jest.fn();
  
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });
  });

  afterEach(() => {
    // Reset window width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    });
  });

  test('returns true for mobile screen sizes', () => {
    // Mock matchMedia implementation
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    
    mockMatchMedia.mockReturnValue({
      matches: true,
      addEventListener,
      removeEventListener
    });
    
    // Mock mobile screen width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 500 // Below 768px threshold
    });
    
    const { result } = renderHook(() => useIsMobile());
    
    expect(result.current).toBe(true);
    expect(addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  test('returns false for desktop screen sizes', () => {
    // Mock matchMedia implementation
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener,
      removeEventListener
    });
    
    // Mock desktop screen width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024 // Above 768px threshold
    });
    
    const { result } = renderHook(() => useIsMobile());
    
    expect(result.current).toBe(false);
  });

  test('cleans up event listener on unmount', () => {
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener,
      removeEventListener
    });
    
    const { unmount } = renderHook(() => useIsMobile());
    unmount();
    
    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
