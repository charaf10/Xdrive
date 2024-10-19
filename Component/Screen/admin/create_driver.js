import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, Alert } from 'react-native';
import axios, { all } from 'axios';
import myip from '../../../IP';

import { createDriver } from '../../../Function/admin/fun_admin'; // Importez la fonction depuis le fichier api.js
import { ValidateEmail } from '../../../Function/fun_home'; // Importez la fonction depuis le fichier api.js
import { validatePhoneNumber } from '../../../Function/fun_home'; // Importez la fonction depuis le fichier api.js

//import { sendWelcomeEmail } from '../../../Function/admin/send_email.mjs';

// Utilisation de la fonction sendWelcomeEmail
//const driverEmail = 'email_du_conducteur@example.com';

const CreateDriverPage = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [divisionId, setDivisionId] = useState(''); // Valeur sélectionnée de la liste déroulante

  const [division, setDivision] = useState([]);


  const fetchAllDivisions = async () => {

    console.log("divisions : " + division);
    try {
      const response = await axios.get('http://' + myip + ':80/api_schedule/get_all_divisions.php');
      setDivision(response.data);
      console.log("responsefetchAllDivisions : " + response);

    } catch (error) {
      console.error('Erreur lors de la récupération des pilotes :', error);
    }  
    console.log("division.length : " + division.length);

  };   



  useEffect(() => {

    fetchAllDivisions();
/*    
    const interval = setInterval(() => {
      console.log("test");
      fetchAllDrivers();
    }, []);

    return () => {
      clearInterval(interval);
    };
*/
      }, []); // Utiliser une dépendance vDriverIde pour s'assurer que cela se produit uniquement une fois





  const handleCreateDriver = async () => {

    console.log(" handleCreateDriver clicked " + firstName);
    try {
      // Vérifiez si tous les champs sont remplis
      if (!firstName || !lastName || !validatePhoneNumber(phoneNumber) || !ValidateEmail(email) || !divisionId) {
        console.log("Veuillez remplir tous les champs.");
        return;
      }

      // Utilisation de la fonction createDriver depuis le fichier api.js
      const response = await createDriver(firstName, lastName, email, phoneNumber, divisionId);

      console.log("response : ", response)
      // Vérifiez si l'insertion a réussi du côté serveur
      if (response) {
        console.log("Le conducteur a été créé avec succès." );
        // Réinitialisez les champs après la création
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setDivisionId('');
        setEmail('');
        //sendWelcomeEmail("charafzineddine@gmail.com");
      } else {
        console.log("Erreur lors de la création du conducteurssssss. " + response.success);

      }
    } catch (error) {
      console.log("Une erreur est survenue lors de la création du conducteur.");

    }
  };




  return (
    <View style={styles.container}>
      <Text style={styles.header}>Créer un Driver</Text>

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

    

      <Picker
        style={styles.input}
        selectedValue={divisionId}
        onValueChange={(itemValue) => setDivisionId(itemValue)}
      >
        <Picker.Item label="Sélectionnez une division" value="" />
        {division.map((division) => (
          <Picker.Item key={division.DivisionId} label={division.Name} value={division.DivisionId} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleCreateDriver}>
        <Text style={styles.buttonText}>Créer Driver</Text>
      </TouchableOpacity>
    </View>
  );



};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    alignItems:'center',
    alignContent:'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  button: {
    width:'50%',
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreateDriverPage;
