import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { parseEnglishAbility } from '../utils/helper';
import axios from 'axios';

const Modal = ({ handleCloseModal, ability }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const getAbilityDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(ability.ability.url);

      setDescription(parseEnglishAbility(res.data.flavor_text_entries)?.flavor_text);
    } catch (error) {
      console.log('Error fetching ability data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAbilityDetails();
  }, [ability]);

  return <div className="modal-container">{loading ? <Spinner /> : <p>{description}</p>}</div>;
};

export default Modal;
