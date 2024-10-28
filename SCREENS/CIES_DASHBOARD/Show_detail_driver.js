import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {myip, mydbAPI} from '../../IP';
import DriverProfile from './Driver';
import SayHello from '../../COMPONENTS/COM_VIEWS/SayHello';
import { useRoute } from '@react-navigation/native'; // Importer useRoute

export default function ShowInfoDriver({route, navigation }) {
   // const route = useRoute(); // Récupérer les paramètres de la route
    const { id } = route.params; // Extraire l'ID du chauffeur
    const [data, setData] = useState([]);

    useEffect(() => {
        // Récupérer les données de votre base de données
        axios.post(`http://${myip}:80/link/entreprise/SelectDriver.php`, { id: id })
            .then(response => {
                console.log("Données : ", response.data);
                const transformedData = response.data.map(item => ({
                    id: item.IdDriver,
                    firstname: item.FirstName,
                    lastname: item.LastName, // Assurez-vous que la propriété est correcte
                    email: item.Email, // Assurez-vous que la propriété est correcte
                    phone: item.Phone, // Assurez-vous que la propriété est correcte
                    address: item.Address, // Assurez-vous que la propriété est correcte
                }));
                setData(transformedData[0]);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    return (
        <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Détails du Chauffeur</Text>
            <SayHello id={id} />
            <DriverProfile driver={data} />
        </View>
    );
}
