import axios from 'axios';
import {mydbAPI, myip} from '../IP';

export function fetchListProfil(id) {
  return axios.post('http://' + myip + ':80/link/driver/SelectListProfil.php', {
    id: id
  });
}
