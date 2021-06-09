import React from 'react';

// import PropTypes from 'prop-types';
const SelectBoxOptions = ({ CountryName, CountryCode }) => {
    /* 
        This Component return the options of select Box,
        which are: 
            CountryCode => value of the option
            CountryName => the Name of the options
        Example :
        <option value="Ma">Morocco</option>
    */
    return <option value={CountryCode}>{CountryName}</option>;
}
export default SelectBoxOptions;