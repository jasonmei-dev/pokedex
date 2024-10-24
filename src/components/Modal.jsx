import { useState, useEffect, useRef } from 'react';
import Spinner from './Spinner';
import { parseEnglishAbility } from '../utils/helper';
import '../styles/Modal.css';
import axios from 'axios';

const Modal = ({ handleCloseModal, abilityObj }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const modalRef = useRef();

  const handleOutsideClick = (e) => {
    if (modalRef.current === e.target) {
      handleCloseModal();
    }
  };

  const getAbilityDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(abilityObj.ability.url);
      const englishDescription = parseEnglishAbility(res.data.flavor_text_entries)?.flavor_text;

      setDescription(englishDescription);
    } catch (error) {
      console.log('Error fetching ability data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAbilityDetails();
  }, []);

  return (
    <div className="modal-container" ref={modalRef} onClick={handleOutsideClick}>
      {loading ? (
        <Spinner />
      ) : (
        <div className="modal-content">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default Modal;
