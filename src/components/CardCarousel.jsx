import React, { useState, useEffect } from "react";
import { PlayArrow, Add, ThumbUp } from "@mui/icons-material";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import "../css/CardCarousel.css";
import { Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import ModalPopup from "./ModalPopup";

const CardCarousel = ({ cards, width, height, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clickedIcons, setClickedIcons] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currentCard, setCurrentCard] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Ekran boyutunu izlemek için effect
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const calculateDimensions = (width, height) => {
    if (!isSmallScreen) {
      return { width, height }; // Küçük ekran değilse orijinal ölçüler döndürülür
    }

    const widthValue = parseInt(width.replace("px", ""), 10);
    const heightValue = parseInt(height.replace("px", ""), 10);

    const aspectRatio = widthValue / heightValue;
    const newWidth = 40;
    const newHeight = newWidth / aspectRatio;

    return { width: `${newWidth}vw`, height: `${newHeight}vw` };
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, cards.length - 1));
  };

  const handleIconClick = (id) => {
    setClickedIcons((prev) => {
      const newClickedIcons = { ...prev };
      if (newClickedIcons[id]) {
        newClickedIcons[id] = false;
        setSnackbarMessage("İçerik İzleme Listenizden Çıkarıldı");
      } else {
        newClickedIcons[id] = true;
        setSnackbarMessage("İçerik İzleme Listenize Eklendi");
      }
      return newClickedIcons;
    });

    setOpenSnackbar(true);
  };

  const handleModalOpen = (card) => {
    setCurrentCard(card);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="carousel-section">
      {
        title ? <p className="carousel-title">{title}</p> : <p></p>
      }
      <div className="carousel-container">
        <button
          className="carousel-arrow left-arrow"
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
        >
          &#8249;
        </button>

        <div className="carousel-track">
          <div
            className="carousel-cards"
            style={{ transform: `translateX(-${currentIndex * 300}px)` }}
          >
            {cards.map((card) => {
              const { width: adjustedWidth, height: adjustedHeight } =
                calculateDimensions(width, height);

              return (
                <div
                  className="carousel-card"
                  key={card.id}
                  style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: adjustedWidth,
                    height: adjustedHeight,
                    cursor: "pointer",
                  }}
                  onClick={() => handleModalOpen(card)}
                >
                  <div className="card-title">{card.title}</div>
                  <div className="card-hover-bar">
                    <PlayArrow
                      className="card-bar-icon"
                      style={{
                        padding: "3px",
                        fontSize: "35px",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div
                      style={{ margin: "0" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIconClick(card.id);
                      }}
                    >
                      {clickedIcons[card.id] ? (
                        <CheckIcon
                          className="card-bar-icon"
                          style={{
                            padding: "3px",
                            fontSize: "35px",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <Add
                          className="card-bar-icon"
                          style={{
                            padding: "3px",
                            fontSize: "35px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </div>
                    <PriorityHighOutlinedIcon
                      className="card-bar-icon"
                      style={{
                        padding: "3px",
                        fontSize: "35px",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModalOpen(card);
                      }}
                    />
                    <ThumbUp
                      className="card-bar-icon"
                      style={{
                        padding: "7px",
                        fontSize: "25px",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="carousel-arrow right-arrow"
          onClick={handleNextClick}
          disabled={currentIndex >= cards.length - 1}
        >
          &#8250;
        </button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            variant="filled"
            sx={{
              width: "500px",
              padding: "10px 20px",
              fontSize: "18px",
              bgcolor: "#fff",
              color: "#000",
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <ModalPopup
          open={openModal}
          card={currentCard}
          onClose={handleModalClose}
        />
      </div>
    </div>
  );
};

export default CardCarousel;
