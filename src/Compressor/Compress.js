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
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
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
      <div className="row mt-5">
        <div className="col-lg-4 col-md-12 col-sm-12">
          {uploadImage ? (
            <Card.Img className="ht" variant="top" src={originalLink} />
          ) : (
            <Card.Img
              className="ht"
              variant="top"
              src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
            />
          )}
          <div className="d-flex justify-content-center mt-3">
            <input
              type="file"
              accept="image/*"
              className="mt-2 btn btn-dark"
              onChange={(e) => handle(e)}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-center">
          <br />
          {outputFileName ? (
            <button
              type="button"
              className=" btn btn-dark"
              onClick={(e) => click(e)}
            >
              Compress
            </button>
          ) : (
            <></>
          )}
        </div>

        <div className="col-lg-4 col-md-12 col-sm-12 mt-1">
          <Card.Img variant="top" src={compressedLink} />
          {clicked ? (
            <div className="d-flex justify-content-center">
              <a
                href={compressedLink}
                download={outputFileName}
                className="mt-2 btn btn-dark"
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
