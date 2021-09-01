import React, { useEffect } from "react";
import { signIn } from "next-auth/client";
import { Backbar } from "../../components";
import { useSession } from "next-auth/client";
import router from "next/router";

const Login = () => {
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) router.back();
  }, [session]);

  if (session && !loading) return <div></div>;

  return (
    <div>
      <Backbar link="/"></Backbar>
      <div className="w-11/12 xl:w-2/5 p-4 flex flex-col justify-center justify-items-center mx-auto">
        <h1 className="text-center my-4 font-semibold text-lg">
          Mau Barang? <br></br>Login Dulu Dong Gak lama kok
        </h1>
        <div className="flex flex-col mt-6">
          <button
            onClick={() => {
              signIn("google");
            }}
            className="text-center my-1 bg-red-500 text-white p-2 font-medium rounded-md hover:bg-red-600"
          >
            Masuk dengan Google
          </button>
          <button
            onClick={() => {
              signIn("facebook");
            }}
            className="text-center my-1 bg-blue-500 text-white p-2 font-medium rounded-md hover:bg-blue-600"
          >
            Masuk dengan Facebook
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
