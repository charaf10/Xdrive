import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, Alert } from 'react-native';
import axios from 'axios';
import {myip, mydbAPI} from '../../../../IP';
import { notification } from 'antd';

import { fetchData } from '../../../../Lakay_function/Refresh';
//import { fetchApply } from '../../../../Lakay_function/Refresh';
//      refreshData(identreprise);


const ApplyDetails = ({ id, route }) => {

    //const { param1, param2 } = route.params; // Destructure the passed parameters
    //let identreprise = param2;
    const  identreprise = 58;


  const [applyData, setApplyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApply, setSelectedApply] = useState(null); // Élément sélectionné
  const [modalVisible, setModalVisible] = useState(false); // Contrôle de la visibilité du modal



  const fetchData = async () => {
    console.log("idApply : " + id);

    try {
      const response = await axios.post(`http://${myip}:80/link/entreprise/SelectListApply.php`, { id });
      setApplyData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors du chargement des données.");
      setLoading(false);
    }
  };

  /*
  useEffect(() => {
    const fetchData = async () => {
      console.log("idApply : " + id);

      try {
        const response = await axios.post(`http://${myip}:80/link/entreprise/SelectListApply.php`, { id });
        setApplyData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
*/
  // Fonction pour afficher le modal avec les détails
  const handleCardPress = (apply) => {
    setSelectedApply(apply);
    setModalVisible(true); // Affiche le modal
    console.log("idApply : " + apply.idApply);

  };

  // Fonction pour fermer le modal
  const handleBackPress = (id) => {
    setModalVisible(false); // Ferme le modal
    setSelectedApply(null); // Réinitialise la sélection
    //fetchApply(id);
    //fetchApplyData(id); // Appel initial
  };

/* REFRESH DATA EVRY 2sec */
useEffect(() => {
  const interval = setInterval(() => {
    fetchData();
    //refreshData(identreprise);
  }, 3000);

  return () => {
    clearInterval(interval);
  };
}, []);

  const handleAccept = (apply) => {
    console.log("handleAccept a été appelé avec l'ID:", apply.idAsxpply);
    
      // Définissez les valeurs des paramètres que vous souhaitez envoyer
  const payload = {
    Id: apply.idApply,
    IdEntreprise: identreprise,  // Assurez-vous que `apply` contient `idEntreprise`
    IdDriver: apply.IdDriver,          // Assurez-vous que `apply` contient `idDriver`
    //StartDate: apply.startDate,        // Assurez-vous que `apply` contient `startDate`
    //EndDate: apply.endDate,            // Assurez-vous que `apply` contient `endDate`
    IsActive: 1           // Assurez-vous que `apply` contient `isActive`
  };

    axios.post('http://' + myip +':80/link/entreprise/AcceptOffer.php', payload)
    .then(response => {
      //alert("L'offre a été publié avec success")
      notification.success({
        message: 'Changes Submitted',
        description: 'L\'apply a été acceptée avec success',
      });
      console.log("response: ", response.data);
      console.log("Contenu complet de 'apply':", apply); // Affiche toutes les données de `apply` dans la console
      //setIsPublished(true);

      //setShowmodal(false)
      // pour que les items redevient a la couleur jaune (sinon ca reste backgroundcolor noir ) 
      //setSelectedId(0)
    })
    .catch(error => {
      console.error(error);
      });
  };

  /*
    const handleAccept = (apply) => {
    console.log("handleAccept a été appelé avec l'ID:", apply.idAsxpply);
          
    axios.post('http://' + myip +':80/link/entreprise/AcceptOffer.php', {Id : apply.idApply})
    .then(response => {
      //alert("L'offre a été publié avec success")
      notification.success({
        message: 'Changes Submitted',
        description: 'L\'apply a été acceptée avec success',
      });
      console.log("response: ", response.data);
      console.log("Contenu complet de 'apply':", apply); // Affiche toutes les données de `apply` dans la console
      //setIsPublished(true);

      //setShowmodal(false)
      // pour que les items redevient a la couleur jaune (sinon ca reste backgroundcolor noir ) 
      //setSelectedId(0)
    })
    .catch(error => {
      console.error(error);
      });
  };
  */

  // Fonction pour gérer le refus
  const handleReject = (apply) => {
    console.log("handleReject a été appelé avec l'ID:", apply.idApply);
          
    axios.post('http://' + myip +':80/link/entreprise/RejectOffer.php', {Id : apply.idApply})
    .then(response => {
      //alert("L'offre a été publié avec success")
      notification.success({
        message: 'Changes Submitted',
        description: 'L\'apply a été rejettée avec success',
      });
      console.log("response: ", response);
      //setIsPublished(true);

      //setShowmodal(false)
      // pour que les items redevient a la couleur jaune (sinon ca reste backgroundcolor noir ) 
      //setSelectedId(0)
    })
    .catch(error => {
      console.error(error);
      });
  };

  if (loading) return <Text>Chargement des données...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      {/* Liste des éléments */}
      <View style={styles.gridContainer}>
        {applyData.length > 0 ? (
          applyData.map((apply, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(apply)}>
              <Text style={styles.title}>Apply {index + 1}</Text>
              <Text>Nom: {apply.FirstName} {apply.LastName}</Text>
              <Text>Statut: {apply.status}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>Aucune donnée disponible pour cet Apply.</Text>
        )}
      </View>

      {/* Modal pour les détails */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleBackPress}
        transparent={true}
      >
        <View style={styles.modalContainer}>

          



          <View style={styles.detailContainer}>

          <Text style={styles.title}>Détails de l'Apply</Text>


          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
          <View style={{ height: 0 }} /> 


          {selectedApply && (
  <View style={styles.detailsGrid}>
    {/* Conteneur pour l'image */}
    <View style={styles.imageContainer}>
      <Image source={{ uri: selectedApply.IdDriver }} style={styles.avatar} />
    </View>
    
    {/* Conteneur pour les colonnes */}
    <View style={styles.columnsContainer}>
      <View style={styles.column}>
        <Text style={styles.columnTitle}>Conducteur</Text>
        <Text>ID: {selectedApply.idApply}</Text>
        <Text>IdDriver: {selectedApply.IdDriver}</Text>
        <Text>Nom: {selectedApply.FirstName} {selectedApply.LastName}</Text>
        <Text>Email: {selectedApply.Email}</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.columnTitle}>Véhicule</Text>
        <Text>Type: {selectedApply.vehicle_type}</Text>
        <Text>Marque: {selectedApply.vehicleBrand}</Text>
        <Text>Modèle: {selectedApply.vehicleModel}</Text>
      </View>
      
      <View style={styles.column}>
        <Text style={styles.columnTitle}>Expérience & Lieu</Text>
        <Text>Expérience: {selectedApply.experience} ans</Text>
        <Text>Lieu: {selectedApply.location}</Text>
      </View>
    </View>


    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(selectedApply)}>
          <Text style={styles.buttonText}>Accepter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={() => handleReject(selectedApply)}>
          <Text style={styles.buttonText}>Refuser</Text>
        </TouchableOpacity>
      </View>

  </View>
)}


        {
/* 

            {selectedApply && (

              <View style={styles.detailsGrid}>

                  <Image source={{ uri: selectedApply.IdDriver }} style={styles.avatar} />

                  <View style={{ height: 20 }}> 
                    
                    </View>


                  <View style={styles.column}>
                  <Text style={styles.columnTitle}>Conducteur</Text>
                  <Text>ID: {selectedApply.id}</Text>
                  <Text>IdDriver: {selectedApply.IdDriver}</Text>
                  <Text>Nom: {selectedApply.FirstName} {selectedApply.LastName}</Text>
                  <Text>Email: {selectedApply.email}</Text>
                </View>

                <View style={styles.column}>
                  <Text style={styles.columnTitle}>Véhicule</Text>
                  <Text>Type: {selectedApply.vehicleType}</Text>
                  <Text>Marque: {selectedApply.vehicleBrand}</Text>
                  <Text>Modèle: {selectedApply.vehicleModel}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.columnTitle}>Expérience & Lieu</Text>
                  <Text>Expérience: {selectedApply.experience} ans</Text>
                  <Text>Lieu: {selectedApply.location}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.columnTitle}>Expérience & Lieu</Text>
                  <Text>Expérience: {selectedApply.experience} ans</Text>
                  <Text>Lieu: {selectedApply.location}</Text>
                </View>
              </View>
            )}
*/
        }     



          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    //width: '30%',
    padding: 16,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin:20,
  },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.9)' },
  detailContainer: { width: '50%', height:'40%', padding: 20, backgroundColor: '#f0f0f0', borderRadius: 10 },
  //detailsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  
  detailsGrid: {
    marginTop: 10,
    alignItems: 'center', // Centre horizontalement le conteneur principal
  },
  imageContainer: {
    marginBottom: 10, // Ajoute de l'espace entre l'image et les colonnes
  },
  columnsContainer: {
    flexDirection: 'row', // Garde les colonnes en ligne
    justifyContent: 'space-between', // Espacement entre les colonnes
    width: '100%', // S'assurer que cela occupe toute la largeur
  },
  
  
  column: { flex: 1, padding: 10, marginHorizontal: 5, backgroundColor: '#ffffff', borderRadius: 8, elevation: 3 },
  columnTitle: { fontWeight: 'bold', marginBottom: 5 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  //backButton: {width:100, marginTop: 0, padding: 10, backgroundColor: '#007AFF', borderRadius: 5, alignContent:'right' },
  backButton: {
    position: 'absolute', // Positionner le bouton en absolu
    top: 10, // Ajustez la position verticale
    right: 10, // Ajustez la position horizontale
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  backButtonText: { color: '#fff', textAlign: 'center' },
  emptyText: { textAlign: 'center', marginTop: 20 },

  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    backgroundColor:'blue'
  },

  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  acceptButton: {
    backgroundColor: '#28a745', // Couleur pour le bouton Accepter
    padding: 7,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    width: 200,
    height: 40,
  },
  rejectButton: {
    backgroundColor: '#dc3545', // Couleur pour le bouton Refuser
    padding: 7,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    width: 200,
    height: 40,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ApplyDetails;
