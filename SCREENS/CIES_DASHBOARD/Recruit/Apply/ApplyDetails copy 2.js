import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {myip, mydbAPI} from '../../../../IP';
import DriversDetails from '../../../CIES_DASHBOARD/Driver'

const ApplyDetails = ({ id }) => {
  const [applyData, setApplyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false); // État pour basculer entre les vues
  const [selectedApply, setSelectedApply] = useState(null); // État pour stocker l'élément sélectionné

  useEffect(() => {
    const fetchData = async () => {
      console.log("idddd "+id);
      
      try {
        const response = await axios.post('http://' + myip + ':80/link/entreprise/SelectListApply.php', {
          id: id,
        });

        console.log('data: ', response.data);
        setApplyData(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Erreur lors du chargement des données.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCardPress = (apply) => {
    setSelectedApply(apply); // Enregistre l'élément sélectionné
    setIsDetailView(true); // Bascule vers la vue détail
  };

  const handleBackPress = () => {
    setIsDetailView(false); // Retour à la vue grid
  };


  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement des données...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }
{/*
  
  <View style={styles.container}>
  {applyData.length > 0 ? (
    <View style={styles.gridContainer}>
      {applyData.map((apply, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(apply.id)}>
          <Text style={styles.title}>Apply {index + 1}</Text>
          <Text>ID: {apply.id}</Text>
          <Text>IdDriver: {apply.IdDriver}</Text>
          <Text>Nom: {apply.FirstName + " " + apply.LastName}</Text>
          <Text>Email: {apply.email}</Text>
          <Text>Statut: {apply.status}</Text>
        </TouchableOpacity>
      ))}
    </View>
  ) : (
    <Text style={styles.emptyText}>Aucune donnée disponible pour cet Apply.</Text>
  )}
</View>
  */}
  return (
    <View style={styles.container}>
    {isDetailView && selectedApply ? (
      // Affichage de la vue détail
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Détails de l'Apply</Text>
        <Text>ID: {selectedApply.id}</Text>
        <Text>IdDriver: {selectedApply.IdDriver}</Text>
        <Text>Nom: {selectedApply.FirstName + " " + selectedApply.LastName}</Text>
        <Text>Email: {selectedApply.email}</Text>
        <Text>Statut: {selectedApply.status}</Text>
        
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    ) : (
      // Affichage de la vue grid
      <View style={styles.gridContainer}>
        {applyData.length > 0 ? (
          applyData.map((apply, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(apply)}>
              <Text style={styles.title}>Apply {index + 1}</Text>
              <Text>ID: {apply.id}</Text>
              <Text>IdDriver: {apply.IdDriver}</Text>
              <Text>Nom: {apply.FirstName + " " + apply.LastName}</Text>
              <Text>Email: {apply.email}</Text>
              <Text>Statut: {apply.status}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>Aucune donnée disponible pour cet Apply.</Text>
        )}
      </View>
    )}
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    //backgroundColor: '#f5f5f5',
    //backgroundColor: '#f5f5f5',
    borderRadius:20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '45%', // Adjust width for grid layout
    backgroundColor: '#dad9d9',
    padding: 16,
    borderRadius: 10, // Rounded corners
    marginVertical: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    // Elevation for Android
    elevation: 10,
  },
  detailContainer: {
    padding: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,

    
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },

  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});


  /*
const styles = StyleSheet.create({


  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    width:'100%',
    color:'white',
  },
  emptyText: {
    color:'black',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permet de passer à la ligne après 3 cartes
    justifyContent: 'space-between', // Espacer uniformément les cartes
  },
  card: {
    //width: '100%', // Trois cartes par ligne
    backgroundColor: '#e3e3e3',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // Ombre sur Android
    alignItems: 'center',
    margin:5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});

*/

export default ApplyDetails;
