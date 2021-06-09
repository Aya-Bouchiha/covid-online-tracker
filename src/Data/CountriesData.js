import React from 'react';
import useFetch from '../components/Utilities/useFetch';
const url = "https://disease.sh/v3/covid-19/countries/";
export const CountriesDataContext = React.createContext(null);
const CountriesDataProvider = ({ children }) => {
    const data = useFetch(url);
    return (
        <CountriesDataContext.Provider value={data}>
            {children}
        </CountriesDataContext.Provider>
    )
}

export default CountriesDataProvider;