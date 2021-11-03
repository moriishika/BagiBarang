import React, { useEffect, useRef, useState, useContext } from "react";
import Head from "next/head";
import { TopNavbar, Items, BottomNavbar, LoadingBox } from "../components";
// import useSWR from "swr";
import axios from "axios";
import { FetchedData } from "../state";

// const fetcher = (url) => axios.get(url).then((res) => res.data);

const Index = () => {
  const {
    fetchedData,
    setFetchedData,
    lastSkip,
    setLastSkip,
    totalItems,
    setTotalItems,
  } = useContext(FetchedData);

  const [skip, setSkip] = useState(lastSkip);

  let fetchToken;

  const getInitialData = async () => {
    const data = await axios.get("/api/items?skip=0").then((res) => {
      setTotalItems(res.data.itemsTotal);
      setSkip(2);
      setFetchedData([...res.data.result]);
    });
  };

  const fetchMoreData = async (url) => {
    console.log(url);
    const data = await axios.get(url).then((res) => {
      return res.data;
    });
    setSkip((prev) => prev + 2);
    setFetchedData((prevData) => [...prevData, ...data.result]);
  };

  // const { data , mutate } = useSWR(`/api/items?skip=0`, fetcher, {
  //   revalidateOnFocus: false,
  // });

  const [isSearching, setSearchingStatus] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchProvince, setSearchProvince] = useState("");

  // const mutation = (url) => {
  //   console.table(data.itemsTotal, data.result.length, lastSkip, fetchedData.length);
  //   if (
  //     data.itemsTotal !== data.result.length &&
  //     lastSkip < data.result.length
  //   ) {
  //     setSearchingStatus(true);
  //     mutate(async (items) => {
  //       const newData = await axios.get(url).then((res) => {
  //         if (res.data.result) {
  //           setSearchingStatus(false);
  //           setLastSkip((prev) => prev + 2);
  //           return res.data.result;
  //         }
  //       });
  //       return {
  //         result: [...items.result, ...newData],
  //         itemsTotal: items.itemsTotal,
  //       };
  //     }, false);
  //   }
  // };

  // const itemsData = data ? [].concat(...data.result) : [];

  const loadMoreRef = useRef(null);

  const search = async (keywords, province) => {
    console.log("MASUK KE SEARCH");
    setSearchingStatus(true);

    if (keywords || province) {
      console.log("masuk ke keyowrd search");
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
          setTotalItems(res.data.itemsTotal)
          setSearchingStatus(false);
          setSkip(0);
          setFetchedData([...res.data.result]);
        });
    } else {
      console.log("masuk ke else Search");
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

  // const observerCallback = (entries) => {
  //   try {
  //     const [entry] = entries;
  //     if (entry.isIntersecting) {
  //       if (!searchKeyword) {
  //         mutate(
  //           `/api/items?skip=${ lastSkip + 2 }`
  //         )
  //       } else {
  //        mutate(
  //           `/api/items/search?q=${searchKeyword}&province=${searchProvince}&skip=${
  //             lastSkip + 2
  //           }`
  //         )
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const observerCallback = (entries) => {
    try {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (
          totalItems !== fetchedData.length &&
          skip < totalItems ) {
          console.count("masuk");
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

  // useEffect(() => {
  //   const observer = new IntersectionObserver(observerCallback, options);
  //   if (loadMoreRef.current) {
  //     observer.observe(loadMoreRef.current);
  //   }

  //   setFetchedData([...itemsData]);

  //   return () => {
  //     if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
  //   };
  // }, [fetchedData]);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    console.table([fetchedData, totalItems, lastSkip]);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
      setLastSkip(skip);
    };
  }, [fetchedData]);

  useEffect(() => {
    if (!fetchedData.length) {
      console.log("MASUK KESINI ");
      getInitialData();
    }
  }, []);

  useEffect(() => {
    console.table(["LAST SKIP", lastSkip]);
  }, [lastSkip]);

  return (
    <>
      <Head>
        <title>Bagi Barang</title>
      </Head>
      <div className="h-full w-full">
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
    </>
  );
};
export default Index;
