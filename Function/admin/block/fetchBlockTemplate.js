import axios from 'axios';
//import myip from '../../../IP';
//import mydbAPI from '../../../IP';
//import { myip, mydbAPI } from "../../../IP"; // Importez avec les accolades
import { configureAPI  } from '../../../IP';

const fetchBlockTemplate = async (setBlockTemplates) => {
  const  identreprise = 58;

  try {
    const api = await configureAPI(identreprise); 
    const response = await api.post('get_all_blocktemplate.php');
    setBlockTemplates(response.data);

    console.log('Données de la réponse :', response.data);
    // Ici, vous pouvez traiter les données reçues

  } catch (error) {
    console.error('Erreur lors de la récupération des cycles :', error);
  }

};

export default fetchBlockTemplate;
