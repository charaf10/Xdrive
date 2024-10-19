import React from 'react';
import { View, Text, Image, StyleSheet  } from 'react-native';

const DriverProfile = ({ route }) => {

  
  const { worker } = route.params;  // Vérifiez que worker est bien passé en paramètre

  // Ajoutez cette condition pour vérifier si worker est bien défini avant de l'utiliser
  if (!worker) {
    return (
      <View style={styles.container}>
        <Text>Erreur: Informations sur le chauffeur introuvables.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: worker.IdDriver }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{worker.FirstName} {worker.LastName}</Text>
        <Text style={styles.email}>{worker.email}</Text>
        <Text style={styles.phone}>{worker.PhoneNumber}</Text>
        <Text style={styles.address}>{worker.VehicleType}</Text>
      </View>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'grey'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    backgroundColor:'blue'
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  email: {
    fontSize: 16,
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default DriverProfile;
