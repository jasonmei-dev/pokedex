import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import TypeTile from '../components/TypeTile';
import Modal from '../components/Modal';
import { parseEnglishText } from '../utils/helper';
import pokeball from '../assets/pokeball.png';
import '../styles/PokemonPage.css';
import axios from 'axios';

const PokemonPage = () => {
  const [genus, setGenus] = useState(null);
  const [flavorText, setFlavorText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAbility, setSelectedAblility] = useState(null);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const location = useLocation();
  const { id, dexNum, icon, image, name, types, weight, height, abilities, stats } = location.state || {};

  const handleShowModal = (abilityObj) => {
    setSelectedAblility(abilityObj);
  };

  const handleCloseModal = () => {
    setSelectedAblility(null);
  };

  const getSpeciesData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

      setGenus(parseEnglishText(res.data.genera)?.genus);
      setFlavorText(parseEnglishText(res.data.flavor_text_entries)?.flavor_text.trim().replace(/\s+/g, ' '));
    } catch (error) {
      console.log('Error fetching Pokemon species data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpeciesData();
  }, []);

  return (
    <div className="page-container">
      {loading ? (
        <Spinner />
      ) : (
        <div className="page">
          <i onClick={handleBack} className="fa-solid fa-arrow-left back-icon"></i>
          <div className="image-container">
            <img src={image} alt={name} />
          </div>
          <div className="info-container">
            <div className="header">
              <div className="icon-wrapper">
                <img src={icon} alt={name} className="icon" />
                <p style={{ color: 'black' }}>No. {dexNum}</p>
              </div>
              <p>{name}</p>
              <img src={pokeball} alt="pokeball" className="pokeball" style={{ filter: 'invert(1)', marginLeft: 'auto' }} />
            </div>

            <div className="genus-container">
              <p>{genus || 'Classification Unknown'}</p>
            </div>

            <div className="stats-container">
              <div className="stats-left">
                <p>Type</p>
                <p>Height</p>
                <p>Weight</p>
                <div className="ability-title">
                  <p>Abilities</p>
                </div>
              </div>

              <div className="stats-right">
                <div className="type-container">
                  {types.map((typeObj, i) => (
                    <TypeTile type={typeObj.type.name} key={i} />
                  ))}
                </div>
                <p>{height} m</p>
                <p>{weight} kg</p>
                <div className="ability-container">
                  {abilities.map((abilityObj, i) => (
                    <>
                      <p key={i} className="ability">
                        {abilityObj.ability.name}{' '}
                        <span>
                          <i onClick={() => handleShowModal(abilityObj)} className="fa-solid fa-circle-info info-icon"></i>
                        </span>
                      </p>
                      {selectedAbility === abilityObj && <Modal handleCloseModal={handleCloseModal} ability={abilityObj} />}
                    </>
                  ))}
                </div>
              </div>
            </div>

            <div className="flavor-text-container">
              <p>{flavorText || 'No Data Available'}</p>
            </div>

            <div className="base-stats-container">
              {stats.map((stat, i) => (
                <div key={i} className="base-stat">
                  {stat.stat.name === 'hp' ? <span className="stat-name">HP</span> : <span className="stat-name">{stat.stat.name}</span>}
                  <progress max="150" value={stat.base_stat.toString()}></progress>
                  <span className="stat-value">{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonPage;
