import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import Card from "react-bootstrap/Card";
import "./Compress.css";

const Compress = () => {
  const [compressedLink, setCompressedLink] = useState(
    "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
  );
  const [originalImage, setOriginalImage] = useState("");
  const [originalLink, setOriginalLink] = useState("");
  const [clicked, setClicked] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const [outputFileName, setOutputFileName] = useState("");

  const handle = (e) => {
    const imageFile = e.target.files[0];
    setOriginalLink(URL.createObjectURL(imageFile));
    setOriginalImage(imageFile);
    setOutputFileName(imageFile.name);
    setUploadImage(true);
  };

  const click = (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!");
      return;
    }

    let output;
    imageCompression(originalImage, options).then((x) => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      setCompressedLink(downloadLink);
    });

    setClicked(true);
  };

  return (
    <div className="m-5">
      <div className="row">
        <div className="titleC">
        <h1>COMPRESS YOUR IMAGE</h1></div>
        <div className="ust">
          {uploadImage ? (
            <Card.Img className="ht" variant="top" src={originalLink} />
          ) : (
            <Card.Img
              className="ht"
              variant="top"
              src=""
            />
          )}
          <div className="fileC">
            <input
              type="file"
              accept="image/*"
              className="docbtn"
              onChange={(e) => handle(e)}
            />
          </div>
        </div>
        <div className="compress-btn">
          <br />
          {outputFileName ? (
            <button
              type="button"
              className="btn-dark"
              onClick={(e) => click(e)}
            >
              Compress
            </button>
          ) : (
            <></>
          )}
        </div>

        <div className="ht2">
          <Card.Img variant="top" src={compressedLink} />
          {clicked ? (
            <div className="download">
              <a
                href={compressedLink}
                download={outputFileName}
                className="download-btn"
              >
                Download
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compress;
