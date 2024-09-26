import { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import axios from 'axios';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);

  const getAllPokemon = async () => {
    setAllPokemon([]);
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151');

    const results = res.data.results;

    const createPokemonObjects = (pokemonData) => {
      pokemonData.forEach(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        const data = res.data;

        setAllPokemon((allPokemon) => [...allPokemon, data]);
      });
    };

    // setAllPokemon(results.map((pokemon) => pokemon.name));
    createPokemonObjects(results);
    console.log('All Pokemon:', allPokemon);
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
