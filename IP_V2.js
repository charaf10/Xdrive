// IP.js
import axios from 'axios';

const myip = "localhost"; // Remplacez par votre adresse IP

// Configuration globale pour Axios
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction pour récupérer le nom de la base de données
export const getDatabaseName = async (identreprise) => {
  try {
    console.log("Réponse de getDatabaseName identreprise:", identreprise);

    // Effectuer la requête pour obtenir le nom de la base de données
    const response = await axios.get(`http://${myip}:80/link/entreprise/get_dbName.php`, {
      params: { identreprise }
    });

    console.log("Réponse de getDatabaseName:", response.data[0].dbName);
    return response.data[0].dbName; // Retourner le nom de la base de données
  } catch (error) {
    console.error("Erreur lors de la récupération du nom de la base de données:", error);
    return null;
  }
};

const getBaseURL = (dbName) => `http://${myip}:80/${dbName}/`;

// Exporter l'instance Axios pour une utilisation dans d'autres fichiers
export { api,getBaseURL };
 

