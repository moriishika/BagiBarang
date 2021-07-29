import Head from "next/head";
import { connectToDatabase } from "../../libs/database";
import { Item, Backbar, BottomNavbar } from "../../components";

export default function ItemDetail({ item }) {
  return (
    <div>
      <Head>
        <title>{item.name}</title>
      </Head>
      <Backbar link="/"></Backbar>
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
