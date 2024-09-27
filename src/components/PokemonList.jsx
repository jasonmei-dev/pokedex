import PokemonCard from './PokemonCard';
import '../styles/PokemonList.css';

const PokemonList = ({ allPokemon }) => {
  return (
    <div className="app-container">
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id.toString().padStart(3, '0')}
              image={pokemon.sprites.other.home.front_default}
              name={pokemon.name.replace(/^./, (str) => str.toUpperCase())}
              type={pokemon.types[0].type.name}
              weight={pokemon.weight}
              height={pokemon.height}
              stats={pokemon.stats.map((stat) => stat.base_stat).slice(0, 3)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
