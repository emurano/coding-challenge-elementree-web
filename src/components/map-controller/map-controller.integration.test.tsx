import { render, screen } from '@testing-library/react';
import * as React from 'react';
import nock from 'nock';
import MapController from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

nock.disableNetConnect();

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

const mockSuccessfulServerRequest = () => {
  return (
    nock('http://mocked-server')
      .get('/locations?get params here...')
      .reply(200, [
        {
          lat: 22.878720639709456,
          lng: 72.89357473253368,
        },
        {
          lat: 23.893675909946552,
          lng: 57.619297924260906,
        },
      ])
  );
};

const renderMapController = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <MapController />
    </QueryClientProvider>
  );

describe('<MapController />', () => {
  let env: NodeJS.ProcessEnv;

  beforeAll(() => {
    env = process.env;
    process.env.REACT_APP_API_BASEURL = 'http://mocked-server';
  });

  afterAll(() => {
    process.env = env;
  });

  /**
   * I realised at this point that the request to the server won't happen on mount,
   * instead, it will happen only when a call to onBoundsChange is called with a
   * valid MapBounds value.
   *
   * If I were to continue with this coding challenge, I would have rewritten
   * the tests in this file to trigger the onBoundsChange function and go from
   * there.
   */
  describe('component mounts, before the server request returns successfully', () => {
    it('loading spinner appears on the page', () => {
      mockSuccessfulServerRequest();

      renderMapController();

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('error message does not appear on the pagee', () => {
      mockSuccessfulServerRequest();

      renderMapController();

      expect(screen.queryByTestId('error-message')).toBeNull();
    });

    it('map component appears on the page', () => {
      mockSuccessfulServerRequest();

      renderMapController();

      expect(screen.getByTestId('map-component')).toBeInTheDocument();
    });
  });
});
