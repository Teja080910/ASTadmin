import { useEffect, useState } from "react";
import "./countdown/Activities.css";
import { imageMappings } from "../resources";

const Activities = ({ socket , setStateUpdate }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    socket.emit("activeimages");
    socket.on("activeimages", (data) => {
      const updatedImages = data
        .filter((item) => item.code !== "000")
        .map((item) => {
          const imageMapping = imageMappings.find(
            (img) => img.code === item.code
          );
          return imageMapping ? { ...item, path: imageMapping.path } : item;
        });

      setImages(updatedImages);
    });
    socket.on('imageData', (data) => {
      setImages((prevImages) => {
        const existingImage = imageMappings.find((img) => img.code === data.code);
        if (existingImage && existingImage.code !== '000') {
          const newImage = { ...existingImage, side: data.side };
          return [
            ...prevImages.filter((img) => img.code !== data.code && img.code !== '000'),
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

useEffect(()=>{

if(images.length<=0){
  setStateUpdate("timer")
}else{
  setStateUpdate("activity")
}



},[images])











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
