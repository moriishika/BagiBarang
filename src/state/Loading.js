import {createContext} from 'react';

const Loading  = createContext({
    isLoading : false,
    loadingMessage : 'Mohon Tunggu',
    setLoadingStatus : (status) => {},
    setLoadingMessage : (message)=> {}
});

export default Loading;




