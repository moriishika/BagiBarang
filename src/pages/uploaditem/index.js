import { Backbar, BottomNavbar, ItemForm, LoadingBox } from "../../components";
import { useEffect, useContext } from "react";
import { useSession } from "next-auth/client";
import { Loading } from "../../state";
const UploadItem = () => {
  const [session, loading] = useSession();
  const { isLoading, setLoadingStatus } = useContext(Loading);

  useEffect(() => {
    loading ? setLoadingStatus(true) : setLoadingStatus(false);
  }, [loading]);

  return (
    <div className="h-screen xl:fixed w-full">
      {isLoading ? <LoadingBox></LoadingBox> : null}
      <Backbar link="/" />
      <ItemForm userId={session ? session.user._id : null} />
      <BottomNavbar />
    </div>
  );
};

export default UploadItem;
