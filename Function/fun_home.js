/*Import for database */
import axios from 'axios';
import myip from "../IP";

    // Fonction qui multiplie deux nombres
    export const Bonjour = (name) => {
      const bonjour = "Bonjour " + name
      return(bonjour)
    };
        
    
    
    /*CETTE FONCTION EST APPELÉ LORSQU'IL YA  UN CLIC SUR LOGIN */

export const Loginadmin = async (username, password) => {

  try {
    const response = await axios.post('http://' + myip + ':80/api_schedule/admin/Login.php', {
      username: username,
      password: password,
    });
    let responsee = response.data[0].Message;
    console.log("responsee : " + responsee);
    return responsee;
  } catch (error) {
    throw error;
  }

};



export const Logindriver = async (username, password) => {

  try {
    const response = await axios.post('http://' + myip + ':80/api_schedule/admin/Login_Driver.php', {
      username: username,
      password: password,
    });
    let responsee = response.data[0].Message;
    console.log("responsee : " + responsee);
    return responsee;
  } catch (error) {
    throw error;
  }

};

    // Fonction de validation pour une adresse e-mail
  export const ValidateEmail = (email) => {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      console.log("regex: " + emailRegex);
      return emailRegex.test(email);
    };


    // Fonction de validation pour un numéro de téléphone
  export const validatePhoneNumber = (phoneNumber) => {

    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };















  /* EXEMPLE DE FICHIER OU APPELER LES FUNCTIONS REUTILISABLES */

  /*
  
    // MaPage.js
    import React from 'react';
    import { View, Text, Button } from 'react-native';
    import { additionner, multiplier } from './fonctionsUtilitaires'; // Assurez-vous que le chemin est correct

    const MaPage = () => {
    // Appel de la fonction additionner
    const resultatAddition = additionner(5, 3);

    // Appel de la fonction multiplier
    const resultatMultiplication = multiplier(4, 2);

    return (
        <View>
        <Text>Résultat de l'addition : {resultatAddition}</Text>
        <Text>Résultat de la multiplication : {resultatMultiplication}</Text>
        </View>
    );
    };

export default MaPage;

  */