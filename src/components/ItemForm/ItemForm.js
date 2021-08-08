import axios from "axios";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "../../state";
import ImagePreview from "../ImagePreview";

const ItemForm = ({ userId }) => {
  const { setLoadingStatus, setLoadingMessage } = useContext(Loading);
  const [isPreviewImageClicked, setPreviewImageStatus] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [files, setFile] = useState([]);

  const inputFileHandler = ({ target }) => {
    setFile(target.files);
  };

  const uploadItem = async (data) => {
    if (!files[0] || files.length > 5) {
      setFile(null);
      return;
    }

    setLoadingStatus(true);
    setLoadingMessage("Mengupload Gambar");

    let formData = new FormData();

    for (const input in data) {
      formData.append(input, data[input]);
    }

    for (const image in files) {
      formData.append("images", files[image]);
    }

    formData.append("user_id", userId);

    for (const value of formData.values()) {
      console.log(value);
   }

    axios
      .post("/api/items", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoadingStatus(false);
        reset();
        setLoadingMessage("Mohon Tunggu");
      })
      .catch((err) => {
        console.log(err);
        setLoadingStatus(false);
        setLoadingMessage("Mohon Tunggu");
      });
  };

  return (
    <div className="flex justify-center">
      {isPreviewImageClicked && <ImagePreview images={files} setPreviewImageStatus={setPreviewImageStatus} isPreviewImageClicked={isPreviewImageClicked}></ImagePreview>}
      <form
        onSubmit={handleSubmit(uploadItem)}
        className="flex flex-col p-4 xl:w-2/6 my-6"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 my-5 mx-7">
          <div className="flex flex-col items-center justify-center w-full">
            <label className="flex flex-col border-4 border-dashed w-full h-36 hover:bg-gray-100 hover:border-green-300 hover:fill-current hover:text-green-600 group">
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
                onChange={inputFileHandler}
                name="images"
                multiple
              />
            </label>
            <p className="text-red-500">
              {!files && "Tolong pilih gambar min 1 dan max 5 gambar"}
            </p>
          </div>
        </div>

        {files[0] && <button onClick={() => setPreviewImageStatus(isPreviewImageClicked ? false : true)}>Lihat Gambar</button>}
        <input
          type="text"
          {...register("name", { required: true, maxLength: 150 })}
          name="name"
          className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
          placeholder="Nama Barang"
        />
        <p className="text-red-500">
          {errors.name?.type === "required" && "Tolong isi nama barang"}{" "}
          {errors.name?.type === "maxLength" && "Nama barang terlalu panjang"}
        </p>
        <textarea
          {...register("description")}
          name="description"
          className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3"
          placeholder="Deskripsi"
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
        <input
          type="tel"
          {...register("phoneNumber", {
            required: true,
            pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
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
  );
};

export default ItemForm;

// const [imgFiles, setImgFiles] = useState([]);
//     const [session, loading] = useSession();
//     const [inputs, setInputs] = useState({ name: '', description: '', province: '', address: '', phoneNumber: '', email: '' });

//     //refactor kode yang ini, sebenernya perlu inputs aja img file nya ga perlu
//     const onChangeHandler = ({ target }) => {
//         const { name, value } = target;
//         setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
//     }

//     const onFileChange = ({ target }) => {
//         setImgFiles(target.files)
//     }

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         let formData = new FormData();
//         for (const input in inputs) {
//             formData.append(input, inputs[input]);
//         }

//         for (const imgFile in imgFiles) {
//             console.log(imgFiles[imgFile])
//             formData.append('images', imgFiles[imgFile]);
//         }

//         axios.post('http://localhost:3000/api/items', formData, {
//             headers: {
//                 'content-type': 'multipart/form-data',
//             }
//         })
//             .then((res) => {
//                 console.log(res.data)
//             })
//             .catch(err => console.log(err))
//     }

//     useEffect(() => {
//         setInputs(session ? { province: session.user.province, address: session.user.address, phoneNumber: session.user.phoneNumber, email: session.user.email } : {});
//     }, [loading])
