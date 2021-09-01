import { useSession } from "next-auth/client";
import router from "next/router";
import { useEffect } from "react";

const CheckVerifiedStatus = ({ children }) => {
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) {
      if (!session.user.isVerified) {
        router.push("/accounts/edit");
      }
    }
  }, [session, loading]);

  return children;
};

export default CheckVerifiedStatus;
