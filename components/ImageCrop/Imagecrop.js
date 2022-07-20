import React, { useState, useCallback } from "react";
import Style from "./Imagecrop.module.scss";
import Cropper from "react-easy-crop";

const Imagecrop = ({ setCoverImage }) => {
  const [imageSrc, setImageSrc] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);
    }
  };

  const handleCoverUpload = () => {
    setCoverImage(imageSrc);
  };

  return (
    <div className={Style.image__crop}>
      {imageSrc && (
        <div className={Style.cropContainer}>
          <div className={Style.crop}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
            />
          </div>
        </div>
      )}

      <div className={Style.uplaod__container}>
        <input
          type="file"
          name="file"
          onChange={onFileChange}
          accept="image/*"
          placeholder="Upload Thumbnail"
        />

        <button
          className={Style.upload}
          disabled={!imageSrc}
          onClick={handleCoverUpload}
        >
          Cover
        </button>
      </div>
    </div>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default Imagecrop;
