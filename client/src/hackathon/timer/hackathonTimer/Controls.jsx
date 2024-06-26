import React, { useState } from "react";
import { imageMappings, backgrounds } from "../../resources";
import "./Controls.css";
import { Select } from "@chakra-ui/react";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

const Controls = ({ socket }) => {
  const [leftImage, setLeftImage] = useState(imageMappings[0]?.code || "");
  const [rightImage, setRightImage] = useState(imageMappings[0]?.code || "");
  const [BackGround, setBackground] = useState(backgrounds[0]?.code || "");

  const handleSelectChange = (event, side) => {
    const code = event.target.value;
    if (side === "left") {
      setLeftImage(code);
      socket.emit("changeSide", { code, side });
    } else if (side === "right") {
      setRightImage(code);
      socket.emit("changeSide", { code, side });
    } else if (side === "background") {
      setBackground(code);
      socket.emit("changeBackground", { code });
    }
  };

  const handleDragStart = (event, code, side) => {
    event.dataTransfer.setData("code", code);
    event.dataTransfer.setData("side", side);
  };

  const handleDrop = (event, side) => {
    const code = event.dataTransfer.getData("code");
    const originalSide = event.dataTransfer.getData("side");

    if (originalSide !== side) {
      if (side === "left") {
        setLeftImage(code);
        socket.emit("changeSide", { code, side });
      } else if (side === "right") {
        setRightImage(code);
        socket.emit("changeSide", { code, side });
      }
    }
    event.preventDefault();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="controls">
      <div className="activity-controls">
        <div className="image-mappings">
          <h3>Activity Image</h3>
          <div className="images">
            {imageMappings?.map(
              (image) =>
                image.path && (
                  <div
                    key={image.code}
                    className="image-mapping"
                    draggable
                    onDragStart={(event) =>
                      handleDragStart(event, image.code, image.side)
                    }
                  >
                    <img
                      src={image.path}
                      alt={`activity ${image.code}`}
                      className="mapping-img"
                    />
                    <p>{`${image.code}`}</p>
                  </div>
                )
            )}
          </div>
        </div>
        <div className="controls">
          <div className="control-item">
            <h3>Left Side</h3>
            <div
              className="drop-area"
              onDrop={(event) => handleDrop(event, "left")}
              onDragOver={handleDragOver}
            >
              <Select
                value={leftImage}
                onChange={(e) => handleSelectChange(e, "left")}
                icon={<ArrowDropDownCircleIcon />}
                variant="outline"
                   placeholder="select code or drag images"
              >
                {imageMappings.map((image) => (
                  <option key={image.code} value={image.code}>
                    {image.code}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="control-item">
            <h3>Right Side</h3>
            <div
              className="drop-area"
              onDrop={(event) => handleDrop(event, "right")}
              onDragOver={handleDragOver}
            >
              <Select
                value={rightImage}
                onChange={(e) => handleSelectChange(e, "right")}
                icon={<ArrowDropDownCircleIcon />}
                variant="outline"
                placeholder="select or drag images"
              >
                {imageMappings.map((image) => (
                  <option key={image.code} value={image.code}>
                    {image.code}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="background-controls">
        <div className="controls">
          <div className="control-item">
            <h3>Backgrounds</h3>
            <Select
              value={BackGround}
              variant="filled"
              onChange={(e) => handleSelectChange(e, "background")}
              icon={<ArrowDropDownCircleIcon />}
            >
              {backgrounds.map((image) => (
                <option key={image.code} value={image.code}>
                  {image.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
