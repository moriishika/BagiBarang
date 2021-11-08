import { createContext } from "react";

const ScrollPositition = createContext({
  scrollHeight : 0,
  setScrollHeight : (height) => {},
});

export default ScrollPositition;