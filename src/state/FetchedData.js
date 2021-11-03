import { createContext } from "react";

const FetchedData = createContext({
  fetchedData: [],
  setFetchedData: (data) => {},
  lastSkip : 0,
  setLastSkip : (skip) => {},
  totalItems : 0,
  setTotalItems : (total) => {}
});

export default FetchedData;