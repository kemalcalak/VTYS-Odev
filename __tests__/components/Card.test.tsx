import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';

describe('Card Component', () => {
  test('renders Card component correctly', () => {
    render(
      <Card data-testid="test-card">
        <div>Card Content</div>
      </Card>
    );
    expect(screen.getByTestId('test-card')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  test('renders full Card with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Body Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Body Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  test('applies custom className to Card', () => {
    render(
      <Card className="custom-card-class" data-testid="custom-card">
        Card with Custom Class
      </Card>
    );
    expect(screen.getByTestId('custom-card')).toHaveClass('custom-card-class');
  });

  test('applies custom className to Card subcomponents', () => {
    render(
      <Card>
        <CardHeader className="custom-header" data-testid="header">Header</CardHeader>
        <CardContent className="custom-content" data-testid="content">Content</CardContent>
        <CardFooter className="custom-footer" data-testid="footer">Footer</CardFooter>
      </Card>
    );
    
    expect(screen.getByTestId('header')).toHaveClass('custom-header');
    expect(screen.getByTestId('content')).toHaveClass('custom-content');
    expect(screen.getByTestId('footer')).toHaveClass('custom-footer');
  });
});
