import { ProfileBox } from "../../components";
import { useSession } from "next-auth/client";
import router from "next/router";
import { useEffect } from "react";

const EditProfile = () => {
  const [session, loading] = useSession();
  
  useEffect(() => {
    if (!session) router.back();
  }, [session]);

  if (!session && !loading) return <div></div>;

  return <ProfileBox></ProfileBox>;
};

export default EditProfile;
