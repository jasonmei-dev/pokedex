import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TypeTile from './TypeTile';
import pokeball from '../assets/pokeball.png';
import '../styles/PokemonCard.css';

const PokemonCard = ({ id, dexNum, icon, image, name, types, weight, height, abilities, stats, scrollPosition }) => {
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = () => {
    localStorage.setItem('scrollPosition', scrollPosition);

    navigate(`/pokemon/${id}`, { state: { id, dexNum, icon, image, name, types, weight, height, abilities, stats } });
  };

  return (
    <div className="card-container">
      {showPreview && (
        <div className="preview">
          <div className="preview-header">
            <div className="icon-wrapper">
              <img src={icon} alt={name} className="icon" />
              <p style={{ color: 'black' }}>No. {dexNum}</p>
            </div>
            <p>{name}</p>
            <img src={pokeball} alt="pokeball" className="pokeball" style={{ filter: 'invert(1)', marginLeft: 'auto' }} />
          </div>

          <img src={image} alt={name} />

          <div className="stats-container">
            <div className="stats-left">
              <p>Type</p>
              <p>Height</p>
              <p>Weight</p>
            </div>

            <div className="stats-right">
              <div className="type-container">
                {types.map((type, i) => (
                  <TypeTile type={type.type.name} key={i} />
                ))}
              </div>
              <p>{height} m</p>
              <p>{weight} kg</p>
            </div>
          </div>
        </div>
      )}

      <div className="card" onClick={handleCardClick} onMouseEnter={() => setShowPreview(true)} onMouseLeave={() => setShowPreview(false)}>
        <div className="icon-wrapper">
          <img src={icon} alt={name} className="icon" />
          <p>No. {dexNum}</p>
        </div>
        <div className="name-wrapper">
          <p>{name}</p>
        </div>
        <div style={{ width: '20%', display: 'flex', justifyContent: 'end' }}>
          <img src={pokeball} alt="pokeball" className="pokeball" />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
