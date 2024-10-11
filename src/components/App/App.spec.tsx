import { render } from "@testing-library/react";
import App from './App.tsx';

describe('App', () => {
  it('should render', () => {
    const { getByText } = render(<App />);

    expect(getByText('Vite + React + TS')).toBeInTheDocument();
  });
});