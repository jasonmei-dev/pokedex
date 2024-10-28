import '../styles/Topbar.css';

const Topbar = ({ handleOnChange, searchText, clearSearch }) => {
  return (
    <div className="topbar">
      <h1>Pokédex</h1>
      <div className="search-wrapper">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input onChange={handleOnChange} value={searchText} type="text" id="search-input" placeholder="Search" />
        {searchText && <i onClick={clearSearch} className="fa-solid fa-xmark"></i>}
      </div>
    </div>
  );
};

export default Topbar;
