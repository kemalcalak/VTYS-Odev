import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from '../../components/ui/label';

describe('Label Component', () => {
  test('renders label with text content', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });
  
  test('applies custom className', () => {
    render(
      <Label className="custom-class" data-testid="custom-label">
        Labeled Content
      </Label>
    );
    
    const label = screen.getByTestId('custom-label');
    expect(label).toHaveClass('custom-class');
  });
  
  test('forwards attributes properly', () => {
    render(
      <Label htmlFor="test-input" data-testid="test-label">
        Input Label
      </Label>
    );
    
    const label = screen.getByTestId('test-label');
    expect(label).toHaveAttribute('for', 'test-input');
  });
  
  test('renders with default styles', () => {
    render(<Label data-testid="styled-label">Styled Label</Label>);
    
    const label = screen.getByTestId('styled-label');
    expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none');
  });
});
