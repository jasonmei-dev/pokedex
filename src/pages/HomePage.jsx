import { useState } from 'react';
import Topbar from '../components/Topbar';
import PokemonList from '../components/PokemonList';

const HomePage = ({ allPokemon }) => {
  const [searchText, setSearchText] = useState('');

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    console.log('clear button clicked');
    setSearchText('');
  };

  return (
    <div className="app-container">
      <Topbar handleOnChange={handleOnChange} searchText={searchText} clearSearch={clearSearch} />
      <PokemonList allPokemon={allPokemon} searchText={searchText} />
    </div>
  );
};

export default HomePage;
