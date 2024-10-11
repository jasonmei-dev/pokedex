import spinner from '../assets/pokeball-spinner.png';

const Spinner = () => {
  return (
    <div>
      <img src={spinner} alt="spinner" className="spin" style={{ width: '100px', zIndex: '1' }} />
    </div>
  );
};

export default Spinner;
