import { render, fireEvent } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { BrowserRouter } from 'react-router-dom';

describe('NavBar', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );
    expect(getByText('F1')).toBeInTheDocument();
  });

  test('logo animation triggers on click', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );
    const logo = getByTestId('nav-logo');

    expect(logo).not.toHaveClass('car-logo-animate');
    fireEvent.click(logo);
    expect(logo).toHaveClass('car-logo-animate');
  });
});
