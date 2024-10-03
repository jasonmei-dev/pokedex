import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonPage from './components/PokemonPage';
import axios from 'axios';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);

  const getAllPokemon = async () => {
    try {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=493');

      const results = res.data.results;

      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          return res.data;
        })
      );

      setAllPokemon(pokemonData);
    } catch (error) {
      console.log('Error fetching Pokemon Data:', error);
    }
  };

  useEffect(() => {
    getAllPokemon();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList allPokemon={allPokemon} />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
