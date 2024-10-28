import React from 'react';
import { View, StyleSheet } from 'react-native';

import ApplyDetails from './ApplyDetails'; // Import du composant ApplyDetails

const ListApply = ({ id }) => {

    console.log('id listapply: ' + id);
    
  return (
    <View style={styles.container}>
      {/* On passe l'id comme paramètre au composant ApplyDetails */}
      test
      <ApplyDetails id={id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    flex: 1, // S'assure que cette vue occupe tout l'espace disponible dans le modal
  },
});

export default ListApply;
