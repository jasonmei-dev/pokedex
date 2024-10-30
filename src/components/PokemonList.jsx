import { useRef, useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import { checkName } from '../utils/helper';
import '../styles/PokemonList.css';

const PokemonList = ({ allPokemon, searchText }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollableDivRef = useRef(null);

  const handleScroll = () => {
    const scrollTop = scrollableDivRef.current.scrollTop;
    setScrollPosition(scrollTop);

    // Show the "Back to Top" button when scrolled down more than 200px
    setShowBackToTop(scrollTop > 200);
  };

  const scrollToTop = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
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
    // Retrieve saved position on load (if it exists) or reset it to 0
    const savedPosition = sessionStorage.getItem('scrollPosition');

    if (savedPosition && scrollableDivRef.current) {
      // Reset scroll position to 0 if there's no saved position
      scrollableDivRef.current.scrollTop = savedPosition ? parseInt(savedPosition, 10) : 0;
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
            abilities={pokemon.abilities}
            stats={pokemon.stats}
            scrollPosition={scrollPosition}
          />
        ))}
      {showBackToTop && <i onClick={scrollToTop} className="fa-solid fa-chevron-up back-to-top"></i>}
    </div>
  );
};

export default PokemonList;
