import { useState } from 'react';
import pokeball from '../assets/pokeball.png';
import '../styles/PokemonCard.css';

const PokemonCard = ({ id, image, name, type, weight, height, stats, statsName }) => {
  const [isShown, setIsShown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="card-container">
      {isShown && (
        <div className="show">
          <div className="stat-container-title">
            <img src={image} alt={name} className="image-title" />
            <p style={{ width: '180px', color: 'black' }}>No. {id}</p>
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
              <p>{type}</p>
              <p>{height} m</p>
              <p>{weight} kg</p>
            </div>
          </div>

          <div className="base-stats">
            <div>
              {statsName.map((statName, i) => (
                <p key={i} className="stats">
                  {statName}
                </p>
              ))}
            </div>

            <div>
              {stats.map((stat, i) => (
                <p key={i} className="stats">
                  {stat}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className="right"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        // onClick={handleShowModal}
      >
        <img src={image} alt={name} style={{ maxHeight: '50px', marginRight: '10px', width: '50px' }} />
        <p style={{ width: '270px' }}>No. {id}</p>
        <p>{name}</p>
        <img src={pokeball} alt="pokeball" style={{ marginLeft: 'auto', width: '40px' }} />
      </div>
      {/* {showModal && <Modal id={id} name={name} image={image} height={height} stats={stats} statsName={statsName} type={id} onClick={handleCloseModal} />} */}
    </div>
  );
};

export default PokemonCard;
