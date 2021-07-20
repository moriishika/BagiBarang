import React, { useState } from "react";
import Head from "next/head";
import ItemsModel from "../models/Items";
import { TopNavbar, Items, BottomNavbar } from "../components";

const Index = ({ items }) => {
  const [searchedResult, setSearchedResult] = useState(null);

  const search = async (keywords, province) => {
    if (keywords) {
      const result = JSON.parse(items).filter((item) => {
        return item.name.toLowerCase().includes(keywords.toLowerCase());
      });
      console.log(result);
      setSearchedResult(result);
    } else {
      setSearchedResult(null);
    }
  };

  return (
    <>
      <Head>
        <title>Bagi Barang</title>
      </Head>
      <div className="h-full w-full">
        <TopNavbar search={search}></TopNavbar>
        <Items items={items} searchedItems={searchedResult}></Items>
        <BottomNavbar></BottomNavbar>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const items = await ItemsModel.find((err, items) => {
    if (err) return console.error(err);
    return items;
  });

  if (!items) {
    return {
        notFound : true
    };
  }

  return {
    props: {
      items: JSON.stringify(items),
    },
  };
}
export default Index;
