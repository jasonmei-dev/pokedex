import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import '../styles/PokemonList.css';

const PokemonList = ({ allPokemon }) => {
  // const [pokemonObjects, setPokemonObjects] = useState([]);

  // const createPokemonObjects = () => {
  //   setPokemonObjects([]);

  //   allPokemon.forEach(async (pokemon) => {
  //     const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  //     const pokemonData = res.data;
  //     // console.log(pokemonData);
  //     setPokemonObjects((currentList) => [...currentList, pokemonData]);
  //   });
  //   pokemonObjects.sort((a, b) => a.id - b.id);
  //   console.log('Pokemon Objects:', pokemonObjects);
  // };

  // useEffect(() => {
  //   createPokemonObjects();
  // }, [allPokemon]);

  return (
    <div className="app-container">
      <h1>Pokemon List</h1>
      {allPokemon.map((pokemon) => (
        <p key={pokemon.id}>
          {pokemon.id} {pokemon.name}
        </p>
      ))}
    </div>
  );
};

export default PokemonList;
