import React, { useState, useEffect } from "react";
import { imageMappings, backgrounds, games } from "../../resources";
import "./Controls.css";
import { Select, Table, Tbody, Tr, Td, Th, Thead } from "@chakra-ui/react";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

const Controls = ({ socket }) => {
  const [leftImage, setLeftImage] = useState(imageMappings[0]?.code || "");
  const [rightImage, setRightImage] = useState(imageMappings[0]?.code || "");
  const [background, setBackground] = useState(backgrounds[0]?.code || "");
  const [game, setGame] = useState(games[0]?.code || "");
  const [scores, setScores] = useState([]);

  useEffect(() => {
    socket.on("gameData", (data) => {
      if (data.code !== "no-game"){
        setGame(false); 
      }else{
        setGame(data.code); 


      }
    });
    socket.emit("getAllScores");
    socket.on("allScores", (data) => {
      // Sort scores in descending order and add ranking
      const sortedScores = data
        .sort((a, b) => b.score - a.score)
        .map((score, index) => ({ ...score, rank: index + 1 }));
      setScores(sortedScores);
    });

  
    

    return () => {
      socket.off("gameData");
      socket.off("allScores");
    };
  }, [socket]);

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
    } else if (side === "games") {
      setGame(code);
      socket.emit("addGame", { code });
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
              value={background}
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

          <div className="control-item">
            <h3>Add Games</h3>
            <Select
              value={game}
              variant="filled"
              placeholder="add game"
              onChange={(e) => handleSelectChange(e, "games")}
              icon={<ArrowDropDownCircleIcon />}
            >
              {games.map((game) => (
                <option key={game.code} value={game.code}>
                  {game.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="scores-table">
        <h3>Scores</h3>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User ID</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scores.map((score) => (
              <Tr key={score.userid}>
                <Td>{score.userid}</Td>
                <Td>{score.score}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default Controls;
