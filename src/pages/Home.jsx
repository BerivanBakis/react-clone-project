import React from 'react';
import Slider from '../components/Slider';
import CardCarousel from '../components/CardCarousel';

function Home({ movies, tvShows }) {
  return (
    <div>
      <Slider />
      <CardCarousel
        cards={[...(movies.mediumCarousel || [])].sort(() => Math.random() - 0.5)}
        width="350px"
        height="200px"
      />
      <CardCarousel cards={movies.bigCarousel || []} width="420px" height="630px" />
      <CardCarousel
        cards={[...(tvShows.mediumCarousel || [])].sort(() => Math.random() - 0.5)}
        width="420px"
        height="240px"
        title="Nefes Kesen Aksiyonlar"
      />
      <CardCarousel
        cards={[...(tvShows.mediumCarousel || [])].sort(() => Math.random() - 0.5)}
        width="350px"
        height="200px"
        title="Çöl Gezegeni Arrakis"
      />
      <CardCarousel
        cards={[...(movies.mediumCarousel || [])].sort(() => Math.random() - 0.5)}
        width="420px"
        height="240px"
        title="Geçmişe Yolculuk"
      />
    </div>
  );
}

export default Home;
