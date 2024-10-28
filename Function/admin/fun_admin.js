// api.js
//import React, { useState, useEffect } from 'react';

import axios from 'axios'; 
//import myip from "../../IP";
//import mydbAPI from "../../IP";
import { myip, mydbAPI } from "../../IP"; // Importez avec les accolades

/* LA CREATION DU DRIVER CREER AUSSI UNE LIGNE DANS LA TABLE ACCOUNT */
export const createDriver = async (firstName, lastName, email, phoneNumber, divisionId) => {
  try {

    console.log("les datas: " + firstName, lastName, email, phoneNumber, divisionId);
    // Envoi d'une requête HTTP pour insérer le conducteur dans la base de données
    const response = await axios.post(`http://${myip}:80/${mydbAPI}/admin/Insert_driver.php`, {
      firstName,
      lastName,
      email,
      phoneNumber,
      divisionId,
    
    });
    console.log("reponse fun_admin try : " + response );

    return response;
  } catch (error) {
    console.error('Erreur lors de la création du conducteur :', error);
    console.log("reponse fun_admin catch : " + response );

    throw error;
      console.log("reponse fun_admin throw : " + response );
  }
};





/* LA MISE A JOUR DU DRIVER */
export const updateDriver = async (driverId, firstName, lastName, email, phoneNumber, divisionId) => {
  try {

    console.log("les datas: " + driverId, firstName, lastName, email, phoneNumber, divisionId);
    // Envoi d'une requête HTTP pour insérer le conducteur dans la base de données
    const response = await axios.post(`http://${myip}:80/${mydbAPI}/admin/Update_driver.php`, {
      driverId,
      firstName,
      lastName,
      email,
      phoneNumber,
      divisionId,
    
    });

    console.log("reponse x: " + response.data[0].Message);
    return response;
  } catch (error) {
    console.error('Erreur lors de la création du conducteur :', error);
    throw error;
  }

};


export const deleteDriver= async(driverId) =>{
  try {

    console.log("le driver id depuis delete_driver (fun_admin ligne 68): " + driverId);
    // Envoi d'une requête HTTP pour insérer le conducteur dans la base de données
    const response = await axios.post(`http://${myip}:80/${mydbAPI}/admin/DeleteDriver.php`, {
      driverId,
    });

    return response;
  } catch (error) {
    console.error('Erreur lors de la suppression du conducteur :', error);
    throw error;
  }
}





{/* ========================================================================================================================== */}




export const createCycle = async (Name, Description, Color, TimeIn, TimeOut) => {
  try {

    console.log("les datas: " + Name, Description, Color, TimeIn, TimeOut);
    // Envoi d'une requête HTTP pour insérer le conducteur dans la base de données
    const response = await axios.post(`http://${myip}:80/${mydbAPI}/admin/Insert_cycle.php`, {
      Name,
      Description, 
      Color, 
      TimeIn, 
      TimeOut,
    });
    console.log("reponse fun_admin try : " + response );

    return response;
  } catch (error) {
    console.error('Erreur lors de la création du cycle :', error);
    console.log("reponse fun_admin catch : " + response );

    throw error;
      console.log("reponse fun_admin throw : " + response );
  }
};


/*
export const createCycle = async (Name, Description, Color, TimeIn, TimeOut) => {
  try {

    console.log("les datas: " + Name, Description, Color, TimeIn, TimeOut);
    // Envoi d'une requête HTTP pour insérer le conducteur dans la base de données
    const response = await axios.post('http://' + myip + ':80/api_schedule/admin/Insert_cycle.php', {
      Name,
      Description, 
      Color, 
      TimeIn, 
      TimeOut,
    });
    console.log("reponse fun_admin try : " + response );

    return response;
  } catch (error) {
    console.error('Erreur lors de la création du cycle :', error);
    console.log("reponse fun_admin catch : " + response );

    throw error;
      console.log("reponse fun_admin throw : " + response );
  }
};
*/
/* LA MISE A JOUR DU CYCLE */
export const updateCycle = async (TemplateId, Name, Description, Color, TimeIn, TimeOut) => {
  try {

    console.log("les datas: " + TemplateId, Name, Description, Color, TimeIn, TimeOut);
    // Envoi d'une requête HTTP pour insérer le conducteur dans la base de données
    const response = await axios.post(`http://${myip}:80/${mydbAPI}/admin/Update_blocktemplate.php`, {
      TemplateId,
      Name,
      Description,
      Color,
      TimeIn,
      TimeOut,
    });

    console.log("reponse x: " + response.data[0].Message);
    return response;
  } catch (error) {
    console.error('Erreur lors de la mise du cycle :', error);
    throw error;
  }

};




export const deleteCycle= async(TemplateId) =>{
  try {

    console.log("le cycle id depuis delete_Cycle (fun_admin ligne 121): " + TemplateId);
    // Envoi d'une requête HTTP pour insérer le conducteur dans la base de données
    const response = await axios.post(`http://${myip}:80/${mydbAPI}/admin/DeleteCycle.php`, {
      TemplateId,
    });

    return response;
  } catch (error) {
    console.error('Erreur lors de la suppression du cycle :', error);
    throw error;
  }
}





{/* ========================================================================================================================== */}