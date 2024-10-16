import { pokemonTypeColors } from '../utils/helper';

const TypeTile = ({ type }) => {
  return (
    <div className="type-tile" style={{ backgroundColor: pokemonTypeColors?.[type] }}>
      <p>{type}</p>
    </div>
  );
};

export default TypeTile;
