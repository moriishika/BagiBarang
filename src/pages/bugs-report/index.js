import { useContext, useState } from "react";
import { LoadingBox } from "../../components";
import { Loading } from "../../state";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/client";

const BugsReport = () => {
  const {
    setLoadingStatus,
    setLoadingMessage,
    setSuccessStatus,
    isSuccess,
    isLoading,
  } = useContext(Loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [session, loading] = useSession();
  const [isReporting, setReportingStatus] = useState(false);

  const router = useRouter();

  const sendBugsReport = ({ description }) => {
    setLoadingStatus(true);
    setLoadingMessage("Mengirim Data Laporan");
    axios
      .post("/api/bugs-report", {
        description,
      })
      .then((res) => {
        setSuccessStatus(true);
        setLoadingMessage("Berhasil Melaporkan Bug");
        let delay = setTimeout(() => {
          setLoadingStatus(false);
          setLoadingMessage("Mohon Tunggu");
          setSuccessStatus(false);
          router.push('/');
          clearTimeout(delay);
        }, 1000);
      })
      .catch((err) => {
        setSuccessStatus(false);
        setLoadingMessage("Gagal Mengirim Laporan");
        let delay = setTimeout(() => {
          setLoadingStatus(false);
          setSuccessStatus(false);
          router.push('/');
          setLoadingMessage("Mohon Tunggu");
          clearTimeout(delay);
        }, 1000);
      });
  };

  return (
    <div className="w-full flex flex-col rounded-2xl justify-center items-center">
      {isLoading && <LoadingBox />}
      <div className=" h-24 w-full flex items-center justify-center shadow-md">
        <h1 className="text-5xl font-extrabold">Lapor Bugs</h1>
      </div>
      <form
        className="flex flex-col p-4 w-4/5 xl:w-1/3"
        onSubmit={handleSubmit(sendBugsReport)}
      >
        <textarea
          name="description"
          placeholder="Silahkan isi keterangan bug secara detail"
          cols={20}
          rows={6}
          {...register("description", { required: true, minLength: 50 })}
          className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md mt-3"
        ></textarea>
        <p className="text-red-500 text-center my-3">
          {errors.description?.type === "required" &&
            "Tolong isi keterangan bugs"}
          {errors.description?.type === "minLength" && "Minimal 50 karakter"}
        </p>
        <button className="w-full bg-blue-400 xl:h-12 h-11 rounded-lg text-white font-bold hover:bg-blue-600">
          Kirim Laporan
        </button>
      </form>
    </div>
  );
};

export default BugsReport;
