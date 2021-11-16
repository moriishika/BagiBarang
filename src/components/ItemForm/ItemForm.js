import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loading, SearchStates } from "../../state";
import { useSession } from "next-auth/client";
import router from "next/router";
import resizeImage from "../../libs/compressBeforeUpload";

const ItemForm = ({ userId }) => {
  const { setLoadingStatus, setLoadingMessage, setSuccessStatus } =
    useContext(Loading);

  const {setSearchKeyword, setSearchProvince} = useContext(SearchStates);

  const [session, loading] = useSession();
  const [previousImage, setPreviousImages] = useState([]);
  const [previewImage, setPreviewImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  const uploadItem = async (data) => {
    if (!selectedImages[0] || selectedImages.length > 5) {
      setLoadingStatus(false);
      setLoadingMessage("Mohon Tunggu");
      setSuccessStatus(false);
      setSelectedImages([]);
      setError("images", {
        type: "manual",
        message: "Tolong pilih gambar min 1 dan maks 5 gambar",
      });
      return;
    }

    if (
      !data.instagram &&
      !data.phoneNumber &&
      !data.facebook &&
      !data.twitter &&
      !data.email
    ) {
      setError("instagram", {
        type: "emptyValue",
        message:
          "Tolong cantumkan No. Telp atau Akun media sosial yang dapat dihubungi",
      });
      return;
    }

    let formData = new FormData();

    for (const input in data) {
      formData.append(input, data[input]);
    }

    for (const image in selectedImages) {
      if (
        [
          "image/jpg",
          "image/png",
          "image/gif",
          "image/jpeg",
          "image/webp",
        ].includes(selectedImages[image].type)
      ) {
        formData.append("images", selectedImages[image]);
      } else {
        setError("images", {
          type: "wrongFormat",
          message: "Hanya format jpg, jpeg, gif, dan webp",
        });
        return;
      }
    }

    setLoadingStatus(true);
    setLoadingMessage("Mengupload Gambar");

    formData.append("user_id", userId);

    axios
      .post("/api/items", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSuccessStatus(true);
        setLoadingMessage("Berhasil di Tambah");
        let delay = setTimeout(() => {
          setLoadingStatus(false);
          setLoadingMessage("Mohon Tunggu");
          setSuccessStatus(null);
          router.push("/");
          previewImage.forEach((image) => {
            URL.revokeObjectURL(image);
          });
          reset();
          clearTimeout(delay);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoadingStatus(false);
        setLoadingMessage("Mohon Tunggu");
        setSuccessStatus(false);
      });
  };

  const imagesInput = register("images");

  const changePreviewImage = (image, i) => {
    let selectedImage = [...selectedImages];
    const images = [...previewImage];

    URL.revokeObjectURL(images[i]);

    selectedImage[i] = image;
    setSelectedImages([...selectedImage]);

    images[i] = URL.createObjectURL(image);
    setPreviewImages(images);
  };

  const removeImage = (i, imagename) => {
    const images = [...previewImage];
    const selectedImage = [...selectedImages];
    const imageStatus = [...deletedImages];
    const previousImages = [...previousImage];

    if (images.length === 1) return;

    URL.revokeObjectURL(images[i]);

    images.splice(i, 1);
    selectedImage.splice(i, 1);

    if (imageStatus.indexOf(imagename) !== -1) {
      imageStatus[imageStatus.indexOf(imagename)] = "deleted";
      previousImages.splice(i, 1);
    }

    setSelectedImages([...selectedImage]);
    setPreviewImages([...images]);
    setPreviousImages([...previousImages]);
    setDeletedImages([...imageStatus]);
  };

  const resetImages = () => {
    previewImage.forEach((image) => {
      URL.revokeObjectURL(image);
    });

    setPreviewImages([]);
    setSelectedImages([]);
    setPreviousImages([]);
    setDeletedImages([]);
  };

  const addPreviewImage = async (images) => {
    let selectedImages = [];

    for (let i = 0; i < images.length; i++) {
      selectedImages.push(await images[i]);
    }

    setSelectedImages((prevImage) => [...prevImage, ...selectedImages]);
    let blobImages = [];

    for (let i = 0; i < images.length; i++) {
      blobImages[i] = await URL.createObjectURL(await images[i]);
    }

    setPreviewImages((prevImage) => [...prevImage, ...blobImages]);
    setValue("images", null);
  };

  const settings = {
    adaptiveHeight: true,
    infinite : true,
    vertical: true,
      verticalSwiping: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 790,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  useEffect(() => {
    if (!session) router.back();
    return () => {
      previewImage.forEach((image) => {
        URL.revokeObjectURL(image);
      });
    };
  }, [session]);

  if (!session && !loading) return <div className="min-h-screen"></div>;

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(uploadItem)}
        className="flex flex-col p-4 md:w-4/5 xl:w-2/6 my-6 min-h-screen"
        encType="multipart/form-data"
        autoComplete="off"
      >
        <div className="w-full ">
            {previewImage.map((image, index) => {
              return (
                <div className="relative rounded-lg my-2 bg-gray-400" key={index}>
                  <img src={image} className="rounded-lg mx-auto"></img>
                  <div
                    onClick={(e) => {
                      removeImage(index, previousImage[index]);
                    }}
                    className="w-24 p-1 bg-red-500 absolute text-white bottom-3 left-3 text-center font-bold rounded-md cursor-pointer"
                  >
                    Hapus
                  </div>
                  <label className="w-24 p-1 bg-green-500 absolute text-white bottom-3 right-3 text-center font-bold rounded-md cursor-pointer">
                    Ubah
                    <input
                      hidden
                      type="file"
                      name={`image-${index}`}
                      accept="image/*"
                      onChange={(e) => {
                        e.preventDefault();
                        changePreviewImage(e.target.files[0], index);
                      }}
                    ></input>
                  </label>
                </div>
              );
            })}
        </div>
        <div className="grid grid-cols-1 my-5 mx-7">
          <div className="flex flex-col items-center justify-center w-full">
            {!previewImage.length && (
              <label className="flex flex-col border-4 border-dashed w-full h-44 hover:bg-gray-100 hover:border-blue-300 hover:fill-current hover:text-blue-600 group">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12"
                    enableBackground="new 0 0 24 24"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <rect fill="none" height="24" width="24" />
                    </g>
                    <g>
                      <g>
                        <path d="M20,2H4C3,2,2,2.9,2,4v3.01C2,7.73,2.43,8.35,3,8.7V20c0,1.1,1.1,2,2,2h14c0.9,0,2-0.9,2-2V8.7c0.57-0.35,1-0.97,1-1.69V4 C22,2.9,21,2,20,2z M19,20H5V9h14V20z M20,7H4V4h16V7z" />
                        <rect height="2" width="6" x="9" y="12" />
                      </g>
                    </g>
                  </svg>
                  <p className="text-sm font-medium text-gray-600 group-hover:text-green-600 pt-1 tracking-wider">
                    Pilih Foto Barang
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  name="images"
                  multiple
                  accept="image/*"
                  {...imagesInput}
                  onChange={(e) => {
                    imagesInput.onChange(e);
                    addPreviewImage(e.target.files);
                  }}
                />
              </label>
            )}
            <p className="text-red-500 text-center mt-1">
              {errors.images && errors.images.message}
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
              {selectedImages?.length > !5 && (
                <>
                  <div
                    onClick={resetImages}
                    className="p-2 my-2 mr-4 border border-yellow-500 text-yellow-500 hover:border-0 hover:bg-yellow-400 hover:text-white bottom-3 left-3 text-center font-bold rounded-md cursor-pointer"
                  >
                    Kosongkan Semua Gambar
                  </div>
                  <label className="p-2 my-2 border border-blue-500 text-blue-500 hover:border-0 hover:bg-blue-400 hover:text-white bottom-3 left-3 text-center font-bold rounded-md cursor-pointer">
                    Tambah Gambar
                    <input
                      type="file"
                      multiple
                      hidden
                      accept="image/*"
                      {...imagesInput}
                      onChange={(e) => {
                        imagesInput.onChange(e);
                        addPreviewImage(e.target.files);
                      }}
                    ></input>
                  </label>
                </>
              )}
            </div>
        <input
          type="text"
          {...register("name", { required: true, maxLength: 150 })}
          name="name"
          className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
          placeholder="Nama Barang"
        />
        <p className="text-red-500">
          {errors.name?.type === "required" && "Tolong isi nama barang"}
          {errors.name?.type === "maxLength" && "Nama barang terlalu panjang"}
        </p>
        <textarea
          {...register("description")}
          name="description"
          className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
          placeholder="Deskripsi barang atau kontak tambahan yang dapat dihubungi"
          cols={20}
          rows={6}
        />
        <select
          {...register("province", { required: true })}
          name="province"
          className="rounded-md"
        >
          <option hidden value="">
            Pilih Wilayah
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
        <p className="text-red-500">
          {errors.province?.type === "required" && "Tolong pilih wilayah anda"}
        </p>
        <input
          type="text"
          {...register("address", { required: true })}
          name="address"
          className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
          placeholder="Alamat Barang Akan di Terima"
        />
        <p className="text-red-500">
          {errors.address?.type === "required" &&
            "Tolong isi alamat pengambilan barang"}
        </p>
      <fieldset className="border-2 border-dashed border-blue-500 p-3 mb-5">
      <legend className="font-bold" >Kontak</legend>
      <p className="font-medium">Isi salah satu atau semua kontak yang dapat dihubungi</p>
        <input
          type="tel"
          {...register("phoneNumber", {
            pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
          })}
          name="phoneNumber"
          className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
          placeholder="Nomor Telepon / Whatsapp"
        />

        <p className="text-red-500">
          {errors.phoneNumber?.type === "pattern" &&
            "Format No. Telepon salah contoh: 087 123 345 678"}
        </p>

        <input
          type="text"
          {...register("instagram")}
          name="instagram"
          className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
          placeholder="Instagram"
        />
        <input
          type="text"
          {...register("facebook")}
          name="facebook"
          className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
          placeholder="Facebook"
        />
        <input
          type="text"
          {...register("twitter")}
          name="twitter"
          className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
          placeholder="Twitter"
        />

        <input
          type="email"
          {...register("email", {
            pattern:
              /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          })}
          name="email"
          className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
          placeholder="Email"
        />
        <p className="text-red-500">
          {errors.email?.type === "pattern" &&
            "Format email salah contoh : namaemail@gmail.com"}
        </p>
        </fieldset>
        <button className="w-full bg-blue-400 xl:h-12 h-11 rounded-lg text-white font-bold hover:bg-blue-600">
          Simpan
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
