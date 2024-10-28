import axios from 'axios';
import {mydbAPI, myip} from '../IP';

export function fetchData(id) {
  return axios.post('http://' + myip + ':80/link/entreprise/SelectListOffer.php', {
    id_utilisateur: id
  });
}

export function fetchApply(id) {
  console.log("hereeeeee");
  
  return axios.post('http://' + myip + ':80/link/entreprise/SelectListApply.php', {
    id: id
  });
}