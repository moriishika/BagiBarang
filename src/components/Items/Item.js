import React, { useState } from "react";
import Link from "next/link";
import ReportBox from "../ReportBox";
import MediaSlider from "../MediaSlider";
import ShareButton from "../ShareButton";
import axios from "axios";
import { mutate } from "swr";
import { useSession } from "next-auth/client";
import router from "next/router";

let windowOffset = 0;
const Item = (props) => {
  const [session, loading] = useSession();

  const [isOpened, setOpenedStatus] = useState(false);
  const [isDeleteModalOpened, setDeleteModalOpened] = useState(false);

  const openReport = async () => {
    if(!session) return router.push('/login');

    console.log(props.inItemDetail);
    windowOffset = window.scrollY;
    await setOpenedStatus(true);
  };

  const closeReport = async () => {
    await setOpenedStatus(false);
  };

  const deleteItem = async (id) => {
    mutate(`/api/items/user/${session?.user?.id}?skip=0`, async (items) => {
      await axios.delete(`/api/items/${id}`).catch((err) => console.log(err));
      const result = items.result.filter((item) => item._id !== id);
      return { result: [...result], itemsTotal: items.itemsTotal };
    });
  };

  return (
    <div className="w-full xl:w-full md:w-4/5 my-5 p-0">
      {isDeleteModalOpened && (
        <div className="top-0 fixed z-40 w-11/12 w-full h-full left-0 bg-black bg-opacity-20 flex justify-center items-center">
          <div
            className="w-full h-full z-30"
            onClick={() => setDeleteModalOpened(false)}
          ></div>
          <div className="w-64 h-60 bg-white z-40 m-auto absolute flex flex-col justify-center items-center rounded-lg">
            <h1 className="text-lg font-bold">Hapus barang?</h1>
            <div className="w-full flex justify-center mt-5 text-white">
              <button
                onClick={() => setDeleteModalOpened(false)}
                className="drop-shadow-blue-md filter font-semibold bg-blue-400 mr-4 w-24 p-2 rounded-md hover:bg-blue-300 duration-150 text-center"
              >
                Tidak
              </button>
              <button
                onClick={() => {
                  deleteItem(props.item._id);
                }}
                className="drop-shadow-red-md filter font-semibold bg-red-500 w-24 p-2 rounded-md hover:bg-red-700 duration-150 text-center"
              >
                Iya
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pb-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href={`/${props.item.uploader[0].slug}`}>
            <a>
              <img
                src={props.item.uploader[0].image}
                alt={props.item.uploader[0].name}
                className="w-12 rounded-full"
              />
            </a>
          </Link>
          <Link href={!session ? '/login' : `/${props.item.uploader[0].slug}`}>
            <a className="ml-3 font-medium hover:text-blue-600">
              {props.item.uploader[0].name}
            </a>
          </Link>
        </div>
        {props.item.user_id !== session?.user?.id && (
          <button
            className="bg-white  py-1 px-3 rounded-xl shadow-lg font-medium"
            onClick={openReport}
          >
            Laporkan
          </button>
        )}
      </div>
      <div className="flex-col justify-center">
        <MediaSlider images={props.item.images} itemName={props.item.name}></MediaSlider>
      </div>
      <div>
        <h1 className="text-2xl mt-8 font-semibold">{props.item.name}</h1>
        {props.inItemDetail && (
          <div>
            <hr className="border-gray-300 mt-2" />
            <pre className="text-lg my-5">{props.item.description}</pre>
            <hr className="border-gray-300" />
            <div className="font-medium">
              <h2 className="mt-2 mb-3">Hubungi Pemberi :</h2>
              <div className="flex items-center ">
                <svg
                  width={24}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="whatsapp-square"
                  className="svg-inline--fa fa-whatsapp-square fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#44C554"
                    d="M224 122.8c-72.7 0-131.8 59.1-131.9 131.8 0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6 49.9-13.1 4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8 0-35.2-15.2-68.3-40.1-93.2-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8-12.6 1.9-22.4.9-47.5-9.9-39.7-17.2-65.7-57.2-67.7-59.8-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5 2.6 0 5.3 0 7.6.1 2.4.1 5.7-.9 8.9 6.8 3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6 15.3 26.3 30.6 35.4 53.9 47.1 4 2 6.3 1.7 8.6-1 2.3-2.6 9.9-11.6 12.5-15.5 2.6-4 5.3-3.3 8.9-2 3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5 29.9 30 47.9 69.8 47.9 112.2 0 87.4-72.7 158.5-160.1 158.5z"
                  ></path>
                </svg>
                <p className="ml-3 ">{props.item.phoneNumber}</p>
              </div>
              <div className="flex items-center mt-3">
                <svg
                  aria-hidden="true"
                  width={24}
                  focusable="false"
                  data-prefix="fas"
                  data-icon="envelope"
                  className="svg-inline--fa fa-envelope fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#DB3434"
                    d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                  ></path>
                </svg>
                <p className="ml-3">{props.item.email}</p>
              </div>
              <div className="flex items-center mt-3">
                <svg
                  aria-hidden="true"
                  width={24}
                  focusable="false"
                  data-prefix="fas"
                  data-icon="map-marked-alt"
                  className="svg-inline--fa fa-map-marked-alt fa-w-18"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="#4D74CE"
                    d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z"
                  ></path>
                </svg>
                <p className="ml-3">{props.item.address}</p>
              </div>
            </div>
            <div className="w-full p-3 mt-8 bg-red-400 rounded-md">
              <p className="text-white text-lg text-justify">
                Perhatian : Jangan lupa bawa alat keamanan untuk berjaga - jaga,
                pastikan keamanan anda pada saat bertemu pemberi / penerima
              </p>
            </div>
          </div>
        )}
      </div>

      {!props.inItemDetail && (
        <div className="flex w-full justify-between text-white text-3xl mt-4">
          {(!props.inProfile || props.item.user_id !== session?.user?.id) && (
            <>
              <ShareButton
                title={props.item.name}
                url={`https://bagibarang.com/items/detail/${props.item.slug}`}
              ></ShareButton>
              <Link href={!session ? '/login' : `/items/detail/${props.item.slug}`}>
                <a className="bg-green-500 w-4/5 p-2 rounded-md hover:bg-green-700 duration-150 text-center">
                  Detail
                </a>
              </Link>
            </>
          )}

          {props.inProfile && props.item.user_id === session?.user?.id && (
            <>
              <button
                onClick={() => setDeleteModalOpened(true)}
                className="drop-shadow-red-md filter bg-red-500 xl:text-lg w-1/5 p-2 text-sm font-semibold rounded-md hover:bg-red-700 duration-150 text-center"
              >
                Hapus
              </button>
              <Link href={`/items/update/${props.item.slug}`}>
                <a className="drop-shadow-blue-md filter xl:text-lg bg-blue-500 w-2/5 p-2 mx-4 t font-semibold text-base rounded-md hover:bg-blue-700 duration-150 text-center">
                  Perbarui
                </a>
              </Link>
              <Link href={`/items/detail/${props.item.slug}`}>
                <a className="drop-shadow-green-md filter xl:text-lg bg-green-500 w-2/5 p-2 text-base rounded-md font-semibold hover:bg-green-700 duration-150 text-center">
                  Detail
                </a>
              </Link>
            </>
          )}
        </div>
      )}

      {isOpened ? (
        <ReportBox
          openReport={openReport}
          closeReport={closeReport}
          itemid={props.item._id}
        ></ReportBox>
      ) : (
        ""
      )}
    </div>
  );
};

export default Item;
