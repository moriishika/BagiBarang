import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { TopNavbar, Items, BottomNavbar, LoadingBox } from "../components";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Index = () => {
  const [skip, setSkip] = useState(0);
  
  const { data, error, mutate } = useSWR(`/api/items?skip=0`, fetcher, {revalidateOnFocus : false});
  
  const [searchedResult, setSearchedResult] = useState(null);

  const itemsData =  data ? [].concat(...data.result) : [];
  
  const loadMoreRef = useRef(null);
  
  const search = async (keywords, province) => {
    if (keywords) {
      const result = data.filter((item) => {
        return (
          item.name.toLowerCase().includes(keywords.toLowerCase()) ||
          item.province === province ||
          item.uploader[0].name.toLowerCase() === keywords.toLowerCase()
          );
        });
      setSearchedResult(result);
    } else {
      setSearchedResult(null);
    }
  };
  
  const observerCallback = (entries) => {
    try {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (data.itemsTotal !== data.result.length && skip < data.result.length) {
          mutate(async (items) => {
              const newData = await axios
              .get(`/api/items?skip=${skip + 2}`)
              .then((res) => {
                if(res.data.result){ 
                  setSkip((prev) => prev + 2);
                  return res.data.result;
                }
              });
              return {result : [...items.result, ...newData], itemsTotal : items.itemsTotal};
          }, false);
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
    console.log(data);
    const observer = new IntersectionObserver(observerCallback, options);
    console.log(loadMoreRef.current);
    if (loadMoreRef.current) {
      console.log(loadMoreRef.current);
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [data]);

  if (error) return <div>Failed To Load euy :"</div>;
  if (!data) return <LoadingBox></LoadingBox>;
  return (
    <>
      <Head>
        <title>Bagi Barang</title>
      </Head>
      <div className="h-full w-full">
        <TopNavbar search={search}></TopNavbar>
        <Items items={itemsData} searchedItems={searchedResult}></Items>
        <div className="w-full h-20 bg-red-200" ref={loadMoreRef}></div>
        <BottomNavbar></BottomNavbar>
      </div>
    </>
  );
};
export default Index;
