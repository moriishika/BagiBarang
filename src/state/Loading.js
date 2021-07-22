import {createContext} from 'react';

const Loading  = createContext({
    isLoading : false,
    setLoadingStatus : (status) => {}
});

export default Loading;




