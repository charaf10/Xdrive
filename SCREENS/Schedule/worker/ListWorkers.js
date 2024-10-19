import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListWorkers = ({ worker }) => {
  const navigation = useNavigation();

console.log(worker)
  return (

    <View>

    <TouchableOpacity
    style={styles.itemContainer}
    onPress={() => navigation.navigate('driverProfil', { worker: worker })}
  >
    {/*<Image source={{ uri: worker.imageUrl }} style={styles.profileImage} />*/}
    <Text style={styles.workerName}>{worker.FirstName + " " +worker.LastName}</Text>
  </TouchableOpacity>
  </View>

/*
        <View>
      <Text>Nom : {worker.Firstname}</Text>
      <Text>Âge : {worker.Firstname}</Text>
      <Button
        title="Voir les détails"
        onPress={() => navigation.navigate('DetailsConducteur', { conducteur: worker })}
      />
    </View>
    */
  

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  workerName: {
    fontSize: 18,
  },
});
export default ListWorkers;
