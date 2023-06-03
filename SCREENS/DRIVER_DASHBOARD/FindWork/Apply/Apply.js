



import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, label, Pressable } from 'react-native';
import * as React from 'react';

/*Import for database */
import axios from 'axios';
import myip from '../../../../IP';



export default function CreateApply({route, navigation}){

   









        return(1);
}


const styles = StyleSheet.create({
    container:{
        marginTop:'-25%',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'grey',
    },
  })




const handleApplyClick = () => {

    const shouldExecute = window.confirm("Êtes-vous sûr de vouloir appliquer à cette offre ?");
  
    if (shouldExecute) {
      // Exécuter la requête Axios


    axios.post('http://' + myip +':80/link/driver/InsertApply.php', {
     
     IdDriver: IdDriver,
     IdOffer: IdOffer,
     Status: Status,

    })

    .then((response) => {
        console.log(response);
        alert("Insert Success");
        navigation.navigate("PostOffer");
    })
    
    .catch((error) => {
      console.error(error);
      alert("Echec Request"); 
    });  
} 



  };
  