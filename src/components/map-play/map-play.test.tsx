import React from "react";
import './map-box-init';
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import MapPlay from "./index";


jest.mock('./map-box-init', () => {
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

  const originalModule = jest.requireActual('./map-box-init');
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

describe('map-play', () => {

  beforeEach(() => {
  });

  it('something', async () => {
    const { container } = render(<MapPlay />);

    fireEvent.scroll(screen.getByTestId('map-play-map-object'), {
      target: { scrollY: -100 }
    });
    // fireEvent(
    //   screen.getByTestId('map-play-map-object'),
    //   new MouseEvent('scroll', {
    //     movementY: 100
    //   })
    // )
    //

    // fireEvent.wheel(
    //   screen.getByTestId('map-play-map-object'),
    //   {
    //     bubbles: true,
    //     deltaY: 30,
    //     x: 30,
    //     y: 30,
    //     deltaMode: WheelEvent.DOM_DELTA_LINE
    //   }
    // );

    await waitFor(() => expect(screen.getByTestId('map-play-zoom')).toHaveTextContent('Zoom: 7'));
  });
})