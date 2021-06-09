import React,{useContext,useEffect , useState} from 'react';
import { CountriesDataContext } from '../../Data/CountriesData';
import Form from "react-bootstrap/Form";
import CountryCards from './CountryCards';
import SelectBoxOptions from './SelectBoxOptions';
import Map from '../Map/Map';
import { useParams } from 'react-router-dom';
import './CountryInfo.css';
const CountryInfo = ({loadingcircle}) => {
    let CountriesData = useContext(CountriesDataContext); // all countries data
    const [CountriesInfo, setCountriesInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://disease.sh/v3/covid-19/all");
    const [selectedCountry, setSelectedCountry] = useState('all');
    let { type } = useParams(); // type of data [cases,recovereds,deaths  
    if (type!=='recovered' && type!=='cases' && type !== 'deaths' ) {
      type = 'cases';
    }
      useEffect(() => {
      if (CountriesData !== null) {
            // getting just the country name and its code
            setCountriesInfo(
            CountriesData.map((country) => ({
                countryName: country.country, 
                countryCode: country.countryInfo.iso2,
            }))
            );
            setLoading(false);
      };
    }
    ,[CountriesData]);
    useEffect(() => {
      if(selectedCountry === 'all'){
        setUrl("https://disease.sh/v3/covid-19/all");
      }else{
        setUrl(`https://disease.sh/v3/covid-19/countries/${selectedCountry}`);
      }
    }, [selectedCountry])
    return (
      <React.Fragment>
        <section className="country-info">
          {/* !select box */}
          {CountriesInfo.length > 0 && (
            <Form>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Control
                  onChange={(e)=>setSelectedCountry(e.target.value)}
                  className="select-box"
                  as="select"
                  custom
                  value={selectedCountry}
                >
                  <SelectBoxOptions
                    key={1256}
                    CountryName="all"
                    CountryCode="all"
                  />
                  {CountriesInfo.map(({ countryName, countryCode }, index) => (
                    <SelectBoxOptions
                      key={index}
                      CountryName={countryName}
                      CountryCode={countryCode}
                    />
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          )}
            {/* Loading Spinner */}
          {loading && loadingcircle}
          {/* Countries Cards,it indcludes cases,recovereds,deaths,mapcente */}
          <CountryCards url={url} />
        </section>
        {/* Map */}
        <Map countriesData={CountriesData} selectedCountry={selectedCountry} typeOfData={type} />

      </React.Fragment>
    );
}
export default CountryInfo;