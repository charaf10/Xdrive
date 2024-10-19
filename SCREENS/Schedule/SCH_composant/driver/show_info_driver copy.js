import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import axios from 'axios'; // Pas besoin de { all }
import myip from '../../../../IP';
import { updateDriver } from '../../../Function/admin/fun_admin';
import { deleteDriver } from '../../../Function/admin/fun_admin';
import { ValidateEmail } from '../../../Function/fun_home'; // Importez la fonction depuis le fichier api.js
import { validatePhoneNumber } from '../../../Function/fun_home'; // Importez la fonction depuis le fichier api.js

const DriverDetailPage = (driver) => {
  // Suppose que route.params contient les données du conducteur

  //console.log("log de show_info_driver : " + driver.driver.Firstname);

  if (!driver || !driver.driver) {
    // Ajoutez ici la logique pour traiter le cas où driver ou driver.driver est undefined
    return null;
  }

  const {
    DriverId, AccountId, PhoneNumber, Firstname, 
    Lastname, Email, DateCreate, DivisionId,
  } = driver.driver;

  const [isEditing, setIsEditing] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  const [editedData, setEditedData] = useState({
    //DriverId,
    //AccountId,
    PhoneNumber,
    Firstname,
    Lastname,
    Email,
    //DateCreate,
    DivisionId,
  });


  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleCancelPress = () => {
    setIsEditing(false);
  };

  const handleSavePress = async () => {

      try {
      if (!editedData.Firstname || !editedData.Lastname || !validatePhoneNumber(editedData.PhoneNumber) || !ValidateEmail(editedData.Email) || !editedData.DivisionId) {
        //console.log('Veuillez remplir tous les champs.');
        alert("La structure n'est pas valide");
        return;
      }

      //console.log("iddriver: => " + DriverId)

      const response = await updateDriver(
        DriverId,
        editedData.Firstname,
        editedData.Lastname,
        editedData.Email,
        editedData.PhoneNumber,
        editedData.DivisionId
      );
      if (response) {
        //console.log('Le conducteur a été mis à jour avec succès.');
        // Réinitialisation des champs après le update
        setEditedData({
          //DriverId,
          //AccountId,
          PhoneNumber: editedData.PhoneNumber,
          Firstname: editedData.Firstname,
          Lastname: editedData.Lastname,
          Email: editedData.Email,
          //DateCreate,
          DivisionId: editedData.DivisionId,
        }); 
        alert("Le conducteur " + response.data[0].Message + " a été mis à jour avec succès. ");

      } else {
        console.log('Erreur lors de la mise à jour du conducteur :', response.error);
      }
    } catch (error) {
      console.log('Une erreur est survenue lors de la mise à jour du conducteurq :', error);
    }


    setIsEditing(false);
  };


  const handleDelete = async() => {
    try {

      console.log("handleDelete "+DriverId);
      const response = await deleteDriver(
        DriverId,

      );
      if (response) {
        setDeletedId(DriverId); 
        alert("Le conducteur " + DriverId + " a été supprimer avec succès. ");

      } else {
        console.log('Erreur lors de la suppression du conducteur :', response.error);
      }
    } catch (error) {
      console.log('Une erreur est survenue lors de la suppression du conducteur :', error);
    }
  };

/*
  const handleDelete = () => {
    console.log("delete: " + DriverId);

    axios.post('http://' + myip + ':80/api_schedule/admin/DeleteDriver.php', { Id: DriverId })
      .then(response => {
        alert("Le driver a été supprimer " + response.data[0].Message);
      })
      .catch(error => {
        console.error(error);
      });

  };
*/


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails du Chauffeur</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Driver ID:</Text>
        <Text style={styles.value}>{DriverId}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Account ID:</Text>
        <Text style={styles.value}>{AccountId}</Text>
      </View>

      <View style={styles.detailContainer}>
        <hr/><hr/><hr/>
      </View>


      {Object.keys(editedData).map((key) => (
        <View key={key} style={styles.detailContainer}>
          <Text style={styles.label}>{key}: </Text>
          {isEditing ? (

            <TextInput
              style={styles.input}
              value={editedData[key]}
              onChangeText={(text) =>
                setEditedData((prevData) => ({ ...prevData, [key]: text }))
              }
              readOnly={false}
              onPress={console.log("log dans <textinput> : ")}
            />
          ) : (
            <Text style={styles.value}>{editedData[key]}</Text>
          )}

        </View> 
      ))}

      {isEditing ? (
        <View style={styles.containerTouchable}>
          <TouchableOpacity style={styles.button} onPress={handleSavePress}><Text>Enregistrer</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancelPress}><Text>Cancel</Text></TouchableOpacity>
        </View>
      ) : (
        <View style={styles.containerTouchable}>
          <TouchableOpacity style={styles.button} onPress={handleEditPress}><Text>Update</Text></TouchableOpacity> 
          <TouchableOpacity style={styles.button} onPress={handleDelete}><Text>Delete</Text></TouchableOpacity> 
        </View>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  containerSaveTouchable: {
    flex: 1,
    padding: 16,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailContainer : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  containerTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  button : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    width: 80,
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:1,
    color:'black',
    height:40,
    textAlign:'center',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    margin:3,
    borderRadius:10,
  },

  buttonSave : {

    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    borderColor:'black',
    borderWidth:1,
    color:'black',
    textAlign:'center',
    borderRadius:5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '50%',
  },

  input: {
    fontSize: 16,
    width: '35%',
    backgroundColor: 'white',
  },
  value: {
    fontSize: 16,
  },

});

export default DriverDetailPage;
