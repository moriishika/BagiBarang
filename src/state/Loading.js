import {createContext} from 'react';

const Loading  = createContext({
    isLoading : false,
    loadingMessage : 'Mohon Tunggu',
    isSuccess : null,
    setLoadingStatus : (status) => {},
    setLoadingMessage : (message)=> {},
    setSuccessStatus : (status) => {}
});

export default Loading;




