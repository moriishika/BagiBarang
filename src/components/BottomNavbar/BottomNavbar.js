import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import router from "next/router";

const BottomNavbar = (props) => {
  const [session, setSession] = useState(null);

  const getUser = async () => {
    setSession(await getSession());
  };

  useEffect(() => {
    if (!session) {
      getUser();
    }
  }, []);

  return (
    <div
      className={
        "w-full flex justify-center bg-white bottom-0 py-3 sticky z-50"
      }
    >
      <Link href="/" scroll={false}>
        <div className="flex flex-col items-center cursor-pointer">
          <a>
            <img src="/assets/icons/home.svg" className="w-10 h-10" />
          </a>
          <p className="font-semibold">Beranda</p>
        </div>
      </Link>
      {/* <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img src="/assets/icons/home.svg" className="w-10 h-10" />
        <p className="font-semibold">Beranda</p>
      </div> */}

      <Link href={session ? "/upload-item" : "/login"} scroll={false}>
        <div className="flex flex-col  items-center mx-8 cursor-pointer">
          <a>
            <img src="/assets/icons/handpackage.svg" className="w-10 h-10" />
          </a>
          <p className="font-semibold">Bagi Barangmu</p>
        </div>
      </Link>

      {/* <div className="flex flex-col  items-center mx-8 cursor-pointer" onClick={() => router.push(session ? "/upload-item" : "/login")}>
          <img src="/assets/icons/handpackage.svg" className="w-10 h-10" />
        <p className="font-semibold">Bagi Barangmu</p>
      </div> */}

      <Link href={session ? "/" + session.user.slug : "/login"} scroll={false}>
        <div className="flex flex-col  items-center cursor-pointer">
          <a>
            <img
              src={session ? session.user.image : "/assets/icons/circleacc.svg"}
              className="w-10 h-10 rounded-full"
            />
          </a>
          <p className="font-semibold">Profil</p>
        </div>
      </Link>
    </div>
  );
};

export default BottomNavbar;
