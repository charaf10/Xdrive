import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import {myip, mydbAPI} from '../../../../IP'

import Com_select_vehicule from '../../../../COMPONENTS/COM_UTILS/SELECT/select_name_vehicule';
import Com_select_shift from '../../../../COMPONENTS/COM_UTILS/SELECT/select_name_shift';

const CreateOffer = ({Identreprise, closeCreateModal }) => {

  console.log("identrreprise isii"+Identreprise);
  


  const [experienceRequired, setExperienceRequired] = useState('');
const [licenseRequired, setLicenseRequired] = useState('');
const [languagesRequired, setLanguagesRequired] = useState('');
const [salaryOffered, setSalaryOffered] = useState('');
const [maxDistance, setMaxDistance] = useState('');
const [certificationsRequired, setCertificationsRequired] = useState('');
const [preferredRoute, setPreferredRoute] = useState('');




  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [datestart, setDatestart] = useState('');
  const [dateend, setDateend] = useState('');
  const [schedule, setSchedule] = useState('');
  const [nbdriver, setNbdriver] = useState('');
  const [selectedVehicule, setSelectedVehicule] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [status, setStatus] = useState('off');

  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {

    console.log("testestest");
    
    setModalVisible(false);  // This will close the modal
  };

  const handleSelectVehicule = value => {
    setSelectedVehicule(value);

  };
  const handleSelectShift = value => {
    setSelectedShift(value);

  };
  
/*
  const handleSubmit = () => {
    const offerData = {
      Title: title,
      Desc: desc,
      Datestart: datestart,
      Dateend: dateend,
      Schedule: schedule,
      Nbdriver: nbdriver,
      Identreprise: Identreprise,  // replace with dynamic value as needed
      TypeVehicule: selectedVehicule,
      TypeShift: selectedShift,
      Location: "location",  // replace with dynamic value as needed
      Status: status,
    };

    

    axios.post('http://' + myip +':80/link/entreprise/InsertOffer.php', offerData)
      .then((response) => {
        console.log(response.data);
        Alert.alert("Insert Success", response.data.Message);
        closeCreateModal();  // Close the modal after a successful submission

      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Insert Failed", "An error occurred while inserting the offer.");
      });

  };
*/
const handleSubmit = () => {
  // Vérification de la validation des champs
  if (!title || !desc || !datestart || !dateend || !schedule || !nbdriver || !Identreprise || !selectedVehicule || !selectedShift || !experienceRequired || !licenseRequired || !languagesRequired || !salaryOffered || !maxDistance || !certificationsRequired || !preferredRoute) {
    Alert.alert("Validation Failed", "Please fill in all required fields.");
    return;
  }

  const offerData = {
    Title: title,
    Desc: desc,  // Correspond à la structure PHP
    Datestart: datestart,
    Dateend: dateend,
    Schedule: schedule,
    Nbdriver: nbdriver,
    Identreprise: Identreprise,  // Remplacez par la valeur dynamique selon vos besoins
    VehicleId: selectedVehicule,  // Assurez-vous que ceci correspond à votre modèle de données
    TypeShift: selectedShift,
    Location: "location",  // Remplacez par la valeur dynamique comme nécessaire
    Status: status, // Vérifiez que 'status' a une valeur appropriée
    EntrepriseID: Identreprise,
    ExperienceRequired: experienceRequired, // Nouveau champ ajouté
    LicenseRequired: licenseRequired, // Nouveau champ ajouté
    LanguagesRequired: languagesRequired, // Nouveau champ ajouté
    SalaryOffered: salaryOffered, // Nouveau champ ajouté
    MaxDistance: maxDistance, // Nouveau champ ajouté
    CertificationsRequired: certificationsRequired, // Nouveau champ ajouté
    PreferredRoute: preferredRoute, // Nouveau champ ajouté
  };
  console.log("offerData : "+offerData);
  

  axios.post(`http://${myip}:80/link/entreprise/InsertOffer.php`, offerData)
    .then((response) => {
      console.log(response.data);
      Alert.alert("Insert Success", response.data.Message);
      closeCreateModal();  // Fermer le modal après une soumission réussie
      
      // Réinitialisation des champs après soumission
      setTitle('');
      setDesc('');
      setDatestart('');
      setDateend('');
      setSchedule('');
      setNbdriver('');
      setSelectedVehicule(null); // Réinitialiser à la valeur par défaut
      setSelectedShift(null); // Réinitialiser à la valeur par défaut
      setExperienceRequired(''); // Réinitialiser le champ
      setLicenseRequired(''); // Réinitialiser le champ
      setLanguagesRequired(''); // Réinitialiser le champ
      setSalaryOffered(''); // Réinitialiser le champ
      setMaxDistance(''); // Réinitialiser le champ
      setCertificationsRequired(''); // Réinitialiser le champ
      setPreferredRoute(''); // Réinitialiser le champ
    })
    .catch((error) => {
      console.error(error);
      Alert.alert("Insert Failed", "An error occurred while inserting the offer.");
    });
};




  return (<View style={styles.container}>
    <Text style={styles.title}>Create Offer</Text>
  
    <TextInput
      style={styles.input}
      placeholder="Title"
      value={title}
      onChangeText={setTitle}
    />
    <TextInput
      style={styles.input}
      placeholder="Description"
      value={desc}
      onChangeText={setDesc}
    />
    <TextInput
      style={styles.input}
      placeholder="Start Date"
      value={datestart}
      onChangeText={setDatestart}
    />
    <TextInput
      style={styles.input}
      placeholder="End Date"
      value={dateend}
      onChangeText={setDateend}
    />
    <TextInput
      style={styles.input}
      placeholder="Schedule"
      value={schedule}
      onChangeText={setSchedule}
    />
    <TextInput
      style={styles.input}
      placeholder="Number of Drivers"
      value={nbdriver}
      onChangeText={setNbdriver}
      keyboardType="numeric" // Spécifiez le type de clavier pour les nombres
    />
  
    {/* Selection for Vehicle */}
    <Com_select_vehicule
      selectedValue={selectedVehicule}
      onChange={handleSelectVehicule}
    />
    <br/>
    
    {/* Selection for Shift */}
    <Com_select_shift
      selectedValue={selectedShift}
      onChange={handleSelectShift}
    />
     <br/> 
    {/* Additional Inputs for New Fields */}
    <TextInput
      style={styles.input}
      placeholder="Experience Required"
      value={experienceRequired}
      onChangeText={setExperienceRequired}
    />
    <TextInput
      style={styles.input}
      placeholder="License Required"
      value={licenseRequired}
      onChangeText={setLicenseRequired}
    />
    <TextInput
      style={styles.input}
      placeholder="Languages Required"
      value={languagesRequired}
      onChangeText={setLanguagesRequired}
    />
    <TextInput
      style={styles.input}
      placeholder="Salary Offered"
      value={salaryOffered}
      onChangeText={setSalaryOffered}
      keyboardType="numeric" // Spécifiez le type de clavier pour les nombres
    />
    <TextInput
      style={styles.input}
      placeholder="Max Distance"
      value={maxDistance}
      onChangeText={setMaxDistance}
      keyboardType="numeric" // Spécifiez le type de clavier pour les nombres
    />
    <TextInput
      style={styles.input}
      placeholder="Certifications Required"
      value={certificationsRequired}
      onChangeText={setCertificationsRequired}
    />
    <TextInput
      style={styles.input}
      placeholder="Preferred Route"
      value={preferredRoute}
      onChangeText={setPreferredRoute}
    />
  
    <Button
      title="Create Offer"
      onPress={() => {
        handleSubmit();  // Call the submit function
        handleModalClose();  // Close the modal after submitting
      }}
    />
  </View>
  

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    backgroundColor:'white',
  },
});

export default CreateOffer;
