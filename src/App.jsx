import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PokemonPage from './pages/PokemonPage';
import axios from 'axios';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllPokemon = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=905');

      const results = res.data.results;

      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          return res.data;
        })
      );

      setAllPokemon(pokemonData);
      setLoading(false);
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
        <Route path="/" element={<HomePage allPokemon={allPokemon} loading={loading} />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
