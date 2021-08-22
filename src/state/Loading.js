import {createContext} from 'react';

const Loading  = createContext({
    isLoading : false,
    loadingMessage : 'Mohon Tunggu',
    isSuccess : false,
    setLoadingStatus : (status) => {},
    setLoadingMessage : (message)=> {},
    setSuccessStatus : (status) => {}
});

export default Loading;




