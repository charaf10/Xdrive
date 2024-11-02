// IP.js
import axios from 'axios';

const myip = "localhost"; // Remplacez par votre adresse IP

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

// Fonction pour créer une instance Axios avec la base URL configurée dynamiquement
export const configureAPI = async (identreprise) => {
  const dbName = await getDatabaseName(identreprise);
  if (!dbName) {
    throw new Error('Impossible de récupérer le nom de la base de données');
  }

  // Créez une instance Axios avec la base URL configurée
  return axios.create({
    baseURL: `http://${myip}:80/${dbName}/`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Exportez myip pour une éventuelle utilisation ailleurs si nécessaire
export { myip };
