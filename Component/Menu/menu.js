// Menu.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = ({ menuItems, onItemSelected }) => {
  const navigation = useNavigation();

  const navigateToDetails = () => {
    // Utilisez la navigation pour passer à une autre page
    navigation.navigate('Details');
  };

  const openDrawer = () => {
    // Ouvre le menu
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestion compte</Text>
      <Button title="Ouvrir le menu" onPress={openDrawer} />
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Button  style={styles.buttonGo}title="Voir les détails" onPress={() => onItemSelected(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width:150,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 16,
  },  
  buttonGo: {

    backgroundColor:'red',
  },
});

export default Menu;
