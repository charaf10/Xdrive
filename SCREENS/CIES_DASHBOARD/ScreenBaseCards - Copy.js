import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ListWorkers from '../../SCREENS/CIES_DASHBOARD/Recruit/ListDriver'; // Assurez-vous d'importer votre composant correctement


const DashboardScreen = ({ navigation }) => {

  const [currentDateTime, setCurrentDateTime] = useState('');

  
  // Example data for the cards
  const cards = [
    { title: 'Drivers', screen: 'ListWorkers' },
    { title: 'Infos', screen: 'ListInfos' },
    { title: 'Stats', screen: 'StatsScreen' },
    { title: 'Settings', screen: 'SettingsScreen' },
    { title: 'Settingsa', screen: 'SettingsScreen' },
   // { title: 'Settingsb', screen: 'SettingsScreen' },
  ];

  useEffect(() => {
    // Function to get the current date and time
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString(); // Formats date and time to local format
      setCurrentDateTime(formattedDateTime);
    };

    // Update the date and time initially and every second
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard {currentDateTime}</Text>
      </View>
      <View style={styles.cardContainer}>
        {cards.map((card, index) => {
          // Apply a specific style based on the index or title of the card
          let cardStyle = styles.card;
          if (card.title === 'Drivers') cardStyle = [styles.card, styles.cardStyleDrivers];
          if (card.title === 'Infos') cardStyle = [styles.card, styles.cardStyleInfos];
          if (card.title === 'Stats') cardStyle = [styles.card, styles.cardStyleStats];
          if (card.title === 'Settings') cardStyle = [styles.card, styles.cardStyleSettings];
          if (card.title === 'Settingsa') cardStyle = [styles.card, styles.cardStyleSettingsa];
          //if (card.title === 'Settingsb') cardStyle = [styles.card, styles.cardStyleSettingsb];

          return (
            <TouchableOpacity
              key={index}
              style={cardStyle}
              onPress={() => navigation.navigate(card.screen)}
            >
              <Text style={styles.cardText}>{card.title}</Text>

              {card.title === 'Infos' && (
                <View style={styles.dateTimeContainer}>
                  <Text style={styles.customCardText}>x</Text>
                  <Text style={styles.cardTextInfo}>Some additional info here</Text>
                  <Text style={styles.cardTextInfo}>Active Drivers: 12</Text>
                  <Text style={styles.cardTextInfo}>Scheduled Jobs: 8</Text>
                  <Text style={styles.cardTextInfo}>Alerts: 2</Text>
                </View>
              )}

              {card.title === 'Drivers' && (
                <View style={styles.dateTimeContainer}>
                  <ListWorkers />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#f8f9fa',
    backgroundColor: 'black',
  },
  dateTimeContainer: {
    flex: 1,
    //backgroundColor: '#f8f9fa',
    borderWidth:1,
    borderColor:'blue',
    backgroundColor: 'black',
    width: '100%',

  },
  header: {
    height: 50,
    backgroundColor: '#6abf69',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
  },
  cardContainer: {
    flex: 1,
    padding: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    
  },
  card: {
    //backgroundColor: '#ffffff',
    backgroundColor: 'red',
    width: '33.3%', // Increased width to occupy more space
    marginBottom: 10, // Reduced margin to decrease space between cards
    
    height: '45%', 
    aspectRatio: 1,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,

   /* elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,*/
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardTextInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  
  dateTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Custom style for a particular card
  customCard: {
    backgroundColor: 'transparent',
    //borderWidth: 2,
    borderColor: '#333', // Custom border color
    borderRadius: 0,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  customCardText: {
    color: 'red', // Custom text color
    fontSize: 20,  // Larger text size
    
  },

  customCardTextInfo: {
    color: 'blue', // Custom text color
    fontSize: 20,  // Larger text size
    
  },



    // Unique styles for each card
    cardStyleDrivers: {
      elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
      backgroundColor: 'lightblue',
      transform: [{ perspective: 1000 }, { rotateY: '10deg' }],
    },
    cardStyleInfos: {
      position:'absolute',
      top:'',
      left:'34%',
      backgroundColor: 'lightgreen',
      width : '32%',
      height : '94%',
      //transform: [{ perspective: 1000 }, { rotateY: '15deg' }],
    },
    cardStyleStats: {
      position:'absolute',
      top:'50%',
      left:'66.6%',
      elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
      backgroundColor: 'lightcoral',
      transform: [{ perspective: 1000 }, { rotateY: '-10deg' }],
    },
    cardStyleSettings: {
      position:'absolute',
      top:'50%',
      left:'0',
      elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
      backgroundColor: 'lightblue',
      transform: [{ perspective: 1000 }, { rotateY: '10deg' }],
    },
    cardStyleSettingsa: {
      position:'absolute',
      top:'0',
      left:'66.6%',
      //top:'',
      backgroundColor: 'lightyellow',
      transform: [{ perspective: 1000 }, { rotateY: '-10deg' }],
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },

    cardStyleSettingsb: {
      elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
      backgroundColor: 'lightcoral',
      transform: [{ perspective: 1000 }, { rotateY: '-15deg' }],
    },
});

export default DashboardScreen;
