import React from 'react';
import { render, screen } from '@testing-library/react';
import HoveringLoader from "components/hovering-loader";

describe('<HoveringLoader/>', () => {
  it('includes the test id if one is passed through the props', () => {
    render(<HoveringLoader testId="my-test-id" />);

    expect(screen.getByTestId('my-test-id')).toBeInTheDocument();
  });

  it('still renders when no test id is passed through the props', () => {
    render(<HoveringLoader />);

    expect(screen.getByText('Loading ...')).toBeTruthy();
  });
});
