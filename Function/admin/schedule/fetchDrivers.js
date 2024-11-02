import { configureAPI } from '../../../IP';

const fetchDrivers = async (setDrivers, setFiltredDriver) => {

  const  identreprise = 58;

  try {
    const api = await configureAPI(identreprise); 
    const response = await api.post('get_alldrivers.php');
    setDrivers(response.data);
    setFiltredDriver(response.data);

    console.log('Données de la réponse :', response.data);
    // Ici, vous pouvez traiter les données reçues

  } catch (error) {
    console.error('Error fetching drivers:', error);
  }
};

export default fetchDrivers;
