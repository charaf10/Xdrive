
//  const { workerId } = route.params;

import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import Show_info_driver from '../../../../Component/Screen/admin/show_info_driver'; // Assurez-vous d'importer votre composant correctement


const WorkerDetailScreen = ({ route }) => {
  const { worker } = route.params;

  const [selectedDriver, setSelectedDriver] = useState(null);


  // Placeholder data - replace with actual worker data fetched based on workerId
 /* const worker = workerData || {
    name: 'John Doe',
    role: 'Senior Developer',
    imageUrl: 'https://example.com/image1.jpg',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    description: 'Experienced developer with a strong background in web technologies...',
    projectsCompleted: 42,
    rating: 4.8
  };
*/
  return (
    <View style={styles.container}>
     

      <Show_info_driver driver={worker} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  workerName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  workerRole: {
    fontSize: 20,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginRight: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#555',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  contactButton: {
    marginTop: 40,
    backgroundColor: '#6abf69',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default WorkerDetailScreen;

