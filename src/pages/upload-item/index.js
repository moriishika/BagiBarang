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
    <div>
      {isLoading ? <LoadingBox></LoadingBox> : null}
      <Backbar />
      <ItemForm userId={session ? session.user.id : null} />
      <BottomNavbar />
    </div>
  );
};

export default UploadItem;
