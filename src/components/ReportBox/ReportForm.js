import { useForm, useState} from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/client";

const ReportForm = (props) => {
  const { register, handleSubmit } = useForm();
  const [session, loading] = useSession();
  const [isReportSuccess, setReportStatus] = useState(false); 

  const onSubmit = (input) => {
    axios
      .put(`/api/items/report/${props.itemid}`, {
        type: props.reportType,
        category: props.reportCategory,
        detail: input.reportDetail,
        userid : session.user.id
      })
      .then((res) => {
        
      })
      .catch((res) => {});
  };

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
