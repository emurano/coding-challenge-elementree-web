import React from 'react';
import { render, screen } from '@testing-library/react';
import HoveringError from 'components/hovering-error/index';

describe('<HoveringError/>', () => {
  it('includes the test id if one is passed through the props', () => {
    render(
      <HoveringError testId="my-test-id" errorMessage="computer says no" />
    );

    expect(screen.getByTestId('my-test-id')).toBeInTheDocument();
  });

  it('still renders when no test id is passed through the props', () => {
    render(<HoveringError errorMessage="computer says no"/>);

    expect(screen.getByText('computer says no')).toBeTruthy();
  });
});
