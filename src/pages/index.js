import React, { useEffect, useRef, useState, useContext } from "react";
import Head from "next/head";
import { TopNavbar, Items, BottomNavbar, LoadingBox } from "../components";
import useSWR from "swr";
import axios from "axios";
import { FetchedData } from "../state";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Index = () => {
  // const [skip, setSkip] = useState(0);
  const { fetchedData, setFetchedData, lastSkip, setLastSkip } =
    useContext(FetchedData);

  let fetchToken;

  const getInitialData = async () => {
    try{
      const data = await axios.get("/api/items?skip=0").then((res) => res.data);
      setFetchedData([...data.result]);
      setLastSkip(0);
    }catch(err) { 
      console.log(err);
    }
  };

  const fetchMoreData = async (url) => {
    console.log(url)
    try {
      const data = await axios.get(url).then(res => {
        setLastSkip((skip) => skip + 2);
        return res.data
      });
      setFetchedData((prevData) => [...prevData, ...data.result]);
    } catch (err) {
      console.log(err);
    }
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
            setLastSkip(0);
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
            getInitialData()
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
          if (!searchKeyword && !searchProvince) {
            fetchMoreData(`/api/items?skip=${ lastSkip + 2 }`);
          } else {
            fetchMoreData(`/api/items/search?q=${searchKeyword}&province=${searchProvince}&skip=${lastSkip + 2}`);
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

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [fetchedData]);

  useEffect(() => {
    
    if (!fetchedData.length) {
      getInitialData();
    }

    console.log(fetchedData);
  }, []);

  return (
    <>
      <Head>
        <title>Bagi Barang</title>
      </Head>
      <div className="h-full w-full">
        {!fetchedData && <LoadingBox></LoadingBox>}
        <TopNavbar search={search}></TopNavbar>

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
