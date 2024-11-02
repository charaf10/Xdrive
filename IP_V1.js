/*
// Définissez `myip` et `mydbAPI` et exportez-les
const myip = "localhost";         // Remplacez par l'adresse IP réelle
const mydbAPI = "api_scheduleTest";         // Remplacez par le chemin ou l'API réelle

export { myip, mydbAPI };

*/

import {getDatabaseName} from './Function/admin/fun_admin'

// config.js
const myip = "localhost";

const getDatabaseConfig = async (entrepriseId) => {
    // Utilise la fonction `getDatabaseName` pour obtenir le nom de la base de données
    const dbName = await getDatabaseName(entrepriseId);
    return {
        myip,
        mydbAPI: dbName || "default_db", // Utilise une base par défaut si nécessaire
    };
};

export { myip, getDatabaseConfig };



