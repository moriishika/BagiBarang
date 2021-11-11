import Head from "next/head";
import { connectToDatabase } from "../../../libs/database";
import {
  Item,
  Backbar,
  BottomNavbar,
  LoadingBox,
  ShareButton,
} from "../../../components";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

export default function ItemDetail({ item }) {
  const [session, loading] = useSession();
  const router = useRouter();

  if (!item && !loading && !session) return <LoadingBox></LoadingBox>;

  if (!loading && !session) router.push("/login");

  if (router.isFallback) {
    return <LoadingBox></LoadingBox>;
  }

  return (
    <div>
      <Head>
        <title>{item.name}</title>
        <meta name="title" content={`${item.name} GRATIS`}></meta>
        <meta name="description" content="Bagi Barang Bagi Kebaikan"></meta>

        <meta property="og:type" content="website"></meta>
        <meta
          property="og:url"
          content="https://bagibarang.com/items/detail/Helm-bogo-masih-mulus-1636272209273"
        ></meta>
        <meta property="og:title" content={`${item.name} GRATIS`}></meta>
        <meta
          property="og:description"
          content="Bagi Barang Bagi Kebaikan"
        ></meta>
        <meta
          property="og:image"
          content="https://bagibarang.com/apple-touch-icon.png"
        ></meta>

        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta
          property="twitter:url"
          content="https://bagibarang.com/items/detail/Helm-bogo-masih-mulus-1636272209273"
        ></meta>
        <meta property="twitter:title" content={`${item.name} GRATIS`}></meta>
        <meta
          property="twitter:description"
          content="Bagi Barang Bagi Kebaikan"
        ></meta>
        <meta
          property="twitter:image"
          content="https://bagibarang.com/apple-touch-icon.png"
        ></meta>
      </Head>

      {session && (
        <>
          <Backbar></Backbar>

          <div className="flex justify-center m-auto w-11/12 xl:w-2/5">
            <Item item={item} inItemDetail={true}></Item>
            
          </div>

          <BottomNavbar></BottomNavbar>
        </>
      )}
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
        slug: String(item.slug),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
