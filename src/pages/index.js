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

  const { data , mutate } = useSWR(`/api/items?skip=0`, fetcher, {
    revalidateOnFocus: false,
  });

  const [isSearching, setSearchingStatus] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchProvince, setSearchProvince] = useState("");

  const mutation = (url) => {
    console.table(data.itemsTotal, data.result.length, lastSkip, fetchedData.length);
    if (
      data.itemsTotal !== data.result.length &&
      lastSkip < data.result.length
    ) {
      setSearchingStatus(true);
      mutate(async (items) => {
        const newData = await axios.get(url).then((res) => {
          if (res.data.result) {
            setSearchingStatus(false);
            setLastSkip((prev) => prev + 2);
            return res.data.result;
          }
        });
        return {
          result: [...items.result, ...newData],
          itemsTotal: items.itemsTotal,
        };
      }, false);
    }
  };

  const itemsData = data ? [].concat(...data.result) : [];

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
          mutate(() => {
            setSearchKeyword(keywords);
            setSearchProvince(province);
              setLastSkip(0);

            return { ...res.data };
          }, false);
        });
    } else {
      if (fetchToken) {
        fetchToken.cancel();
      }

      fetchToken = axios.CancelToken.source();

      await axios
        .get("/api/items?skip=0", { cancelToken: fetchToken.token })
        .then((res) => {
          mutate(() => {
              setLastSkip(0);

            setSearchKeyword("");
            setSearchProvince("");
            return {
              result: res.data.result,
              itemsTotal: res.data.itemsTotal,
            };
          }, false);
        });
    }
  };

  const observerCallback = (entries) => {
    try {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (!searchKeyword) {
          mutation(`/api/items?skip=${lastSkip + 2}`);
        } else {
          mutation(
            `/api/items/search?q=${searchKeyword}&province=${searchProvince}&skip=${
              lastSkip + 2
            }`
          );
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

    setFetchedData([...itemsData]);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [data]);

  return (
    <>
      <Head>
        <title>Bagi Barang</title>
      </Head>
      <div className="h-full w-full">
        {!data && <LoadingBox></LoadingBox>}
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
