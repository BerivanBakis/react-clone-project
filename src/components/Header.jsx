import React, { useState, useEffect } from "react";
import "../css/Header.css";
import logo from "/images/blutv-icon.svg";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import SingleCard from "./SingleCard";
import { useNavigate } from "react-router-dom";

function Header({ onSearch }) {
  const [focused, setFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);  // Arama durumu

  const movies = useSelector((state) => state.movie.movies);
  const tvShows = useSelector((state) => state.movie.tvShows);
  const status = useSelector((state) => state.movie.status);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
      onSearch(false, []);
      setSearchActive(false); 
      return;
    }

    const allContent = [
      ...movies.mediumCarousel,
      ...movies.bigCarousel,
      ...tvShows.mediumCarousel,
      ...tvShows.bigCarousel,
    ];

    const filtered = allContent.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.cast &&
          item.cast.some((actor) =>
            actor.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );

    setFilteredResults(filtered);
    onSearch(true, filtered); 
    setSearchActive(true); 
  }, [searchTerm, movies, tvShows, onSearch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading content!</div>;
  }

  return (
    <div>
      <header className={isScrolled ? "scrolled" : ""}>
        <div className="menu">
          <div className="logo" onClick={()=>navigate("/")}>
            <img src={logo} alt="Logo" className="logo-image" />
          </div>
          <div className="menu-item">
            <a onClick={()=>navigate("/film")}>Film</a>
            <a href="#">Dizi</a>
            <a href="#">Canlı TV</a>
            <a href="#">Discovery</a>
          </div>
        </div>
        <div className="paper">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              borderRadius: "50px",
              bgcolor: focused ? "#535353" : "transparent",
              boxShadow: "none",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            <IconButton sx={{ p: "10px", color: "#fff" }} aria-label="Ara">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, color: "#fff" }}
              placeholder="Film, dizi ara..."
              inputProps={{ "aria-label": "Film, dizi ara..." }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Paper>
        </div>
      </header>
      <nav>
        <a href="#">Film</a>
        <a href="#">Dizi</a>
        <a href="#">Canlı TV</a>
        <a href="#">Discovery</a>
      </nav>
      <div className="search-results">
        {filteredResults.length > 0 ? (
          <div className="card-grid">
            {filteredResults.map((item) => (
              <SingleCard
                key={`${item.title}-${item.id}`}
                card={{
                  image: item.image,
                  title: item.title,
                }}
                width="340px"
                height="190px"
              />
            ))}
          </div>
        ) : searchTerm ? (
          <h1 style={{ color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh'}}>Aradığınız içerik bulunamadı.</h1>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
