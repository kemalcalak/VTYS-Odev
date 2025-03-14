import React from 'react';
import { render } from '@testing-library/react';
import QueryProvider from '../../components/providers/query-provider';
import { useQueryClient } from '@tanstack/react-query';

// Create a component that uses the query client
const TestComponent = () => {
  const queryClient = useQueryClient();
  return <div data-testid="test-component">{queryClient ? 'Query Client Exists' : 'No Query Client'}</div>;
};

describe('QueryProvider Component', () => {
  test('provides a QueryClient to children', () => {
    const { getByTestId } = render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );
    
    const testComponent = getByTestId('test-component');
    expect(testComponent).toHaveTextContent('Query Client Exists');
  });
  
  test('renders children correctly', () => {
    const { getByText } = render(
      <QueryProvider>
        <div>Test Child</div>
      </QueryProvider>
    );
    
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
