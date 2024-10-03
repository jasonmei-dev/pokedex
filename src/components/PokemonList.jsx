import { useRef, useEffect, useState } from 'react';
import Topbar from './Topbar';
import PokemonCard from './PokemonCard';
import '../styles/PokemonList.css';

const PokemonList = ({ allPokemon }) => {
  const [searchText, setSearchText] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollableDivRef = useRef(null);

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleScroll = () => {
    const scrollTop = scrollableDivRef.current.scrollTop;
    setScrollPosition(scrollTop);
  };

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;

    // Add event listner to Ref div
    if (scrollableDiv) {
      scrollableDiv.addEventListener('scroll', handleScroll);
    }
    // Cleanup function to remove event listener when component unmounts
    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const savedPosition = localStorage.getItem('scrollPosition');

    if (savedPosition && scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = parseInt(savedPosition, 10);
    }
  }, []);

  return (
    <div className="app-container">
      <Topbar handleOnChange={handleOnChange} />
      <div ref={scrollableDivRef} className="list-container">
        {allPokemon.map(
          (pokemon) =>
            pokemon.name.includes(searchText) && (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                dexNum={pokemon.id.toString().padStart(3, '0')}
                // icon={pokemon.sprites.versions['generation-viii'].icons.front_default}
                icon={pokemon.sprites.other.home.front_default}
                image={pokemon.sprites.other.home.front_default}
                name={pokemon.name.replace(/^./, (str) => str.toUpperCase())}
                types={pokemon.types}
                weight={Number(pokemon.weight / 10)}
                height={Number(pokemon.height / 10)}
                stats={pokemon.stats.map((stat) => stat.base_stat)}
                statsName={pokemon.stats.map((stat) => stat.stat.name)}
                scrollPosition={scrollPosition}
              />
            )
        )}
      </div>
    </div>
  );
};

export default PokemonList;
