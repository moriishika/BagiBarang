import Head from "next/head";
import { connectToDatabase } from "../../../libs/database";
import { Item, Backbar, BottomNavbar, LoadingBox } from "../../../components";

export default function ItemDetail({ item }) {

  // shows a box if the user not verified yet where the box has 
  //message that the person hasn't set the address yet and a button where is 
  //going to lead him/her to update the account
  
  // the protected are uploading, item detail, update item, looking to someone profiles

  if(!item) return <LoadingBox></LoadingBox>;
  
return (
    <div>
      <Head>
        <title>{item.name}</title>
      </Head>
      <Backbar link='/'></Backbar>
      <div className="flex justify-center m-auto w-11/12 xl:w-2/5">
        <Item item={item} inItemDetail={true}></Item>
      </div>
      <BottomNavbar></BottomNavbar>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();
  const resultItem = await db
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
      {
        $match: {
          slug: params.slug,
        },
      },
    ])
    .toArray();

  return {
    props: {
      item: JSON.parse(JSON.stringify(resultItem[0])),
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { db } = await connectToDatabase();
  const resultItem = await db
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

  const paths = resultItem.map((item) => {
    return {
      params: {
        slug: item.slug,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
