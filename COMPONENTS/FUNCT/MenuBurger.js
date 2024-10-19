import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Text style={styles.menuText}>{isOpen ? "Fermer le Menu" : "Ouvrir le Menu"}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.menuItems}>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Option 1 sélectionnée")}>
            <Text>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Option 2 sélectionnée")}>
            <Text>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Option 3 sélectionnée")}>
            <Text>Option 3</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 10,
  },
  menuButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  menuText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItems: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  menuItem: {
    paddingVertical: 5,
  },
});
