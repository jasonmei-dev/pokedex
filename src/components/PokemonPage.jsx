import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import pokeball from '../assets/pokeball.png';
import '../styles/PokemonCard.css';
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
    } catch (error) {
      console.log('Error fetching Pokemon Species Data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpeciesData();
  }, [id]);

  return (
    <div className="show">
      {loading ? (
        <div>Loading... </div>
      ) : (
        <div className="show">
          <div onClick={handleBack}>Back</div>
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

          <div className="flavor-text">
            <p>{speciesData?.genera[7].genus}</p>
            {/* Account for misordered data for Nidorino and Zubat flavor text from PokeAPI */}
            {id !== 33 && id !== 41 ? <p>{speciesData?.flavor_text_entries[0].flavor_text}</p> : <p>{speciesData?.flavor_text_entries[2].flavor_text}</p>}
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
    </div>
  );
};

export default PokemonPage;
