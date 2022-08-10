import React from 'react';
import { render, screen } from '@testing-library/react';
import MapController from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as hook from 'components/map-controller/use-map-controller';

jest.mock('../map', () => () => {
  return <div data-testid="map-component">Fake Map</div>;
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockHookLoading = () => {
  jest.spyOn(hook, 'default').mockImplementation(() => ({
    onBoundsChange: jest.fn(),
    isLoading: true,
    isError: false,
    locations: [],
  }));
};

const mockHookInError = () => {
  jest.spyOn(hook, 'default').mockImplementation(() => ({
    onBoundsChange: jest.fn(),
    isLoading: false,
    isError: true,
    error: 'something went wrong',
    locations: [],
  }));
};

const mockHookWithLocations = () => {
  jest.spyOn(hook, 'default').mockImplementation(() => ({
    onBoundsChange: jest.fn(),
    isLoading: false,
    isError: false,
    locations: [
      {lat: 10, lng: 20},
      {lat: 11, lng: 21},
      {lat: 12, lng: 22}
    ],
  }));
};

describe('<MapController />', () => {
  const renderMapController = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <MapController />
      </QueryClientProvider>
    );

  describe('locations are loading from the server', () => {
    beforeEach(() => {
      mockHookLoading();
    });

    it('loading spinner appears on the page', () => {
      renderMapController();

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('error message does not appear on the page', () => {
      renderMapController();

      expect(screen.queryByTestId('error-message')).toBeNull();
    });

    it('map component appears on the page', () => {
      renderMapController();

      expect(screen.getByTestId('map-component')).toBeInTheDocument();
    });
  });

  describe('an error occurred while loading the locations from the server', () => {
    beforeEach(() => {
      mockHookInError();
    });

    it('loading spinner does not appear on the page', () => {
      renderMapController();

      expect(screen.queryByTestId('loading-spinner')).toBeNull();
    });

    it('error message appears on the page', () => {
      renderMapController();

      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'something went wrong'
      );
    });

    it('map component appears on the page', () => {
      renderMapController();

      expect(screen.getByTestId('map-component')).toBeInTheDocument();
    });
  });

  describe('locations were loaded from the server', () => {
    beforeEach(() => {
      mockHookWithLocations();
    });

    it('loading spinner does not appear on the page', () => {
      renderMapController();

      expect(screen.queryByTestId('loading-spinner')).toBeNull();
    });

    it('error message does not appear on the page', () => {
      renderMapController();

      expect(screen.queryByTestId('error-message')).toBeNull();
    });

    it('map component appears on the page', () => {
      renderMapController();

      expect(screen.getByTestId('map-component')).toBeInTheDocument();
    });
  });
});
