import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import RouterConfig from './config/RouterConfig';

function App() {
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = (isSearching) => {
    setSearchActive(isSearching);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      {!searchActive ? (
        <RouterConfig />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
