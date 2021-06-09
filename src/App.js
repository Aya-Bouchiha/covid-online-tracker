import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Graph from './components/Graph/Graph';
import NavBar from './components/NavBar/NavBar';
import CountriesDataProvider from "./Data/CountriesData";
import Table from "./components/Table/Table";
import Footer from "./components/Footer/Footer";
import CountryInfo from './components/CountryInfo/CountryInfo';
import { ThemeProvider } from '@material-ui/core/styles';
import { Theme } from './components/Utilities/ThemeColor';
import { BrowserRouter as Router,Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <CountriesDataProvider>
        <ThemeProvider theme={Theme}>
          <section className="base-section">
            {/* Nav Bar */}
            <NavBar />
            {/* 'Countries info' component include (selectBox,the cases,recovered,deaths of selected country) */}
            <Route path="/:type?" component={CountryInfo} />
            <article className="table-graph">
              {/* Table */}
              <Table />
              {/* Graph */}
              <Route path="/:type?" component={Graph} /> {/* you can just create a compoenent that include the Country Info and the Graph and create just one route */}
            </article>
            <Footer />
          </section>
        </ThemeProvider>
      </CountriesDataProvider>
    </Router>
  );
}
export default App;