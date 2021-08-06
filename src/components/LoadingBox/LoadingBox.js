import { useContext, useEffect } from "react";
import { Loading } from "../../state";
const LoadingBox = () => {
  const { loadingMessage } = useContext(Loading);  
  return (
    <div className="fixed z-40 bg-black bg-opacity-10 w-full h-full flex justify-center items-center border border-black">
      <div className="w-52 h-52 shadow-xl bg-white rounded-lg flex flex-col justify-center items-center">
        <img src="/assets/icons/loading.gif" width={100} height={100}></img>
        <h1 className="mt-3 font-bold">{loadingMessage}</h1>
      </div>
    </div>
  );
};

export default LoadingBox;
