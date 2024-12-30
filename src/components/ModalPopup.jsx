import React, { useEffect, useState } from "react";
import "../css/ModalPopup.css";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Avatar from "@mui/material/Avatar";
import { IoIosArrowUp } from "react-icons/io";

const ModalPopup = ({ open, card, onClose }) => {
  const [clickedIcons, setClickedIcons] = useState({});
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [players, setPlayers] = useState(false);

  useEffect(() => {
    if (open) {
      setPlayers(false); 
    }
  }, [open]);
  if (!open) return null;

  const handleAddToWatchlist = (id) => {
    setClickedIcons((prevState) => {
      const isAdded = prevState[id];
      setSnackbarMessage(
        isAdded ? "İzleme listenizden çıkarıldı." : "İzleme listesine kaydedildi."
      );
      setOpenSnackbar(true);
      return {
        ...prevState,
        [id]: !isAdded,
      };
    });
  };
  
  

  const handleLikeClick = () => {
    if (liked) {
      setLiked(false);
      setSnackbarMessage("Önerilerinizi Seçimlerinize Göre Güncelledik.");
    } else {
      setLiked(true);
      setDisliked(false);
      setSnackbarMessage("Bu içeriği beğendiniz.");
    }
    setOpenSnackbar(true);
  };

  const handleDislikeClick = () => {
    if (disliked) {
      setDisliked(false);
      setSnackbarMessage("Önerilerinizi Seçimlerinize Göre Güncelledik.");
    } else {
      setDisliked(true);
      setLiked(false);
      setSnackbarMessage("Önerilerinizi Seçimlerinize Göre Güncelledik.");
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handlePlayerClick = () => {
    setPlayers(!players);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 75,
        height: 75,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Event bubbling'i durdurur
        style={{ backgroundImage: `url(${card.detailImage})` }}
      >
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
        <div
          className="modal-left-panel"
          style={{ display: players ? "none" : "flex" }}
        >
          {/* Logo */}
          <img src={card.logo} alt="Card Logo" className="modal-logo" />
          {/* Alt Bilgiler */}
          <div className="modal-info">
            <span>{card.releaseDate}</span>
            <span>{card.duration}</span>
          </div>

          <div className="modal-icons">
            <Button
              className="icons"
              variant="contained"
              startIcon={<PlayArrowIcon style={{ fontSize: "32px" }} />}
              style={{
                fontSize: "17px",
                cursor: "pointer",
                textTransform: "inherit",
                height: "45px",
                backgroundColor: "#fff",
                color: "#000",
                padding: "0px 22px",
                borderRadius: "5px",
              }}
            >
              Hemen İzle
            </Button>
            <div
              style={{ margin: "0" }}
              onClick={() => handleAddToWatchlist(card.id)}
            >
              {clickedIcons[card.id] ? (
                <CheckIcon
                  className="icons"
                  style={{
                    padding: "10px",
                    fontSize: "27px",
                    cursor: "pointer",
                    borderRadius: "50%",
                    backgroundColor: "#ffffff36",
                  }}
                />
              ) : (
                <AddIcon
                  className="icons"
                  style={{
                    padding: "10px",
                    fontSize: "27px",
                    cursor: "pointer",
                    borderRadius: "50%",
                    backgroundColor: "#ffffff36",
                  }}
                />
              )}
            </div>
            <ThumbUpAltIcon
              className="icons"
              style={{
                padding: "10px",
                fontSize: "27px",
                cursor: "pointer",
                borderRadius: "50%",
                display: disliked ? "none" : "inline",
                backgroundColor: "#ffffff36",
              }}
              onClick={handleLikeClick}
            />
            <ThumbDownAltIcon
              className="icons"
              style={{
                padding: "10px",
                fontSize: "27px",
                cursor: "pointer",
                borderRadius: "50%",
                display: liked ? "none" : "inline",
                backgroundColor: "#ffffff36",
              }}
              onClick={handleDislikeClick}
            />
          </div>

          {/* Ek Bilgiler */}
          <div className="modal-details">
            <div className="modal-detail">
              <strong>IMDB:</strong> <span>{card.rating}</span>
            </div>
            <div className="modal-detail">
              <strong>Tür:</strong> <span>{card.genres.join(", ")}</span>
            </div>
            <div className="modal-detail">
              <strong>Yönetmen:</strong> <span>{card.director}</span>
            </div>
          </div>

          <div className="modal-detail-text">{card.detailText}</div>

        </div>
        <div className="modal-right-panel">
          <div
            className="right-content"
            onClick={handlePlayerClick}
            style={{ display: players ? "none" : "flex" }}
          >
            <PeopleAltIcon
              style={{
                fontSize: "38px",
                backgroundColor: "#fff",
                padding: "12px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <p>Oyuncular</p>
          </div>
          <div
            className="players-checked"
            style={{ display: players ? "flex" : "none" }}
          >
            <div  style={{ cursor:'pointer' }} onClick={handlePlayerClick}>
              <IoIosArrowUp style={{ fontSize: "70px", color: "#fff" }} />
            </div>
            <div className="player-list">
              <img src={card.logo} alt="logo" />
              <div className="avatars">
                {card.cast.map((name, index) => (
                  <div className="avatar" key={index}>
                    <Avatar {...stringAvatar(name)} />
                    <h3>{name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hide-button">BluTV Uygulamasını İndir</div>
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
    </div>
  );
};

export default ModalPopup;
