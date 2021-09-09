import { useContext, useEffect } from "react";
import { Loading } from "../../state";

const LoadingBox = () => {
  const { loadingMessage, isLoading, isSuccess, setLoadingStatus, setSuccessStatus } = useContext(Loading);  
  
  useEffect(() => {
    setLoadingStatus(true)
    setSuccessStatus(null);

    return () => {
      setLoadingStatus(false);
      setSuccessStatus(null);
    }
  }, [])

  return (
    <div className="fixed z-40 bg-black bg-opacity-10 w-full h-full flex justify-center items-center border border-black">
      <div className="w-52 h-52 shadow-xl bg-white rounded-lg flex flex-col justify-center items-center">
        {(isLoading && isSuccess === null) && <h1 className="spinning text-6xl">🪐</h1>}
        {isLoading && isSuccess && isSuccess !== null && <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>}
        {isLoading && !isSuccess && isSuccess !== null && '❌'}
        <h1 className="mt-3 font-bold">{loadingMessage}</h1>
      </div>
    </div>  
  );
};

export default LoadingBox;
