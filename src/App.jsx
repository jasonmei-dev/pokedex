import { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import axios from 'axios';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);

  const getAllPokemon = async () => {
    try {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151');

      const results = res.data.results;

      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );

      setAllPokemon(pokemonData);
    } catch (error) {
      console.log('Error fetching Pokemon:', error);
    }
  };

  useEffect(() => {
    getAllPokemon();
  }, []);

  return (
    <>
      <PokemonList allPokemon={allPokemon} />
    </>
  );
}

export default App;
