import React from "react";
import LocationPlotMap from "../location-plot-map";

export default function MapController() {

  const locations = [
    {lat: 37.8, lng: -122.4}
  ];

  return (
    <LocationPlotMap locations={locations} />
  );
}