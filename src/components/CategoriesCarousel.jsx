import React, { useState, useEffect } from "react";
import "../css/CardCarousel.css";
import { useNavigate } from "react-router-dom";

function CategoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    { id: 1, backgroundColor: "#ba00e5", title: "Fantastik & Bilim Kurgu" },
    { id: 2, backgroundColor: "#3aae8a", title: "Dram" },
    { id: 3, backgroundColor: "#ff9e22", title: "Aksiyon & Macera" },
    { id: 4, backgroundColor: "#6002ee", title: "Korku & Gerilim" },
    { id: 5, backgroundColor: "#69ad17", title: "Biyografi" },
    { id: 6, backgroundColor: "#ef0078", title: "Aile" },
    { id: 7, backgroundColor: "#f47100", title: "Komedi" },
    { id: 8, backgroundColor: "#254dc8", title: "Dünya Sineması" },
    { id: 9, backgroundColor: "#c7006e", title: "Tarih" },
    { id: 10, backgroundColor: "#009bcd", title: "Polisiye & Suç" },
    { id: 11, backgroundColor: "#4ba4ff", title: "Çocuk" },
    { id: 12, backgroundColor: "#a200e0", title: "Belgesel" },
  ]

  const navigate = useNavigate();

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, cards.length - 1));
  };

  return (
    <div className="carousel-section">
      <p className="carousel-title">Tüm Türler</p>
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
              return (
                <div
                  className="carousel-card"
                  key={card.id}
                  style={{
                    backgroundColor: card.backgroundColor,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: '280px',
                    height: '115px',
                    cursor: "pointer", 
                    borderRadius:'3px',
                    marginRight:'10px'
                  }}
                  onClick={()=>navigate(`/film/${card.title}`)}
                >
                  <div className="card-title" style={{top:'20px', left:'20px', fontWeight:'normal'}}>{card.title}</div>
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
      </div>
    </div>
  );
};

export default CategoriesCarousel;
