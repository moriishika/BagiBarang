import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { TopNavbar, Items, BottomNavbar, LoadingBox } from "../components";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Index = () => {
  const [skip, setSkip] = useState(0);

  let fetchToken;

  const { data, mutate } = useSWR(`/api/items?skip=0`, fetcher, {
    revalidateOnFocus: false,
  });

  const [isSearching, setSearchingStatus] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchProvince, setSearchProvince] = useState("");

  const mutation = (url) => {
    if (data.itemsTotal !== data.result.length && skip < data.result.length) {
      setSearchingStatus(true);
      mutate(async (items) => {
        const newData = await axios
          .get(url)
          .then((res) => {
            if (res.data.result) {
              setSearchingStatus(false);
              setSkip((prev) => prev + 2);
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
            setSkip(0);

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
            setSkip(0);
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
          mutation(`/api/items?skip=${skip + 2}`);
        } else {
          mutation(
            `/api/items/search?q=${searchKeyword}&province=${searchProvince}&skip=${
              skip + 2
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
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [data]);

  if (!data) return <LoadingBox></LoadingBox>;
  return (
    <>
      <Head>
        <title>Bagi Barang</title>
      </Head>
      <div className="h-full w-full">
        <TopNavbar search={search}></TopNavbar>

        <Items
          items={itemsData}
          inProfile={false}
          keywords={searchKeyword}
          province={searchProvince}
        ></Items>
        
        <div className="w-full h-20 flex justify-center items-center" ref={loadMoreRef}>
          {isSearching && <h1 className="text-2xl font-semibold">Sedang Meng-loding data 🤹‍♀️</h1>}
        </div>
        <BottomNavbar></BottomNavbar>
      </div>
    </>
  );
};
export default Index;
