import { signOut } from "next-auth/client";
import { Items, BottomNavbar, LoadingBox } from "../../components";
import { useSession } from "next-auth/client";
import Head from "next/head";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { connectToDatabase } from "../../libs/database";
import router from "next/router";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Profile = ({ user }) => {
  const [skip, setSkip] = useState(0);
  const [session, loading] = useSession();
  const [isSearching, setSearchingStatus] = useState(false);
  const [isGoingToLogout, setLogoutStatus] = useState(false);

  const { data, error, mutate } = useSWR(
    `/api/items/user/${user?._id}?skip=0`,
    fetcher,
    { revalidateOnFocus: false }
  );

  const loadMoreRef = useRef(null);

  const observerCallback = (entries) => {
    try {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (
          data.itemsTotal !== data.result.length &&
          skip < data.result.length
        ) {
          setSearchingStatus(true);

          mutate(async (items) => {
            const newData = await axios
              .get(`/api/items/user/${user?._id}?skip=${skip + 2}`)
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
  }, [data, user, loading]);

  useEffect(() => {
    if(!session) router.push('/login')
  }, [session])

  if (error) router.push("/404");
  
  if (loading || !data || !user) return <LoadingBox></LoadingBox>;
  
  
  if (!loading && !session) return <div></div>;


  return (
    <div className="h-full">
      <Head>
        <title>{user ? "Bagi Barang" : user.name}</title>
      </Head>
      {isGoingToLogout && (
        <div className="top-0 fixed z-40 w-11/12 w-full h-full left-0 bg-black bg-opacity-20 flex justify-center items-center">
          <div
            className="w-full h-full z-30"
            onClick={() => setLogoutStatus(false)}
          ></div>
          <div className="w-64 h-60 bg-white z-40 m-auto absolute flex flex-col justify-center items-center rounded-lg">
            <h1 className="text-lg font-bold">Yakin Ingin Keluar?</h1>
            <div className="w-full flex justify-center mt-5 text-white">
              <button
                onClick={() => setLogoutStatus(false)}
                className="drop-shadow-blue-md filter font-semibold bg-blue-400 mr-4 w-24 p-2 rounded-md hover:bg-blue-300 duration-150 text-center"
              >
                Tidak
              </button>
              <button
                onClick={signOut}
                className="drop-shadow-red-md filter font-semibold bg-red-500 w-24 p-2 rounded-md hover:bg-red-700 duration-150 text-center"
              >
                Iya
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={
          data.length ? "" : "w-full h-full flex flex-col justify-between"
        }
      >
        <div className="flex p-4 items-center justify-center bg-white sticky top-0 z-50">
          {user ? (
            <img
              className="w-20 h-20 rounded-full shadow-lg mr-2"
              src={user.image}
            />
          ) : (
            <svg
              className="w-12 h-12 text-green-500 group-hover:text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" />
            </svg>
          )}

          <div className="xl:w-1/3 ml-5 w-48">
            <h1 className="font-semibold">{user.name}</h1>
            {user._id === session.user.id && (
              <div className="flex">
                <Link href="/accounts/edit/">
                  <a className="mt-1 xl:text-md bg-transparent block border text-sm px-2 py-1  text-center border-green-500 xl:w-3/4 rounded-md hover:text-white text-green-500 font-medium hover:bg-green-500 ">
                    Perbarui Profil
                  </a>
                </Link>
                <button
                  className="mt-1 ml-2 xl:text-md bg-transparent block border border-red-500 xl:w-1/5 text-sm  p-1 rounded-md hover:text-white text-red-500 font-medium hover:bg-red-500"
                  onClick={() => setLogoutStatus(true)}
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>

        {data.result.length ? (
          <>
            <Items items={data.result} inProfile={true} uploaderId={user._id} />
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
          </>
        ) : (
          <div className="flex flex-col justify-center h-screen items-center my-auto">
            <img src="/assets/icons/inventory.svg" className="h-72"></img>
            <p className="font-bold">{`${
              user._id !== session.user.id
                ? "Pengguna ini belum bagi barang"
                : "Ada yang ga ke pake? Bagi aja!"
            }`}</p>
          </div>
        )}
        <BottomNavbar />
      </div>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { userid } = params;
  const { db } = await connectToDatabase();
  const user = await db.collection("users").findOne({ slug: userid });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  const { db } = await connectToDatabase();
  const users = await db.collection("users").find().toArray();

  const paths = users.map((user) => {
    return {
      params: {
        userid: user.slug,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export default Profile;
