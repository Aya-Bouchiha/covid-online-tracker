import React,{useContext} from 'react';
import { CountriesDataContext } from '../../Data/CountriesData';
import TableCell from '@material-ui/core/TableCell';
import TableRow from "@material-ui/core/TableRow";
import {formatNumber} from '../Utilities/formatNumber';
const TableRowCountry = ({ countriesData }) => {
    return (
        <>
            {countriesData !== null && countriesData.map(({ country, cases, recovered, deaths},index) => {
                // console.log({country,cases,recovered,deaths})
                return (
                  <TableRow key={index}>
                    <TableCell>{country}</TableCell>
                    <TableCell>{cases}</TableCell>
                    <TableCell>{recovered}</TableCell>
                    <TableCell>{deaths}</TableCell>
                  </TableRow>
                );
            })
            }
        </>
    );
};

export default TableRowCountry;