import { signOut } from "next-auth/client";
import { Items, BottomNavbar, LoadingBox } from "../../components";
import { useSession } from "next-auth/client";
import Head from "next/head";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";

const Profile = () => {
  const [session, loading] = useSession();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR("/api/items/useritems/", fetcher);

  if (error) return <div>ada error</div>;

  if (loading || !data) return <LoadingBox></LoadingBox>;

  return (
    <div className="h-full">
      <Head>
        <title>{session ? "Bagi Barang" : session.user.name}</title>
      </Head>
      <div
        className={
          data.length
            ? ""
            : "w-full h-full flex flex-col justify-between"
        }
      >
        <div className="flex p-4 items-center justify-center bg-white sticky top-0 z-50">
          {session ? (
            <img
              className="w-20 h-20 rounded-full shadow-lg mr-2"
              src={session.user.image}
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
            <h1 className="font-semibold">{session.user.name}</h1>
            <div className="flex">
              <Link href="/accounts/edit/">
                <a className="mt-1 xl:text-md bg-transparent block border text-sm px-2 py-1  text-center border-green-500 xl:w-3/4 rounded-md hover:text-white text-green-500 font-medium hover:bg-green-500 ">
                  Perbarui Profil
                </a>
              </Link>
              <button
                className="mt-1 ml-2 xl:text-md bg-transparent block border border-red-500 xl:w-1/5 text-sm  p-1 rounded-md hover:text-white text-red-500 font-medium hover:bg-red-500"
                onClick={signOut}
              >
                Keluar
              </button>
            </div>
          </div>
        </div>

        {data.length ? (
          <Items items={data} inProfile={true} uploaderId={session.user.id} />
        ) : (
          <div className="flex flex-col justify-center h-screen items-center my-auto">
            <img src="/assets/icons/inventory.svg" className="h-72"></img>
            <p className="font-bold">Ada yang ga ke pake? Bagi aja!</p>
          </div>
        )}
        <BottomNavbar />
      </div>
    </div>
  );
};

export default Profile;
