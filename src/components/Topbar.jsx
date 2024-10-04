import '../styles/Topbar.css';

const Topbar = ({ handleOnChange }) => {
  return (
    <div className="topbar">
      <p>Pokédex</p>
      <input onChange={handleOnChange} type="text" name="text" placeholder="Search By Name" />
    </div>
  );
};

export default Topbar;
