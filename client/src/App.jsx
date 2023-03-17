import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import "./App.css";

export default function App() {
  const [uplaodedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = "http://localhost:5000/api/v1/upload";
  const handleUploaded = async (e) => {
    e.preventDefault();
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setLoading(true);
    let formData = new FormData();
    formData.append("file", img.data);
    const response = await axios(url, {
      method: "POST",
      data: formData,
    });
    console.log(response.data);
    const url2 = `data:${
      response.data.file.contentType
    };base64,${response.data.file.img.toString("base64")}`;
    setUploadedImage(url2);
    setLoading(false);
  };
  return (
    <div className="flex h-screen items-center justify-center ">
      {loading === false ? (
        <div
          className="flex flex-col gap-y-2 p-8 h-[70%] w-[70%] sm:w-[50%] 
          md:w-[30%] bg-white rounded-xl shadow-MainShadow"
        >
          {!uplaodedImage ? (
            <>
              <h3 className=" text-center flex justify-center Title ">
                Upload your image
              </h3>
              <p className="text-primaryParagraph text-sm font-medium text-center ra">
                File should be Jpeg, Png,...
              </p>
            </>
          ) : (
            <h3 className=" text-center flex justify-center items-center gap-x-2 Title ">
              Uploaded successfully
              <div className="flex items-center text-center justify-center h-10 w-10 bg-verified rounded-full">
                <span class="material-symbols-rounded">done</span>
              </div>
            </h3>
          )}
          {uplaodedImage ? (
            <img
              src={uplaodedImage}
              className="h-[70%] w-auto object-contain img"
              alt="uploadedImage"
            />
          ) : null}
          <label
            htmlFor="inputFile"
            className=" h-full w-full flex justify-center items-end"
          >
            <input
              type={"file"}
              id={"inputFile"}
              name="inputFile"
              accept="image/*"
              className="hidden"
              onChange={handleUploaded}
            />
            <div
              className="flex 
              items-center justify-center
              h-10 w-fit bg-blue-600 text-white 
              font-medium px-2 py-1 rounded-lg"
            >
              {!uplaodedImage ? <>Choice Image</> : <>Try Again</>}
            </div>
          </label>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-center gap-y-2 py-4 px-6 h-[70px] w-[60%] sm:w-[45%] md:w-[30%] bg-white rounded-xl shadow">
          <p className="text-primaryTitle text-xl">Uploading...</p>
          <BarLoader color={"#123abc"} loading={true} width={"100%"} />
        </div>
      )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
