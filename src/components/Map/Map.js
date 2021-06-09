import React, { useMemo,useState } from 'react';
import DrawCircles from "./DrawCircles";
import './Map.css'; // css Map file
import 'leaflet/dist/leaflet.css';
import { MapContainer, useMap, TileLayer } from "react-leaflet";
const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, 5);
  return null;
}

const Map = ({ selectedCountry, typeOfData, countriesData }) => {
  const [center, setCenter] = useState([38, 0]);
  const allCountriesData = countriesData //coontains all countries data like name,lat,long,cases...
  const countryData = useMemo(()=>allCountriesData !== null ? allCountriesData.find(country => country.countryInfo.iso2 === selectedCountry): false ,[allCountriesData, selectedCountry]);
  React.useEffect(() => {
    if (countryData) {
        setCenter([countryData.countryInfo.lat,countryData.countryInfo.long])
    }
  }, [countryData])
  return (
    <article className={`article-map map circle-marker-${typeOfData}`}>
      <h2 className="my-2 title-map" >{ typeOfData.toUpperCase() }</h2>
      <MapContainer center={[51.505, -0.09]} zoom={2}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* changing the view of the map */}
        <ChangeView center={center} />
        {/* the circles */}
        <DrawCircles typeOfData={typeOfData} />
      </MapContainer>
    </article>
  );
}

export default Map;