import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import pokeball from '../assets/pokeball.png';
import '../styles/PokemonPage.css';
import axios from 'axios';

const PokemonPage = () => {
  const [speciesData, setSpeciesData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const location = useLocation();
  const { id, dexNum, icon, image, name, types, weight, height, stats, statsName } = location.state || {};

  const getSpeciesData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

      setSpeciesData(res.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching Pokemon Species Data:', error);
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
              <p>{speciesData?.genera[7].genus}</p>
            </div>

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
            <div className="flavor-text-container">
              <p>{speciesData?.flavor_text_entries[0].flavor_text.trim().replace(/\s+/g, ' ')}</p>
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
        </div>
      )}
    </div>
  );
};

export default PokemonPage;
