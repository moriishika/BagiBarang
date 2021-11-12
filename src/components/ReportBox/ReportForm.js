import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/client";
import { Loading } from "../../state";

const ReportForm = (props) => {
  const { register, handleSubmit } = useForm();
  const [session, loading] = useSession();
  const [isReporting, setReportingStatus] = useState(false);
  const {
    setLoadingStatus,
    setLoadingMessage,
    setSuccessStatus,
    loadingMessage,
    isLoading,
    isSuccess,
  } = useContext(Loading);

  const onSubmit = (input) => {
    setLoadingStatus(true);
    setReportingStatus(true)
    setLoadingMessage("Mengirim Data Laporan");
    console.table([props.reportType, props.reportCategory, input.reportDetail, session?.user?.id])
    axios
      .put(`/api/items/report/${props.itemid}`, {
        type: props.reportType,
        category: props.reportCategory,
        detail: input.reportDetail,
        userid: session?.user?.id,
      })
      .then((res) => {
        setSuccessStatus(true);
        setLoadingMessage("Berhasil Melaporkan Barang");  
        setReportingStatus(false)
        let delay = setTimeout(() => {
          setLoadingStatus(false);
          setLoadingMessage("Mohon Tunggu");
          setSuccessStatus(false);
          props.closeReport();
          clearTimeout(delay);
        }, 1000);
      })
      .catch((err) => {
        console.log('masuk error')
        setSuccessStatus(false);
        setReportingStatus(false)
        setLoadingMessage(err.response.data.message);
        console.log(isSuccess);
        let delay = setTimeout(() => {
          setLoadingStatus(false)
          setSuccessStatus(false);
          setLoadingMessage("Mohon Tunggu");
          props.closeReport();
          clearTimeout(delay);
        }, 1000);
      });
  };

  if(isLoading) return (
  <div className={`w-full h-40 my-8 rounded-lg  ${(isLoading && isReporting) && 'bg-blue-300'} ${(!isReporting && isSuccess ) &&  'bg-green-300'} ${(!isReporting && !isSuccess ) &&'bg-red-300'} flex justify-center items-center`}>
    <p className="text-white text-base font-bold text-center">{loadingMessage}</p>
  </div>)
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full p-3"
    >
      <textarea
        {...register("reportDetail", { maxLength: 250 })}
        cols={20}
        rows={6}
        className="mt-4 focus:ring-blue-500 focus:border-blue-500 block  w-full shadow-sm sm:text-sm border-black rounded-md my-3"
      ></textarea>
      <button className="w-full bg-red-500 h-8 rounded-lg text-white font-bold hover:bg-red-600 drop-shadow-red-md filter">
        Laporkan
      </button>
    </form>
  );
};

export default ReportForm;
