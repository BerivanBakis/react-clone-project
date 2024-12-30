import React, { useState } from "react";
import { PlayArrow, Add, ThumbUp } from "@mui/icons-material";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import "../css/CardCarousel.css";

const SingleCard = ({ card, width, height }) => {
  return (
    <div style={{ overflow: "hidden", marginBottom: "10px" }}>
      <div
        className="carousel-card"
        //   key={index}
        style={{
          backgroundImage: `url(${card.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: `${width}`,
          height: `${height}`,
        }}
      >
        <div className="card-title">{card.title}</div>
        <div className="card-hover-bar">
          <PlayArrow
            style={{
              backgroundColor: "#242630",
              color: "white",
              borderRadius: "50%",
              padding: "3px",
              fontSize: "35px",
              cursor: "pointer",
            }}
          />
          <Add
            style={{
              backgroundColor: "#242630",
              color: "white",
              borderRadius: "50%",
              padding: "3px",
              fontSize: "35px",
              cursor: "pointer",
            }}
          />
          <PriorityHighOutlinedIcon
            style={{
              backgroundColor: "#242630",
              color: "white",
              borderRadius: "50%",
              padding: "6px",
              fontSize: "30px",
              cursor: "pointer",
            }}
          />
          <ThumbUp
            style={{
              backgroundColor: "#242630",
              color: "white",
              borderRadius: "50%",
              padding: "8px",
              fontSize: "25px",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
