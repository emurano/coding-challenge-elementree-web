import React from "react";
import './map-box-init';
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Map from "./index";


jest.mock('./map-old-box-init', () => {
  const testStyle = {
    version: 8,
    sources: {
      land: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-77.0323, 38.9131],
          },
          properties: {
            title: "Mapbox DC",
            "marker-symbol": "monument",
          },
        },
      },
    },
    layers: [
      {
        id: "land",
        type: "fill",
        source: "land",
        paint: {
          "fill-color": "#f0e9e1",
        },
      },
    ],
  };

  const originalModule = jest.requireActual('./map-old-box-init');
  return {
    __esModule: true,
    ...originalModule,
    initialiseMapBox: jest.fn((map, container, options) => {
      originalModule.initialiseMapBoxCore(map, container, {
        ...options,
        style: testStyle,
        testMode: true
      });
    })
  };
});

describe('map', () => {

  beforeEach(() => {
  });

  it('something', async () => {
    const { container } = render(<Map locations={[]}/>);

    fireEvent.scroll(screen.getByTestId('map-old-map-old-object'), {
      target: { scrollY: -100 }
    });

    await waitFor(() => expect(screen.getByTestId('map-old-zoom')).toHaveTextContent('Zoom: 7'));
  });
})