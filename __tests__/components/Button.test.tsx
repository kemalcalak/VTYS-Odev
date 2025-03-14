import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../components/ui/button';

describe('Button Component', () => {
  test('renders button with correct text', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole('button', { name: /test button/i })).toBeInTheDocument();
  });

  test('calls onClick when button is clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button', { name: /disabled button/i })).toBeDisabled();
  });

  test('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByRole('button', { name: /destructive/i })).toHaveClass('bg-destructive');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button', { name: /outline/i })).toHaveClass('border-input');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button', { name: /ghost/i })).toHaveClass('hover:bg-accent');
  });
});
