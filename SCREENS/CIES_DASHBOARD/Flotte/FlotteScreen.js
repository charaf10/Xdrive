import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Menu from '../../../COMPONENTS/FUNCT/MenuHorizontal'; // Assurez-vous d'importer votre composant Menu ici
import Grille from './Grille'; // Assurez-vous d'importer votre composant Grid ici

export default function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.container}>
      {/* Afficher le menu conditionnellement en fonction de l'état */}
      <View style={styles.gridContainer}>
        {/*<Menu/>*/}
        <Grille/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
   // backgroundColor:'grey',
  },
  gridContainer: {
    flex: 1,
    backgroundColor:'blue',

  },
});
