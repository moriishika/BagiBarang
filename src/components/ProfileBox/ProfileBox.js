import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import { LoadingBox } from "../../components";
import { Loading } from "../../state";
import router from "next/router";
import Link from "next/link";
import slugify from "slugify";
const ProfileBox = () => {
  const { setLoadingStatus, setLoadingMessage, isLoading, setSuccessStatus } =
    useContext(Loading);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm();
  const [session, loading] = useSession();
  const [userImage, setUserImage] = useState(null);
  const userImageInput = register("images");

  useEffect(() => {
    if (session) {
      setLoadingStatus(false);

      setValue("name", session.user.name);
      setValue("province", session.user.province);
      setValue("phoneNumber", session.user.phoneNumber);
      setValue("email", session.user.email);
      setValue("address", session.user.address);
    } else {
      setLoadingStatus(true);
    }

    return () => {
      URL.revokeObjectURL(userImage);
    };
  }, [session]);

  const handleImage = (e) => {
    if (
      ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
        e.target.files[0].type
      )
    ) {
      console.log(e.target.files[0]);
      setUserImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setError("invalidType", {});
    }
  };

  const onSubmit = (data) => {
    setLoadingMessage("Memperbarui profil");
    setLoadingStatus(true);
    let formData = new FormData();

    console.log(data.images[0]);

    if (!session.user.isVerified) {
      formData.append("phoneNumber", session.user.phoneNumber);
      formData.append("email", session.user.email);
      formData.append("address", session.user.address);
    }

    if (!data.images.length) {
      data.images = session.user.image;
    } else {
      for (const image in data.images) {
        formData.append("images", data.images[image]);
      }
    }

    for (const input in data) {
      formData.append(`${input}`, data[input]);
    }

    for (const value of formData.values()) {
      console.log(value);
    }

    axios
      .put("/api/user/" + session.user.id, formData)
      .then((res) => {
        setLoadingMessage("Berhasil di update");
        setSuccessStatus(true);

        let delay = setTimeout(() => {
          setLoadingStatus(false);
          setLoadingMessage("Mohon Tunggu");
          setSuccessStatus(false);
          router.push(`/${slugify(session?.user?.name)}`);
          clearTimeout(delay);
        }, 1000);
      })
      .catch((err) => {
        if (err.response.data.status === "DUPLICATE_NAME") {
          setLoadingMessage("Nama telah digunakan");

          let delay = setTimeout(() => {
            setLoadingStatus(false);
            setLoadingMessage("Mohon Tunggu");
            setSuccessStatus(false);
            clearTimeout(delay);
          }, 1000);
        }
      });
  };

  if (!session) return <LoadingBox></LoadingBox>;

  return (
    <div className="flex h-screen justify-center items-center">
      {isLoading && <LoadingBox></LoadingBox>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-11/12 xl:w-2/5"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 mt-5 mx-7">
          <div className="flex flex-col items-center justify-center w-full">
            <label className="flex flex-col border-4 border-dashed w-full h-56 hover:bg-gray-100 hover:border-green-300 group">
              <div className="flex flex-col items-center justify-center pt-7">
                {session ? (
                  <img
                    className="w-36 h-36 rounded-full"
                    src={userImage ? userImage : session.user.image}
                  />
                ) : (
                  <svg
                    className="w-12 h-12 text-green-500 group-hover:text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" />
                  </svg>
                )}

                <p className="text-sm font-medium text-gray-500 group-hover:text-green-600 pt-1 tracking-wider mt-2">
                  {session ? "Ganti Photo Profil" : "Pilih Photo Profil"}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*;capture=camera"
                {...userImageInput}
                onChange={(e) => {
                  userImageInput.onChange(e);
                  handleImage(e);
                }}
              />
            </label>
          </div>
        </div>
        <div className="p-4 w-full mt-2">
          
          {!session?.user.isVerified && (
            <p className="text-center font-bold ">Nama dan wilayah harus diisi agar bisa mengakses setiap halaman</p>
          )}

          <input
            type="text"
            {...register("name", {
              required: true,
              minLength: 5,
              maxLength: 40,
            })}
            placeholder="Nama"
            className="mt-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
          />
          {errors.name?.type === "required" && "Tolong isi nama anda"}
          {errors.name?.type === "minLength" && "Minimal 5 huruf"}
          {errors.name?.type === "maxLength" && "Maksimal 40 huruf"}

          <select
            {...register("province", {
              required: true,
            })}
            name="province"
            className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
          >
            <option hidden value="">
              Pilih Wilayah Anda
            </option>
            <option value="Aceh">Aceh</option>
            <option value="Bali">Bali</option>
            <option value="Banten">Banten</option>
            <option value="Bengkulu">Bengkulu</option>
            <option value="Di Yogyakarta">Di Yogyakarta</option>
            <option value="Dki Jakarta">Dki Jakarta</option>
            <option value="Gorontalo">Gorontalo</option>
            <option value="Jambi">Jambi</option>
            <option value="Jawa Barat">Jawa Barat</option>
            <option value="Jawa Tengah">Jawa Tengah</option>
            <option value="Jawa Timur">Jawa Timur</option>
            <option value="Kalimantan Barat">Kalimantan Barat</option>
            <option value="Kalimantan Selatan">Kalimantan Selatan</option>
            <option value="Kalimantan Tengah">Kalimantan Tengah</option>
            <option value="Kalimantan Timur">Kalimantan Timur</option>
            <option value="Kalimantan Utara">Kalimantan Utara</option>
            <option value="Kepulauan Bangka Belitung">
              Kepulauan Bangka Belitung
            </option>
            <option value="Kepulauan Riau">Kepulauan Riau</option>
            <option value="Lampung">Lampung</option>
            <option value="Maluku Utara">Maluku Utara</option>
            <option value="Maluku">Maluku</option>
            <option value="Nusa Tenggara Barat">Nusa Tenggara Barat</option>
            <option value="Nusa Tenggara Timur">Nusa Tenggara Timur</option>
            <option value="Papua Barat">Papua Barat</option>
            <option value="Papua">Papua</option>
            <option value="Riau">Riau</option>
            <option value="Sulawesi Barat">Sulawesi Barat</option>
            <option value="Sulawesi Selatan">Sulawesi Selatan</option>
            <option value="Sulawesi Tengah">Sulawesi Tengah</option>
            <option value="Sulawesi Tenggara">Sulawesi Tenggara</option>
            <option value="Sulawesi Utara">Sulawesi Utara</option>
            <option value="Sumatera Barat">Sumatera Barat</option>
            <option value="Sumatera Selatan">Sumatera Selatan</option>
            <option value="Sumatera Utara">Sumatera Utara</option>
          </select>
          {errors.province?.type === "required" && "Tolong pilih wilayah anda"}

          {session.user.isVerified && (
            <>
              <input
                type="text"
                {...register("phoneNumber", {
                  pattern: /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
                })}
                placeholder="Nomer Telepon / Whatsapp"
                className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
              />
              <p>
                {errors.phoneNumber?.type === "pattern" &&
                  "Format nomor salah, Contoh : 085-123-456-789"}
              </p>

              <input
                type="text"
                {...register("email", {
                  pattern:
                    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                })}
                placeholder="Email yang dapat dihubungi penerima"
                className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
              />
              {errors.email?.type === "pattern" &&
                "Format email salah, Contoh : emailanda@gmail.com"}

              <input
                type="text"
                {...register("address", {
                  minLength: 5,
                })}
                placeholder="Alamat yang sering digunakan"
                className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
              />
              {errors.address?.type === "minLength" && "Minimal 5 huruf"}
            </>
          )}
          <button
            type="submit"
            className="mt-8 hover:bg-transparent block border border-blue-500 w-full py-2 rounded-md mt-4 text-white hover:text-blue-500 font-semibold hover bg-blue-500 "
          >
            Simpan
          </button>

          {session.user.isVerified && (
            <Link href={"/" + slugify(session.user.name)}>
              <a className="hover:bg-transparent block border border-green-500 w-full py-2 rounded-md mt-4 text-white hover:text-green-500 font-semibold hover bg-green-500 text-center">
                Kembali
              </a>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileBox;
