import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PokemonPage from './pages/PokemonPage';
import axios from 'axios';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [offset, setOffset] = useState(0);
  // const [hasMore, setHasMore] = useState(true);

  // const LIMIT = 20;

  // const getPokemonData = async () => {
  //   if (loading || !hasMore) return;
  //   setLoading(true);

  //   try {
  //     const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}&offset=${offset}`);

  //     const results = res.data.results;

  //     const pokemonData = await Promise.all(
  //       results.map(async (pokemon) => {
  //         const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
  //         return res.data;
  //       })
  //     );

  //     setAllPokemon([...allPokemon, ...pokemonData]); // Append new data to the existing list
  //     setOffset(offset + LIMIT); // Increment the offset for the next API call

  //     // If there are no more Pokémon, stop further API calls
  //     if (res.data.next === null) {
  //       setHasMore(false);
  //     }
  //   } catch (error) {
  //     console.log('Error fetching Pokémon data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getAllPokemon = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1025');
      const results = res.data.results;
      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          return res.data;
        })
      );

      setAllPokemon(pokemonData);
    } catch (error) {
      console.log('Error fetching Pokemon data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Detect when user scrolls to the bottom of the page
  // const handleScroll = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading) {
  //     getPokemonData();
  //   }
  // };

  useEffect(() => {
    getAllPokemon();
    // getPokemonData();

    // // Attach scroll event listener to the window
    // window.addEventListener('scroll', handleScroll);

    // // Cleanup the event listener on unmount
    // return () => window.removeEventListener('scroll', handleScroll);
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
