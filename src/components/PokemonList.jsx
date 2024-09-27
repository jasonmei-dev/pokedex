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
              icon={pokemon.sprites.versions['generation-viii'].icons.front_default}
              image={pokemon.sprites.other.home.front_default}
              name={pokemon.name.replace(/^./, (str) => str.toUpperCase())}
              types={pokemon.types}
              weight={Number(pokemon.weight / 10)}
              height={Number(pokemon.height / 10)}
              stats={pokemon.stats.map((stat) => stat.base_stat).slice(0, 3)}
              statsName={pokemon.stats.map((stat) => stat.stat.name).slice(0, 3)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
