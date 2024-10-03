import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pokeball from '../assets/pokeball.png';
import '../styles/PokemonCard.css';

const PokemonCard = ({ id, dexNum, icon, image, name, types, weight, height, stats, statsName, scrollPosition }) => {
  const [isShown, setIsShown] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = () => {
    localStorage.setItem('scrollPosition', scrollPosition);

    navigate(`/pokemon/${id}`, { state: { id, dexNum, icon, image, name, types, weight, height, stats, statsName } });
  };

  return (
    <div className="card-container">
      {isShown && (
        <div className="show">
          <div className="stat-container-title">
            <img src={icon} alt={name} className="image-title" />
            <p style={{ width: '180px', color: 'black' }}>No. {dexNum}</p>
            <p>{name}</p>
            <img src={pokeball} alt="pokeball" className="pokeball-title" />
          </div>

          <img src={image} alt={name} />

          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ background: '#dbdbd9', textAlign: 'center' }} className="stats-left">
              <p>Type</p>
              <p>Height</p>
              <p>Weight</p>
            </div>

            <div style={{ background: '#fff' }} className="stats-right">
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

      <div className="right" onClick={handleCardClick} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
        <img src={icon} alt={name} style={{ maxHeight: '40px', marginRight: '10px', width: '40px' }} />
        <p style={{ width: '270px' }}>No. {dexNum}</p>
        <p>{name}</p>
        <img src={pokeball} alt="pokeball" style={{ marginLeft: 'auto', width: '30px' }} />
      </div>
    </div>
  );
};

export default PokemonCard;
