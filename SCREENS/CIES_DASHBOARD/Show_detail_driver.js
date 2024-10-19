import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
/*Outils */
import axios from 'axios';
import myip from '../../IP';

import DriverProfile from './Driver';



 
import SayHello from '../../COMPONENTS/COM_VIEWS/SayHello';




export default function Details_driver(worker) {
 
  //const { id } = route.params;
  const id  = worker;
  
  const [data, setData] = useState([]);


  
  useEffect(() => {
    // Récupérer les données de votre base de données
    axios.post('http://' + myip +':80/link/entreprise/SelectDriver.php', {id:id})
      .then(response => {
        //setData(response.data);
        console.log("xx : " + response.data);
        
        const transformedData = response.data.map(item => ({
          id: item.IdDriver,
          firstname: item.FirstName,
          lastname: item.lastname,
          email: item.email,
          phone: item.phone,
          adress: item.address,

          }));
        setData(transformedData[0]);

        console.log(data.FirstName);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);


    const separe = <br/>


    useEffect(() => {
        // Cette fonction sera exécutée après que la valeur de count ait été mise à jour
        console.log('La valeur de count a été mise à jour :', data);


       
      }, [data]);


  return (
    <View>
      <Text><h1>details driver Screen</h1> </Text>
        <SayHello id={id}> </SayHello>

        <DriverProfile driver={data} />


    </View>
  );
}