import React, { useState } from "react";
import axios from 'axios';
import { FaFileDownload } from "react-icons/fa";
import './Remove.css'
//apiKey: dVeJpRBaByDniitGkG4ekwZn

const Remover = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [finalUrl, setFinalUrl] = useState(null);
  const [isUpload, setIsUpload] = useState(false);

  const handleFileInputChange = (e) => {
    let image = e.target.files?.[0];
    setSelectedFile(image || null);
  };

  const handleFileUpload = async () => {
    setIsUpload(true);
    const formData = new FormData();
    formData.append("image_file", selectedFile);
    formData.append("size", "auto");

    const api_key = 'dVeJpRBaByDniitGkG4ekwZn';

    try {
      const response = await axios.post("https://api.remove.bg/v1.0/removebg", formData, {
        headers: {
          "X-Api-Key": api_key,
        },
        responseType: 'blob',
      });

      const url = URL.createObjectURL(response.data);
      setFinalUrl(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUpload(false);
    }
  };

  return (
    <div className="background">
      <div className="remover_container">
        <div className="title">
          <h4 className="Header">Remove Background <span className=" inline-block"></span> </h4>
        </div>
        <div className="flex justify-center items-center flex-col h-1">
          <form className="info_container ">
            <label htmlFor="userImg" className="info_text"></label>
            <input type="file" id="userImg" className="file" onChange={handleFileInputChange} required />
            {!isUpload ? (
              <button
                type="button"
                onClick={handleFileUpload}
                className="upload"
              >
                Upload
              </button>
            ) : (
              <button
                type="button"
                className="bg-purple-300 p-2 rounded"
                disabled={true}
              >
                Uploading...
              </button>
            )}
          </form>
          <div className="flex justify-center items-center flex-col mt-8 p-4">
            {finalUrl && (
              <div className="final_img_area">
                <img src={finalUrl} alt="final_img" className=" w-2/6 h-auto" />
              </div>
            )}
            {finalUrl && (
              <a href={finalUrl} download="IMAGE-I-NATION Removed Background.png" >
                <button className="downloadButton">Download <div className=" px-2"><FaFileDownload /></div> </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Remover;