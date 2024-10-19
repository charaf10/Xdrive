const handleSearch = (searchText, drivers, setFiltredDriver, fetchAllDrivers) => {
    if (searchText) {
      const filtered = drivers.filter(item =>
        item.Firstname.includes(searchText) || item.Lastname.includes(searchText));
      setFiltredDriver(filtered);
    } else {
      fetchAllDrivers();
    }
  };
  
  export default handleSearch;
  