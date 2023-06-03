import axios from 'axios';
import myip from '../IP';







export function insert_data(tableName, data, navigation) {
  const url = 'http://' + myip +':80/link/driver/InsertProfil.php'; // Remplacez par votre URL d'insertion

  const requestData = {
    tableName: tableName,
    data: data
  };

  axios.post(url, requestData)
  .then(response => {
    console.log(response); // Utilisez console.log pour afficher le résultat ou un message de succès

  })
  .catch(error => {
    console.error(error);
  });
}
