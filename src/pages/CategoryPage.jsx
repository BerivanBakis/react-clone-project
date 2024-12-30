import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SingleCard from "../components/SingleCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CategoryPage({movies}) {
  const { category } = useParams(); 
  const [filteredMovies, setFilteredMovies] = useState([]);
  const status = useSelector((state) => state.movie.status);
  const navigate = useNavigate();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading movies!</div>;
  }

  useEffect(() => {
    if (movies && category) {
        const filtered = movies.filter((movie) => movie.genres.includes(category)); 
        setFilteredMovies(filtered);
      }
  }, [category]);

  return (
    <div style={{paddingTop:'100px'}}>
      <p style={{marginLeft:'60px', color:'#fff', fontSize:'32px', display:'flex', flexDirection:'row',alignItems:'center'}}>
        <div onClick={()=>navigate("/film")}><ArrowBackIcon style={{fontSize:'45px', marginRight:'15px', cursor:'pointer'}}/></div>
         {category} Category
      </p>
      {filteredMovies.length > 0 ? (
        <div className="card-grid" style={{paddingTop:'20px'}}>
        {filteredMovies.map((item) => (
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
      ) : (
        <p>No movies found in this category.</p>
      )}
    </div>
  );
}

export default CategoryPage;
