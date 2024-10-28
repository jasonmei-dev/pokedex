import { useState } from 'react';
import Topbar from '../components/Topbar';
import PokemonList from '../components/PokemonList';
import Spinner from '../components/Spinner';

const HomePage = ({ allPokemon, loading }) => {
  const [searchText, setSearchText] = useState('');

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <div className="app-container">
      <Topbar handleOnChange={handleOnChange} searchText={searchText} clearSearch={clearSearch} />
      {loading ? <Spinner /> : <PokemonList allPokemon={allPokemon} searchText={searchText} />}
    </div>
  );
};

export default HomePage;
