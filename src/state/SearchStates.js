import {createContext, useState} from 'react';

const SearchStates = createContext({
    searchKeyword : '',
    searchProvince : '', 
    setSearchKeyword : (keyword) => {}, 
    setSearchProvince : (province) => {} 
})

export default SearchStates;