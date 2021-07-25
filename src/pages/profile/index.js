import { getSession, signOut } from "next-auth/client";
import { Items, BottomNavbar, LoadingBox } from "../../components";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { connectToDatabase } from "../../libs/database";

const Profile = ({items}) => {
  const [session, loading] = useSession();
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   if (session) {
  //     axios
  //       .get(`/api/items/user/${session.user.id}`)
  //       .then((res) => {
  //         console.log(res.data);
  //         setItems(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [session]);

  return (
    <>
      {!session ? <LoadingBox></LoadingBox> : null}
      <div className={items.length ? '' : 'xl:fixed w-full h-full flex flex-col justify-between'}>
        <div className="flex justify-center items-center w-full p-4 bg-white sticky top-0 z-50">
          {session ? (
            <img
              className="w-20 h-20 rounded-full shadow-lg"
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
          <div className="w-1/3 ml-5">
            <h1 className="font-semibold">
              {loading ? "nanti kasi component skleton" : session.user.name}
            </h1>
            <div className="flex">
              <button className="mt-1 text-md bg-transparent block border border-green-500 w-3/4 rounded-md hover:text-white text-green-500 font-medium hover:bg-green-500 ">
                Perbarui Profil
              </button>
              <button
                className="mt-1 ml-1 text-md bg-transparent block border border-red-500 w-1/5 rounded-md hover:text-white text-red-500 font-medium hover:bg-red-500"
                onClick={signOut}
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
        {items.length ? (
          <Items items={items} />
        ) : (
          <div className="flex flex-col justify-center items-center my-auto">
            <img src="/assets/icons/inventory.svg" className="h-72"></img>
            <p className="font-bold">Ada yang ga ke pake? Bagi aja!</p>
          </div>
        )}
          <BottomNavbar />
      </div>
    </>
  );
};

export async function getServerSideProps({req, res}) {
  const session = await getSession({req});
  console.log(session);
  const db = await connectToDatabase();
  try {
    const items = await db
      .collection("items").find(session.user.id)
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

export default Profile;
