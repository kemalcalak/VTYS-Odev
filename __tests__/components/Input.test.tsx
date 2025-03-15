import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '../../components/ui/input';

describe('Input Component', () => {
  test('renders with default props', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('applies className prop', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  test('passes other props to input element', () => {
    render(<Input disabled type="text" data-testid="input-element" />);
    const input = screen.getByTestId('input-element');
    expect(input).toBeDisabled();
  });

  test('handles password type correctly', () => {
    render(<Input type="password" data-testid="password-input" />);
    const input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('type', 'password');
  });
});
