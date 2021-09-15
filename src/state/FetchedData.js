import { createContext } from "react";

const FetchedData = createContext({
  fetchedData: [],
  setFetchedData: (data) => {},
  lastSkip : 0,
  setLastSkip : (skip) => {}
});

export default FetchedData;