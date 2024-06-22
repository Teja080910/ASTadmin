import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import "./countdown/Activities.css";

const SOCKET_SERVER_URL = "http://localhost:5000";
const socket = socketIOClient(SOCKET_SERVER_URL);

const Activities = () => {
  const [images, setImages] = useState([]);

  const imageMappings = [
    { code: "001", path: "../head.png" },
    { code: "002", path: "../clock.png" },
  ];

  useEffect(() => {
    socket.emit("activeimages");
    socket.on("activeimages", (data) => {
      console.log(data);
      const updatedImages = data
        .filter(item => item.code !== "000")
        .map(item => {
          const imageMapping = imageMappings.find(img => img.code === item.code);
          return imageMapping ? { ...item, path: imageMapping.path } : item;
        });
  
      setImages(updatedImages);
    });
    socket.on("imageData", (data) => {
      setImages((prevImages) => {
        const existingImage = imageMappings.find(
          (img) => img.code === data.code
        );
        if (existingImage) {
          const newImage = { ...existingImage, side: data.side };
          return [
            ...prevImages.filter((img) => img.code !== data.code),
            newImage,
          ];
        } else {
          // If code not found, remove the image from the state
          return prevImages.filter((img) => img.side !== data.side);
        }
      });
    });

    return () => {
      socket.off("activeimages");
      socket.off("imageData");
    };
  }, []);

  return (
    <div className="activities">
      {images?.map((image, index) => (
        <div key={index} className={`activity ${image.side}`}>
          <img
            src={image.path}
            alt={`Activity ${image.code}`}
            className="img"
          />
        </div>
      ))}
    </div>
  );
};

export default Activities;
