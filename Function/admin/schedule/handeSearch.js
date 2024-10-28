import axios from 'axios';
import myip from '../../../IP';

const handeSearch = async (searchText, drivers, setFiltredDriver, fetchDrivers) => {
  if (searchText) {
    const filtred = drivers.filter(item => item.Firstname.includes(searchText) || item.Lastname.includes(searchText));
    setFiltredDriver(filtred);
  } else {
    await fetchDrivers();
  }
};

export default handeSearch;
