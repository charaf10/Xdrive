import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import axios from 'axios'; // Pas besoin de { all }
import myip from '../../../IP';
import { updateCycle } from '../../../Function/admin/fun_admin';
import { deleteCycle } from '../../../Function/admin/fun_admin';
//import { ValidateTimeOut } from '../../../Function/fun_home'; // Importez la fonction depuis le fichier api.js
//import { validateName } from '../../../Function/fun_home'; // Importez la fonction depuis le fichier api.js

const DriverDetailPage = (cycle) => {
  // Suppose que route.params contient les données du cycle

  console.log('cycle object:', JSON.stringify(cycle.Cycle, null, 2));

  if (!cycle || !cycle.Cycle) {
    // Ajoutez ici la logique pour traiter le cas où driver ou driver.driver est undefined
    return null;
  }

  const {
    TemplateId,
    Name,
    Description,
    TimeIn,
    TimeOut,
    Color,
 
  } = cycle.Cycle;

  const [isEditing, setIsEditing] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  const [editedData, setEditedData] = useState({
    //TemplateId,
    Name,
    Description,
    Color,
    TimeIn,
    TimeOut,

  });

  useEffect(() => {
    // Mettez à jour les données éditées chaque fois que le cycle change
    setEditedData(cycle.Cycle);
  }, [cycle.Cycle]);


  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleCancelPress = () => {
    setIsEditing(false);
  };

  const handleSavePress = async () => {

      try {
    /*  if (!editedData.Name || !editedData.Description || editedData.Color || editedData.TimeIn || !editedData.TimeOut) {
        //console.log('Veuillez remplir tous les champs.');
        alert("La structure n'est pas validae");
        return;
      }*/

      //console.log("iddriver: => " + TemplateId)

      const response = await updateCycle(
        TemplateId,
        editedData.Name,
        editedData.Description,
        editedData.Color,
        editedData.TimeIn,
        editedData.TimeOut,

      );
      if (response) {
        //console.log('Le cycle a été mis à jour avec succès.');
        // Réinitialisation des champs après le update
        setEditedData({
          //TemplateId,
          //AccountId,
          Name: editedData.Name,
          Description: editedData.Description,
          Color: editedData.Color,
          TimeIn: editedData.TimeIn,
          TimeOut: editedData.TimeOut,
        }); 
        alert("Le cycle " + response.data[0].Message + " a été mis à jour avec succès. ");

      } else {
        console.log('Erreur lors de la mise à jour du cycle :', response.error);
      }
    } catch (error) {
      console.log('Une erreur est survenue lors de la mise à jour du cycle :', error);
    }


    setIsEditing(false);
  };


  const handleDelete = async() => {
    try {

      console.log("handleDelete "+TemplateId);
      const response = await deleteCycle(
        TemplateId,

      );
      if (response) {
        setDeletedId(TemplateId); 
        alert("Le cycle " + TemplateId + " a été supprimer avec succès. ");

      } else {
        console.log('Erreur lors de la suppression du cycle :', response.error);
      }
    } catch (error) {
      console.log('Une erreur est survenue lors de la suppression du cycle :', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails du cycle</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Template ID:</Text>
        <Text style={styles.value}>{TemplateId}</Text>
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
          <TouchableOpacity style={styles.button} onPress={handleSavePress}><Text style={styles.buttontxt}>Enregistrer </Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancelPress}><Text style={styles.buttontxt}>Cancel</Text></TouchableOpacity>
        </View>
      ) : (
        <View style={styles.containerTouchable}>
          <TouchableOpacity style={styles.button} onPress={handleEditPress}><Text style={styles.buttontxt}>Update</Text></TouchableOpacity> 
          <TouchableOpacity style={styles.button} onPress={handleDelete}><Text style={styles.buttontxt}>Delete</Text></TouchableOpacity> 
        </View>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 16,
    //backgroundColor:'#B4A289',
    borderRadius:10,
    borderColor:'black',
    borderWidth:1,
    borderRadius:10,
    width:'70%',
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
    height:40,
    textAlign:'center',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    margin:3,
    borderRadius:10,
  },

  buttontxt : {
  },

  buttonSave : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    borderColor:'black',
    borderWidth:1,
    textAlign:'center',
    borderRadius:5,    
    color:'red',

  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    //width: '50%',
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