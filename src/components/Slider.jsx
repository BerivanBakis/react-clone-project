import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/Slider.css";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { fetchSliderData } from "../redux/slices/sliderSlice";
import { Add } from "@mui/icons-material";
import { Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";

function Slider() {
  const dispatch = useDispatch();
  const { slides, loading, error } = useSelector((state) => state.slider);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(null);
  const [clickedIcons, setClickedIcons] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [shuffledSlides, setShuffledSlides] = useState([]); // Karıştırılmış slide'ları saklayacağız

  useEffect(() => {
    dispatch(fetchSliderData());
  }, [dispatch]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Slides verisi geldiğinde karıştırma işlemi yapılacak
  useEffect(() => {
    if (slides.length > 0) {
      const shuffled = shuffleArray([...slides]);
      setShuffledSlides(shuffled); // Karıştırılmış veriyi kaydediyoruz
    }
  }, [slides]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % shuffledSlides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentSlide, shuffledSlides.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="slider">
      {shuffledSlides.map((slide, index) => {
        let slideClass = "";

        if (index === currentSlide) {
          slideClass = "active";
        } else if (index === previousSlide) {
          slideClass = "previous";
        } else if (index === (currentSlide + 1) % shuffledSlides.length) {
          slideClass = "next";
        }

        return (
          <div
            key={slide.id}
            className={`slide ${slideClass}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {index === currentSlide && (
              <div className="slide-text">
                <img src={slide.logo} alt="logo" />
                <p>{slide.text}</p>
                <div className="slide-button">
                  <Button
                    className="slide-button-play"
                    variant="contained"
                    startIcon={<PlayArrowIcon style={{ fontSize: "32px" }} />}
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                      textTransform: "inherit",
                      backgroundColor: "#fff",
                      color: "#000",
                      padding: "10px 20px",
                      borderRadius: "10px",
                    }}
                  >
                    Hemen İzle
                  </Button>
                  <div
                    style={{ margin: "0" }}
                    onClick={() => {
                      handleIconClick(slide.id);
                    }}
                  >
                    {clickedIcons[slide.id] ? (
                      <CheckIcon
                        className="slide-icon"
                        style={{ fontSize: "35px", color: "#000", backgroundColor: "#fff" }}
                      />
                    ) : (
                      <Add className="slide-icon" style={{ fontSize: "35px" }} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="controls">
        {shuffledSlides.map((_, index) => (
          <div
            key={index}
            className={`control-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
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
    </div>
  );
}

export default Slider;
