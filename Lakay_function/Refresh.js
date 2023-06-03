import axios from 'axios';
import myip from '../IP';

export function fetchData(id) {
  return axios.post('http://' + myip + ':80/link/entreprise/SelectListOffer.php', {
    id_utilisateur: id
  });
}
