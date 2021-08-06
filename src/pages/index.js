import React, { useState } from "react";
import Head from "next/head";
import { TopNavbar, Items, BottomNavbar, LoadingBox } from "../components";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Index = () => {
  const { data, error } = useSWR("/api/items/", fetcher);

  const [searchedResult, setSearchedResult] = useState(null);

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

  if (error) return <div>Failed To Load euy :"</div>;
  if (!data) return <LoadingBox></LoadingBox>;

  return (
    <>
      <Head>
        <title>Bagi Barang</title>
      </Head>
      <div className="h-full w-full">
        <TopNavbar search={search}></TopNavbar>
          <Items items={data} searchedItems={searchedResult}></Items>
        <BottomNavbar></BottomNavbar>
      </div>
    </>
  );
};

// export async function getServerSideProps() {
//   const { db } = await connectToDatabase();
//   try {
//     const items = await db
//       .collection("items")
//       .aggregate([
//         {
//           $lookup: {
//             from: "users",
//             localField: "user_id",
//             foreignField: "_id",
//             as: "uploader",
//           },
//         },
//       ])
//       .toArray();

//     if (!items) {
//       return {
//         notFound: true,
//       };
//     }

//     return {
//       props: {
//         items: JSON.parse(JSON.stringify(items)),
//       }
//     };
//   } catch (err) {
//     return console.log(err);
//   }
// }
export default Index;
