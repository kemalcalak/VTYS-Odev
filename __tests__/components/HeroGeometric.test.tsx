import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroGeometric } from '../../components/ui/shape-landing-hero';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<{}>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('HeroGeometric Component', () => {
  test('renders with default titles', () => {
    render(<HeroGeometric />);
    
    expect(screen.getByText('Elevate Your Digital Vision')).toBeInTheDocument();
    expect(screen.getByText('Crafting Exceptional Websites')).toBeInTheDocument();
  });
  
  test('renders with custom titles', () => {
    render(
      <HeroGeometric
        title1="Custom Title 1"
        title2="Custom Title 2"
      />
    );
    
    expect(screen.getByText('Custom Title 1')).toBeInTheDocument();
    expect(screen.getByText('Custom Title 2')).toBeInTheDocument();
  });
  
  test('renders project description text', () => {
    render(<HeroGeometric />);
    
    expect(screen.getByText(/bu proje hakan aydın tarafından verilen jwt ile kullanıcı girişi kontrolü projesidir/i)).toBeInTheDocument();
    expect(screen.getByText(/ali kemal çalak, taha emir kamacı ve enes uzun tarafından yapılmıştır/i, { exact: false })).toBeInTheDocument();
  });
});
