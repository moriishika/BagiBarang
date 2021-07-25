import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
// import ItemsModel from "../models/Items";
// import axios from "axios";
import { TopNavbar, Items, BottomNavbar, LoadingBox } from "../components";
import { connectToDatabase } from "../libs/database";

const Index = ({ items }) => {
  const [searchedResult, setSearchedResult] = useState(null);

  // const [items, setItems] = useState([]);

  const search = async (keywords, province) => {
    if (keywords) {
      const result = items.filter((item) => {
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

  // useEffect(() => {
  //   axios
  //     .get("/api/items")
  //     .then((res) => {
  //       setItems(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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
  const db = await connectToDatabase();
  try {
    const items = await db
      .collection("items")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "uploader",
          },
        },
      ])
      .toArray();

    if (!items) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        items: JSON.parse(JSON.stringify(items)),
      },
    };
  } catch (err) {
    return console.log(err);
  }
}
export default Index;
