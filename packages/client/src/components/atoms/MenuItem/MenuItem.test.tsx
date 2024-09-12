// import { render, screen } from '@testing-library/react';
// import { vi } from 'vitest';

// import MenuItem from './MenuItem';

// // Mock SVG Icon component
// const MockIcon = vi.fn(() => <svg data-testid="mock-icon" />);

// describe('MenuItem Component', () => {
//     it('renders without crashing', () => {
//         render(<MenuItem text="Test Menu Item" />);
//         expect(screen.getByText('Test Menu Item')).toBeInTheDocument();
//     });

//     it('renders with an href when provided', () => {
//         render(<MenuItem href="/test" text="Test Link" />);
//         const linkElement = screen.getByRole('link');
//         expect(linkElement).toHaveAttribute('href', '/test');
//         expect(screen.getByText('Test Link')).toBeInTheDocument();
//     });

//     it('renders without an href when not provided', () => {
//         render(<MenuItem text="Test Div" />);
//         const divElement = screen.getByText('Test Div').closest('div');
//         expect(divElement?.tagName).toBe('DIV');
//     });

//     it('renders an icon when provided', () => {
//         render(<MenuItem text="With Icon" icon={MockIcon} />);
//         expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
//     });

//     it('does not render an icon when not provided', () => {
//         render(<MenuItem text="Without Icon" />);
//         expect(screen.queryByTestId('mock-icon')).toBeNull();
//     });

//     it('renders children correctly', () => {
//         render(
//             <MenuItem>
//                 <span data-testid="child-element">Child Element</span>
//             </MenuItem>
//         );
//         expect(screen.getByTestId('child-element')).toBeInTheDocument();
//     });

//     it('applies className when provided', () => {
//         render(<MenuItem text="Styled Item" className="custom-class" />);
//         const wrapperDiv = screen.getByText('Styled Item').closest('div');
//         expect(wrapperDiv).toHaveClass('custom-class');
//     });

//     it('applies default flex class to the wrapper', () => {
//         render(<MenuItem text="Default Styles" />);
//         const wrapperElement = screen.getByText('Default Styles').closest('div');
//         expect(wrapperElement?.firstChild).toHaveClass('flex flex-row items-center px-2 gap-3');
//     });
// });
