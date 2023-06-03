import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, label, Pressable } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';

/*Import for database */
import axios from 'axios';
//import myip from '../../../../IP';

import { insert_data } from '../../../Lakay_function/Insert';
import Com_select_vehicule from '../../../COMPONENTS/COM_UTILS/SELECT/select_name_vehicule';
import Com_select_shift from '../../../COMPONENTS/COM_UTILS/SELECT/select_name_shift';



export default function CreateProfil({route, navigation}){


    const {id} = route.params;
    const [data, setData] = useState([]);
    const [tableName, setTablename] = useState("profil_driver");
    const [selectedVehiculeValue, setSelectedVehiculeValue] = useState('');
    const [selectedShiftValue, setSelectedShiftValue] = useState('');



    const data_profil = {
        idDriver: id,
        nameVehicule: selectedVehiculeValue,
        nameShiftType: selectedShiftValue,
        location: "location",
        rayon: "rayon",
        
      };
    

      const Insert_profil = () => {
        insert_data(tableName, data_profil)
          .then(response => {
            console.log(response); // Utilisez console.log pour afficher le résultat ou un message de succès
            //navigation.navigate("Profil", {id: id});

        })
          .catch(error => {
            console.error(error);
          });


      };

      const handleSelectVehicule = value => {
        setSelectedVehiculeValue(value);

      };
      const handleSelectShift = value => {
        setSelectedShiftValue(value);

      };

      
        useEffect(() => {
          console.log(selectedVehiculeValue);
        }, [selectedVehiculeValue]);
        
        useEffect(() => {
          console.log(selectedShiftValue);
        }, [selectedShiftValue]);

    let leRetour = 
        <View style={styles.container}>
            <Text> Create profil</Text>

              <Com_select_vehicule selectedValue={selectedVehiculeValue} onChange={handleSelectVehicule}/>
              <br/>
              <Com_select_shift selectedValue={selectedShiftValue} onChange={handleSelectShift}/>
              <br/>


                    <Pressable onPress={Insert_profil}>

                        <Text>Press here</Text>

                    </Pressable>   
        </View>

        return([leRetour]);
}


const CALL_CreateProfil = () => {
    alert("Create Profil Clicked!")
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
