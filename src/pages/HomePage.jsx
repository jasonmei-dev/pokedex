import { useState } from 'react';
import Topbar from '../components/Topbar';
import PokemonList from '../components/PokemonList';

const HomePage = ({ allPokemon }) => {
  const [searchText, setSearchText] = useState('');

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="app-container">
      <Topbar handleOnChange={handleOnChange} />
      <PokemonList allPokemon={allPokemon} searchText={searchText} />
    </div>
  );
};

export default HomePage;
