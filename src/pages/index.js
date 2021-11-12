import React, { useEffect, useRef, useState, useContext } from "react";
import Head from "next/head";
import { TopNavbar, Items, BottomNavbar, LoadingBox } from "../components";
import axios from "axios";
import { FetchedData, ScrollPositition } from "../state";

const Index = () => {
  const {
    fetchedData,
    setFetchedData,
    lastSkip,
    setLastSkip,
    totalItems,
    setTotalItems,
  } = useContext(FetchedData);

  const {scrollHeight, setScrollHeight} = useContext(ScrollPositition)

  const [skip, setSkip] = useState(lastSkip);

  const getInitialData = async () => {
    await axios.get("/api/items?skip=0").then((res) => {
      setTotalItems(res.data.itemsTotal);
      setSkip(2);
      setFetchedData([...res.data.result]);
    });
  };

  const fetchMoreData = async (url) => {
    setSearchingStatus(true);
    const data = await axios.get(url).then((res) => {
      return res.data;
    });
    setSearchingStatus(false);
    setSkip((prev) => prev + 2);
    if (
      JSON.stringify(fetchedData[fetchedData.length - 1]) ===
      JSON.stringify(data.result[0])
    ) {
      setFetchedData((prevData) => {
        return [...prevData, data.result[1]];
      });
    } else {
      setFetchedData((prevData) => [...prevData, ...data.result]);
    }
  };

  const [isSearching, setSearchingStatus] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchProvince, setSearchProvince] = useState("");

  const loadMoreRef = useRef(null);
  let fetchToken;

  const search = async (keywords, province) => {
    setSearchingStatus(true);

    if (keywords || province) {
      if (fetchToken) {
        fetchToken.cancel();
      }

      fetchToken = axios.CancelToken.source();

      await axios
        .get(`/api/items/search?q=${keywords}&province=${province}&skip=0`, {
          cancelToken: fetchToken.token,
        })
        .then((res) => {
          setSearchKeyword(keywords);
          setSearchProvince(province);
          setTotalItems(res.data.itemsTotal);
          setSearchingStatus(false);
          setSkip(0);
          setFetchedData([...res.data.result]);
        });
    } else {
      if (fetchToken) {
        fetchToken.cancel();
      }

      fetchToken = axios.CancelToken.source();
      await axios
        .get("/api/items?skip=0", { cancelToken: fetchToken.token })
        .then((res) => {
          setSearchKeyword("");
          setSearchProvince("");
          setSearchingStatus(false);
          getInitialData();
        });
    }
  };

  const observerCallback = (entries) => {
    console.table([totalItems, fetchedData.length, skip])
    
    try {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (totalItems !== fetchedData.length && skip < totalItems) {
          if (!searchKeyword && !searchProvince) {
            fetchMoreData(`/api/items?skip=${skip}`);
          } else {
            fetchMoreData(
              `/api/items/search?q=${searchKeyword}&province=${searchProvince}&skip=${
                skip + 2
              }`
            );
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const options = {
    root: null,
    rootMargin: "0px",
    thershold: 1.0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
      setLastSkip(skip);
    };
  }, [fetchedData]);

  const saveScrollHeight = () => {
    console.log(window.scrollY);
    setScrollHeight(window.scrollY)
  }

  useEffect(() => {
    document.addEventListener('wheel', saveScrollHeight)
    return () => {
        document.removeEventListener('wheel', saveScrollHeight)
    }
}, [saveScrollHeight])

  useEffect(() => {
    console.table(["scroll h state", scrollHeight])
    
    

    const newDataChecker = async () => {
      const data = await axios
        .get("/api/items?skip=0")
        .then((res) => {
          window.scrollTo({
            top: scrollHeight
          })
          return res.data.result[0]
        });
      if (JSON.stringify(data) !== JSON.stringify(fetchedData[0])) {
        setFetchedData((prev) => [data, ...prev]);
      }
    };

    newDataChecker();

    if (!fetchedData.length) {
      getInitialData();
      
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Bagi Barang</title>
      </Head>
      <div className="h-full w-full" onScroll={(e) => console.log(e.target.scrollHeight)}>
        {!fetchedData.length && !searchKeyword && !searchProvince && (
          <LoadingBox></LoadingBox>
        )}
        <TopNavbar
          search={search}
          keywords={searchKeyword}
          province={searchProvince}
        ></TopNavbar>
        <Items
          items={fetchedData}
          inProfile={false}
          keywords={searchKeyword}
          province={searchProvince}
        ></Items>

        <div
          className="w-full h-20 flex justify-center items-center"
          ref={loadMoreRef}
        >
          {isSearching && (
            <h1 className="text-2xl font-semibold">
              Sedang Meng-loding data 🤹‍♀️
            </h1>
          )}
        </div>
        <BottomNavbar></BottomNavbar>
      </div>
    </div>
  );
};
export default Index;
