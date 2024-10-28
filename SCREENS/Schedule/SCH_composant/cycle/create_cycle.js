import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
//import { ColorPicker } from 'react-native-color-picker';

import { createCycle } from '../../../Function/admin/fun_admin';
//import { createCycle1 } from '../../../../f';

const CreateCyclePage = () => {
  const [generatedTemplateId, setGeneratedTemplateId] = useState('');
  const [name1, setname1] = useState('');
  const [Description, setDescription] = useState('');
  const [Color, setColor] = useState(''); // Initial color is black
  const [TimeIn, setTimeIn] = useState('');
  const [TimeOut, setTimeOut] = useState('');






  const handleSubmit = () => {
    // Send the form data to your server or handle it as needed
    handleCreateCycle();
    console.log({
      generatedTemplateId,
      name1,
      Description,
      Color,
      TimeIn,
      TimeOut,
    });
  };






const handleCreateCycle = async () => {

  //console.log(" handleCreateCycle clicked " + name1);
  try {
    // Vérifiez si tous les champs sont remplis


    if (!name1 || !Description || !Color || !TimeIn || !TimeOut ) {
      console.log("Veuillez remplir tous les champs.");
      return;
    }
    // Utilisation de la fonction createCycle depuis le fichier api.js
    const response = await createCycle(name1, Description, Color, TimeIn, TimeOut);

    console.log("response : ", response)
    // Vérifiez si l'insertion a réussi du côté serveur
    if (response) {
      console.log("Le cycle a été créé avec succès." );
      // Réinitialisez les champs après la création
      setname1('');
      setDescription('');
      setColor('');
      setTimeIn('');
      setTimeOut('');
      //sendWelcomecolor("charafzineddine@gmail.com");
    } else {
      console.log("Erreur lors de la création du cycle. " + response.success);

    }
  } catch (error) {
    console.log("Une erreur est survenue lors de la création du cycle.", error);

  }
};

  return (
    <View style={styles.container}>
      <Text>Formulaire d'insertion</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name1}
        onChangeText={(text) => setname1(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={Description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={Color}
        onChangeText={(text) => setColor(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Time In"
        value={TimeIn}
        onChangeText={(text) => setTimeIn(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Time Out"
        value={TimeOut}
        onChangeText={(text) => setTimeOut(text)}
      />




      <TouchableOpacity onPress={handleSubmit} style={styles.buttonAdd}>
        <Text style={styles.textAdd}>Insérer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:2,
    //borderWidth:1,
    //borderColor:'black',
    borderRadius:10,
    //width:'70%',
    backgroundColor:'pink',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: '65%',
    borderRadius:15,
  },

  buttonAdd:{
    backgroundColor:'gray',
    width: '20%',
  },
  textAdd:{
    alignContent:'center',
    justifyContent:'center',
    textAlign:'center',
    color:'black',
  }
});

export default CreateCyclePage;