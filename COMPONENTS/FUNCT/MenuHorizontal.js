import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HorizontalMenu() {
  return (
    <View style={styles.menu}>
      <TouchableOpacity style={styles.tab}>
        <Text>Onglet 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text>Onglet 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text>Onglet 3</Text>
      </TouchableOpacity>
      {/* Ajoutez autant d'onglets que nécessaire */}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row', // Disposition horizontale
    height: 30, // Hauteur fixe du menu
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'space-around', // Espacement égal entre les onglets
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#f4f4f4',
  },
});
