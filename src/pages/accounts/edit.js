import { ProfileBox } from "../../components";
import { useSession } from "next-auth/client";
import router from "next/router";
import { useEffect } from "react";

const EditProfile = () => {
  const [session, loading] = useSession();
  
  useEffect(() => {
    if (!session) router.push('/login');
  }, [session]);

  if (!session && !loading) return <div></div>;

  return <ProfileBox></ProfileBox>;
};

export default EditProfile;
