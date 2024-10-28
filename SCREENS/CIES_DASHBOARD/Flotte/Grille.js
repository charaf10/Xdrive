import React from 'react';
import { View, StyleSheet, ImageBackground  } from 'react-native';
import Section from '../../../COMPONENTS/FUNCT/Section';
import ListeDriver from '../../CIES_DASHBOARD/Recruit/ListDriver_small';

export default function App() {
  return (
    <View style={styles.container}>

        <Section title="Liste driver actif" customStyles={styles.section1}  contenant={<ListeDriver/>}/>


          <Section title="Maps" customStyles={styles.sectionMaps} />
      <Section title="Section 3" customStyles={styles.section3} />

      <Section title="Section 4" customStyles={styles.section4}/>

 
 
      {/* Ajoutez autant de sections que nécessaire avec des styles personnalisés */}
    </View>
  );
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: 'black',
  },
  section1: {
    width:'17%',
    height:'20%',
    backgroundColor: 'transparent', // Style spécifique pour la section 1
    maxWidth:'100%',
    borderWidth:1,
    borderColor:'white',
    //marginTop:'-15%',
    //marginright:'20%',

  },


  sectionMaps: {
    width:'65%',
    height: '60%',
    backgroundColor: '#202B50', // Style spécifique pour la section 2
    marginLeft:'10%',
    
  },
  section3: {
    width:'25%',

    backgroundColor: '#37373B', // Style spécifique pour la section 2
  },
  section4: {
    backgroundColor: '#37373B', // Style spécifique pour la section 2
  },
  section5: {
    backgroundColor: 'green', // Style spécifique pour la section 2
  },
  section6: {
    backgroundColor: '#FFE5B4', // Style spécifique pour la section 2
  },

});

