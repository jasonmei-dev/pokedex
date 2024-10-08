import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pokeball from '../assets/pokeball.png';
import '../styles/PokemonCard.css';

const PokemonCard = ({ id, dexNum, icon, image, name, types, weight, height, stats, statsName, scrollPosition }) => {
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = () => {
    localStorage.setItem('scrollPosition', scrollPosition);

    navigate(`/pokemon/${id}`, { state: { id, dexNum, icon, image, name, types, weight, height, stats, statsName } });
  };

  return (
    <div className="card-container">
      {showPreview && (
        <div className="preview">
          <div className="preview-header">
            <img src={icon} alt={name} className="preview-icon" />
            <p style={{ width: '180px', color: 'black' }}>No. {dexNum}</p>
            <p>{name}</p>
            <img src={pokeball} alt="pokeball" className="preview-pokeball" />
          </div>

          <img src={image} alt={name} />

          <div className="stats-container">
            <div className="stats-left">
              <p>Type</p>
              <p>Height</p>
              <p>Weight</p>
            </div>

            <div className="stats-right">
              {types.length > 1 ? (
                <p style={{ textTransform: 'capitalize' }}>
                  {types[0].type.name} / {types[1].type.name}
                </p>
              ) : (
                <p style={{ textTransform: 'capitalize' }}>{types[0].type.name}</p>
              )}
              <p>{height} m</p>
              <p>{weight} kg</p>
            </div>
          </div>
        </div>
      )}

      <div className="card" onClick={handleCardClick} onMouseEnter={() => setShowPreview(true)} onMouseLeave={() => setShowPreview(false)}>
        <div className="icon-wrapper">
          <img src={icon} alt={name} className="card-icon" />
          <p>No. {dexNum}</p>
        </div>
        <div style={{ width: '30%' }}>
          <p>{name}</p>
        </div>
        <div style={{ width: '20%', textAlign: 'right' }}>
          <img src={pokeball} alt="pokeball" className="card-pokeball" />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
