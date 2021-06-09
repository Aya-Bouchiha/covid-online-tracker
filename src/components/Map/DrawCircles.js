import {formatNumber} from "../Utilities/formatNumber"; // for formating numbers  like:1000 to '1k'
import { CountriesDataContext } from "../../Data/CountriesData";
import React, { useContext } from "react";
import { CircleMarker, Popup, } from 'react-leaflet';
import { Typography } from '@material-ui/core';
const Dividers = { // those random numbers has a role to divid a large number for getting a small raduis.
  cases: 40, 
  recovered:36,
  deaths : 10,
}
const DrawCircles = ({typeOfData}) => {
  const CountriesData = useContext(CountriesDataContext);
  return (
    <div >
      {CountriesData !== null &&
        CountriesData.map((country, index) => {
          const raduis = Math.sqrt(country[typeOfData]) / Dividers[typeOfData]; //dividing  because the number is very large so the raduis of circle will be bigger
          return (
            <CircleMarker
              key={index}
              opacity={1}
              center={[country.countryInfo.lat, country.countryInfo.long]}
              radius={raduis}
            >
              <Popup>
                <img
                  src={country.countryInfo.flag}
                  style={{ width: "100%", marginBottom: 6 }}
                  alt={country.countryInfo.countryCode}
                />
                <Typography variant="subtitle" color="textPrimary">
                  {country.country}
                </Typography>
                <br />
                all cases:
                <Typography variant="subtitle" color="primary">
                  {formatNumber(country.cases)}
                </Typography>
                <br />
                all recovered:
                <Typography variant="subtitle" color="secondary">
                  {formatNumber(country.recovered)}
                </Typography>
                <br />
                all deaths:
                <Typography variant="subtitle" color="error">
                  {formatNumber(country.deaths)}
                </Typography>
              </Popup>
            </CircleMarker>
          );
        })}
    </div>
  );
}
export default DrawCircles; 