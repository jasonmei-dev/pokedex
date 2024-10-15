import { useRef, useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import '../styles/PokemonList.css';

const PokemonList = ({ allPokemon, searchText }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollableDivRef = useRef(null);

  const validDashedNames = [
    'f',
    'm',
    'mime',
    'oh',
    'jr',
    'z',
    'null',
    'o',
    'koko',
    'lele',
    'bulu',
    'fini',
    'rime',
    'tusk',
    'tail',
    'bonnet',
    'mane',
    'wing',
    'shocks',
    'treads',
    'bundle',
    'hands',
    'jugulis',
    'moth',
    'thorns',
    'chien',
    'pao',
    'lu',
    'yu',
    'moon',
    'valiant',
    'wake',
    'leaves',
    'fire',
    'bolt',
    'boulder',
    'crown',
  ];

  const checkName = (name) => {
    if (name.includes('-')) {
      const nameArray = name.split('-');

      if (validDashedNames.includes(nameArray[1])) {
        return name;
      } else {
        return nameArray[0];
      }
    }
    return name;
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
    <div ref={scrollableDivRef} className="list-container">
      {allPokemon
        .filter((pokemon) => {
          const nameMatches = checkName(pokemon.name).toLowerCase().includes(searchText.toLowerCase());
          const idMatches = pokemon.id.toString().includes(searchText);
          return nameMatches || idMatches;
        })
        .map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            dexNum={pokemon.id.toString().padStart(3, '0')}
            icon={pokemon.sprites.other['official-artwork'].front_default}
            image={pokemon.sprites.other.home.front_default}
            name={checkName(pokemon.name).replace(/^./, (str) => str.toUpperCase())}
            types={pokemon.types}
            weight={Number(pokemon.weight / 10)}
            height={Number(pokemon.height / 10)}
            stats={pokemon.stats}
            scrollPosition={scrollPosition}
          />
        ))}
    </div>
  );
};

export default PokemonList;
