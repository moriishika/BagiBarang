import { useContext } from "react";
import { Loading } from "../../state";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { LoadingBox } from "..";
const Footer = () => {
  const {
    setLoadingStatus,
    setLoadingMessage,
    setSuccessStatus,
    isSuccess,
    isLoading,
    loadingMessage
  } = useContext(Loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const router = useRouter();

  const sendSuggestions = ({ description }, e) => {
    e.preventDefault()
    setLoadingStatus(true);
    setLoadingMessage("Mengirim Saran");
    axios
      .post("/api/suggestions", {
        description,
      })
      .then((res) => {
        setSuccessStatus(true);
        setLoadingMessage("Berhasil Mengirim Saran");
        reset()
        let delay = setTimeout(() => {
          setLoadingStatus(false);
          setLoadingMessage("Mohon Tunggu");
          setSuccessStatus(false);
          clearTimeout(delay);
        }, 1000);
      })
      .catch((err) => {
        setSuccessStatus(false);
        setLoadingMessage("Anda Telah Mengirim Saran");
        reset()
        let delay = setTimeout(() => {
          setLoadingStatus(false);
          setSuccessStatus(false);
          setLoadingMessage("Mohon Tunggu");
          clearTimeout(delay);
        }, 1000);
      });
  };

  return (
    <footer className="flex flex-col sm:flex-row sm:justify-around sm:items-center bg-white p-5 mt-7">
      <section className="flex justify-center items-center my-5 flex-col">
        <img src="/icon-192x192.png" className="w-20 mb-4"></img>
        <h1 className="text-2xl font-bold">Bagi Barang</h1>
      </section>
      <section className="flex justify-center my-5">
        <div className="flex items-center">
          <Link href="https://web.facebook.com/Bagi-Barang-105242838640701">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={45}
                viewBox="0 0 50 50"
              >
                <path
                  fill="#0D8CF0"
                  d="M9 4C6.25 4 4 6.25 4 9v32c0 2.75 2.25 5 5 5h16.832c.11.02.219.02.328 0h5.672c.11.02.219.02.328 0H41c2.75 0 5-2.25 5-5V9c0-2.75-2.25-5-5-5zm0 2h32c1.668 0 3 1.332 3 3v32c0 1.668-1.332 3-3 3h-8V30h3.82l1.403-7H33v-2c0-.559.055-.602.238-.723.188-.12.766-.277 1.762-.277h3v-5.629l-.57-.273S35.133 13 32 13c-2.25 0-4.098.895-5.281 2.375C25.535 16.855 25 18.832 25 21v2h-3v7h3v14H9c-1.668 0-3-1.332-3-3V9c0-1.668 1.332-3 3-3zm23 9c2.078 0 3.387.457 4 .7V18h-1c-1.152 0-2.074.094-2.848.598C31.375 19.105 31 20.063 31 21v4h4.777l-.597 3H31v16h-4V28h-3v-3h3v-4c0-1.832.465-3.355 1.281-4.375C29.098 15.605 30.25 15 32 15zm0 0"
                ></path>
              </svg>
            </a>
          </Link>
        </div>

        <div className="flex items-center">
          <Link href="https://www.instagram.com/bagibarang/">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={50}
                viewBox="0 0 96 96"
              >
                <path
                  fill="#F50155"
                  d="M32 12c-11.027 0-20 8.973-20 20v32c0 11.027 8.973 20 20 20h32c11.027 0 20-8.973 20-20V32c0-11.027-8.973-20-20-20zm0 8h32c6.617 0 12 5.383 12 12v32c0 6.617-5.383 12-12 12H32c-6.617 0-12-5.383-12-12V32c0-6.617 5.383-12 12-12zm36 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-20 4c-11.027 0-20 8.973-20 20s8.973 20 20 20 20-8.973 20-20-8.973-20-20-20zm0 8c6.617 0 12 5.383 12 12s-5.383 12-12 12-12-5.383-12-12 5.383-12 12-12zm0 0"
                ></path>
              </svg>
            </a>
          </Link>
        </div>
      </section>
      <section className="flex justify-center items-center my-5">
        <button
          onClick={() => router.push("/bugs-report")}
          className=" text-white drop-shadow-red-md filter bg-red-500 xl:text-lg  p-3 text-sm font-semibold rounded-md hover:bg-red-700 duration-150 text-center"
        >
          Lapor Bug Disini
        </button>
      </section>
      <section className=" m-2 sm:mb-3">
        <form className="flex flex-col items-end" onSubmit={handleSubmit(sendSuggestions)}>
          <textarea
            cols={40}
            rows={6}
            placeholder="Saran untuk kami"
            {...register("description", { required: true, minLength: 30 })}
            className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
          ></textarea>
          {isLoading && <p className="text-blue-500 font-bold text-center mb-3">{loadingMessage}</p>}
           <p className="text-red-500 text-center mb-3">
            {errors.description?.type === "required" &&
              "Tolong isi sarannya ya"}
            {errors.description?.type === "minLength" && "Minimal 50 karakter"}
          </p>
          <button className="bg-blue-500 w-32 xl:h-12 h-11 rounded-lg text-white font-bold hover:bg-blue-600">
            Kirim
          </button>
         
        </form>
      </section>
    </footer>
  );
};

export default Footer;
