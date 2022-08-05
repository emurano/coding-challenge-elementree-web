import React, { useRef, useState } from "react";
import Map from "../map";
import { Map as MapBoxMap } from "mapbox-gl";

export default function MapController() {

  const locations = [
    {lat: 42.35, lng: -70.9},
    {lat: 42.3, lng: -70}
  ];


  return (
    <Map locations={locations} />
  );
}