import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LocationPlotMap from './location-plot-map';

jest.mock('./use-map-test-mode', () => {
  return jest.fn(function () {
    return true;
  });
});

describe('<LocationPlotMap/>', () => {
  let OLD_ENV: NodeJS.ProcessEnv;

  beforeAll(() => {
    OLD_ENV = process.env;
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
      REACT_APP_MAPBOX_ACCESS_TOKEN: '',
    };
  });

  test('component top-level element renders', async () => {
    expect.hasAssertions();

    const { container } = render(
      <LocationPlotMap testId="map-test-id" locations={[]} />
    );

    expect(screen.getByTestId('map-test-id')).toBeInTheDocument();
  });
});
