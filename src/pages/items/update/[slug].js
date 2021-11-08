import { Backbar, BottomNavbar, LoadingBox } from "../../../components";
import { connectToDatabase } from "../../../libs/database";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/client";
import { Loading } from "../../../state";
import axios from "axios";
import Slider from "react-slick";
import router from "next/router";
import resizeImage from "../../../libs/compressBeforeUpload";

const UpdateItemForm = ({ item }) => {
  const [session, loading] = useSession();
  const { setLoadingStatus, setLoadingMessage, setSuccessStatus, isLoading } =
    useContext(Loading);

  const [previousImage, setPreviousImages] = useState(item.images);
  const [previewImage, setPreviewImages] = useState(item.images);
  const [selectedImages, setSelectedImages] = useState(item.images);
  const [deletedImages, setDeletedImages] = useState(item.images);
  const [isImageSizeReachedLimit, setReachedStatus] = useState(false);
  const [isDataNotChanged, setDataChangedStatus] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const isNothingChanged = (updatedData, selectedImages) => {
    const previousItemData = {
      images: {},
      name: item.name,
      description: item.description,
      province: item.province,
      address: item.address,
      phoneNumber: item.phoneNumber,
      email: item.email,
    };

    if (
      JSON.stringify(updatedData) === JSON.stringify(previousItemData) &&
      selectedImages === item.images
    ) {
      return true;
    }

    return false;
  };

  const updateItem = async (updateData) => {
    if (isNothingChanged(updateData, selectedImages)) {
      setDataChangedStatus(false);
      return;
    }

    if (!selectedImages[0] || selectedImages.length > 5) {
      setReachedStatus(true);
      return;
    }

    setLoadingStatus(true);
    setLoadingMessage("Memperbarui Barang");

    delete updateData["images"];

    const formData = new FormData();

    const imageIndex = [];
    let path = [];

    for (const data in updateData) {
      formData.append(`${data}`, updateData[data]);
    }

    for (const image in selectedImages) {
      if (typeof selectedImages[image] === "string") {
        path.push(selectedImages[image]);
      }
      if(typeof selectedImages[image] === "object"){
        formData.append("images",  await resizeImage(selectedImages[image]));
      }else{
        formData.append("images",  selectedImages[image]);
      }
      console.log(selectedImages[image]);
      imageIndex.push(typeof selectedImages[image] === "object");
    }

    formData.append("images", path);
    formData.append("imageIndex", imageIndex);
    formData.append("imageName", item.imagesName);
    formData.append("fullpath", item.images);
    formData.append("deletedImage", deletedImages);

    axios
      .put(`/api/items/${item._id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Masuk selesai");
        setLoadingMessage("Telah diperbarui");
        setSuccessStatus(true);
        let delay = setTimeout(() => {
          setLoadingStatus(false);
          setLoadingMessage("Mohon Tunggu");
          setSuccessStatus(false);
          clearTimeout(delay);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
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

    setPreviewImages([...item.images]);
    setSelectedImages([...item.images]);
    setPreviousImages([...item.images]);
    setDeletedImages([...item.images]);
  };

  const addPreviewImage = (images) => {
    let selectedImages = [];

    for (let i = 0; i < images.length; i++) {
      selectedImages.push(images[i]);
    }

    setSelectedImages((prevImage) => [...prevImage, ...selectedImages]);
    let blobImages = [];

    for (let i = 0; i < images.length; i++) {
      blobImages[i] = URL.createObjectURL(images[i]);
    }

    setPreviewImages((prevImage) => [...prevImage, ...blobImages]);
    setValue("images", null);
  };

  const settings = {
    infinite: false,
    adaptiveHeight: true,
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
    if (!session) router.push("/login");
    if (session?.user.id !== item.user_id) router.back();
    return () => {
      previewImage.forEach((image) => {
        URL.revokeObjectURL(image);
      });
    };
  }, [session]);

  if (!session && !loading) return <div></div>;
  if (session?.user.id !== item.user_id) return <div></div>;

  if (!session && !item && loading) return <LoadingBox></LoadingBox>;

  return (
    <>
      <Backbar />
      <div className="flex justify-center">
        {isLoading && <LoadingBox></LoadingBox>}
        <form
          onSubmit={handleSubmit(updateItem)}
          className="flex flex-col p-4 xl:w-2/5 w-full my-6 justify-center items-center"
          encType="multipart/form-data"
        >
          <div className="w-full">
            <Slider {...settings}>
              {previewImage.map((image, index) => {
                return (
                  <div className="relative rounded-lg w-full" key={index}>
                    <img
                      src={image}
                      className="rounded-lg mx-auto"
                      alt={`Gambar dari ${item.name}`}
                    ></img>
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
                        accept="image/*;capture=camera"
                        onChange={(e) => {
                          e.preventDefault();
                          changePreviewImage(e.target.files[0], index);
                        }}
                      ></input>
                    </label>
                  </div>
                );
              })}
            </Slider>
          </div>

          {isImageSizeReachedLimit && (
            <p className="text-red-500">Gambar minimal 1 maksimal 5</p>
          )}

          <div className="flex">
            <div
              onClick={resetImages}
              className="p-2 my-2 mr-4 border border-yellow-500 text-yellow-500 hover:border-0 hover:bg-yellow-400 hover:text-white bottom-3 left-3 text-center font-bold rounded-md cursor-pointer"
            >
              Balikan Semua Gambar
            </div>

            {selectedImages.length > !5 && (
              <label className="p-2 my-2 border border-blue-500 text-blue-500 hover:border-0 hover:bg-blue-400 hover:text-white bottom-3 left-3 text-center font-bold rounded-md cursor-pointer">
                Tambah Gambar
                <input
                  type="file"
                  multiple
                  hidden
                  {...imagesInput}
                  onChange={(e) => {
                    imagesInput.onChange(e);
                    addPreviewImage(e.target.files);
                  }}
                ></input>
              </label>
            )}
          </div>

          {!isDataNotChanged && <p>Belum Ada perubahan data</p>}

          <input
            type="text"
            {...register("name", {
              required: true,
              maxLength: 150,
              value: item.name,
            })}
            name="name"
            className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
            placeholder="Nama Barang"
          />
          <p className="text-red-500">
            {errors.name?.type === "required" && "Tolong isi nama barang"}
            {errors.name?.type === "maxLength" && "Nama barang terlalu panjang"}
          </p>
          <textarea
            {...register("description", { value: item.description })}
            name="description"
            className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
            placeholder="Deskripsi"
            cols={20}
            rows={6}
          />
          <select
            {...register("province", { required: true, value: item.province })}
            name="province"
            className="rounded-md w-full"
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
            {errors.province?.type === "required" &&
              "Tolong pilih wilayah anda"}
          </p>

          <input
            type="text"
            {...register("address", { required: true, value: item.address })}
            name="address"
            className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
            placeholder="Alamat Barang Akan di Terima"
          />
          <p className="text-red-500">
            {errors.address?.type === "required" &&
              "Tolong isi alamat pengambilan barang"}
          </p>

          <input
            type="tel"
            {...register("phoneNumber", {
              required: true,
              pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
              value: item.phoneNumber,
            })}
            name="phoneNumber"
            className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
            placeholder="Nomor Telepon / Whatsapp"
          />
          <p className="text-red-500">
            {errors.phoneNumber?.type === "required" &&
              "Tolong isi nomor telepon"}
            {errors.phoneNumber?.type === "pattern" &&
              "Format No. Telepon salah contoh: 087 123 345 678"}
          </p>

          <input
            type="email"
            {...register("email", {
              pattern:
                /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
              value: item.email,
            })}
            name="email"
            className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
            placeholder="Email"
          />
          <p className="text-red-500">
            {errors.email?.type === "pattern" &&
              "Format email salah contoh : namaemail@gmail.com"}
          </p>
          <button className="w-full bg-blue-400 xl:h-12 h-11 rounded-lg text-white font-bold hover:bg-blue-600">
            Simpan
          </button>
        </form>
      </div>
      <BottomNavbar></BottomNavbar>
    </>
  );
};

export default UpdateItemForm;

export async function getServerSideProps({ query }) {
  try {
    const { slug } = query;
    const { db } = await connectToDatabase();
    const resultItem = await db
      .collection("items")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "uploader",
          },
        },
        {
          $match: {
            slug,
          },
        },
      ])
      .toArray();

    return {
      props: {
        item: JSON.parse(JSON.stringify(resultItem[0])),
      },
    };
  } catch (error) {
    console.log(error);
    return;
  }
}
