const LoadingBox = ({ message }) => {
  return (
    <div className="absolute z-40 bg-black bg-opacity-10 w-full h-full flex justify-center items-center border border-black">
      <div className="w-1/5 h-1/5 bg-white rounded-lg flex justify-center items-center">
        <h1>{message ? message : "Mohon Tunggu"}</h1>
      </div>
    </div>
  );
};

export default LoadingBox;

