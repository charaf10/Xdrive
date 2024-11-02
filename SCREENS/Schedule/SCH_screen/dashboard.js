import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
/*
import Manage_driver from "./manage_driver";
import Cycle from "./Manage_Cycle";
//import WorkerDetailScreen from "./worker/WorkerDetailScreen";
*/

import Manage_driver from "./manage_driver";
import Availability from "./Availability";
import Schedule from "./Schedule";
import Block from "./Block";
import Cycle from "./Manage_Cycle";



const Dashboard = ({navigation, driver, route}) => {
  const [currentComponent, setCurrentComponent] = useState(null);

  const renderComponent = (component) => {
    setCurrentComponent(component);
    //console.log(component.name);

  };

  const ScheduleComponent = () => {
    return <Schedule/>;
  };

  const BlockComponent = () => {
    return <Block/>;

  };

  const CycleComponent = () => {
    return <Cycle route={route}/>;

  };

  const ManagementComponent = () => {
    return <Manage_driver />;
  };
  const AvailabilitiesComponent = () => {
    return <Availability />;
  };


  const SettingComponent = () => {
    return <Text>Composant de paramètre</Text>;
  };

  const getBorderColor = (componentName) => {
    //console.log(componentName);

    return currentComponent && currentComponent.type.name === componentName
      ? 'red'  // Couleur de la bordure lorsque l'élément est sélectionné
      : 'transparent';  // Couleur de la bordure par défaut
  };

  return (
    <View style={styles.container}>
      {/* Menu sur la gauche */}
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => renderComponent(<ScheduleComponent />)}>
          <Text style={[styles.menuItem, { borderColor: getBorderColor('ScheduleComponent') }]}>
            Schedule
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => renderComponent(<BlockComponent />)}>
          <Text style={[styles.menuItem, { borderColor: getBorderColor('BlockComponent') }]}>
            Block
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => renderComponent(<CycleComponent />)}>
          <Text style={[styles.menuItem, { borderColor: getBorderColor('CycleComponent') }]}>
            Cycle
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => renderComponent(<AvailabilitiesComponent />)}>
          <Text style={[styles.menuItem, { borderColor: getBorderColor('AvailabilitiesComponent') }]}>
            Availabilities
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => renderComponent(<ManagementComponent />)}>
          <Text style={[styles.menuItem, { borderColor: getBorderColor('ManagementComponent') }]}>
            Management
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => renderComponent(<SettingComponent />)}>
          <Text style={[styles.menuItem, { borderColor: getBorderColor('SettingComponent') }]}>
            Setting
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenu principal */}
      <View style={styles.content}>
        {currentComponent}
        <Text>x</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',  // Changer en 'column' pour une disposition verticale
  },
  menu: {
    flexDirection: 'row',  // Alignement horizontal pour les éléments du menu
    backgroundColor: 'grey',
    padding: 16,
    justifyContent: 'center',  // Centre les éléments du menu
    borderRadius: 10,  // Coins arrondis pour le menu
    marginBottom: 16,  // Espacement sous le menu
  },
  menuItem: {
    color: '#f0f0f0',
    fontSize: 16,
    marginHorizontal: 12,  // Espace horizontal entre les éléments du menu
    borderWidth: 1,  // Ajout d'une bordure
    borderRadius: 5,  // Coins arrondis pour chaque élément
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});


/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  menu: {
    width: '15%',
    backgroundColor: 'black',
    padding: 16,
  },
  menuItem: {
    color: '#f0f0f0',
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,  // Ajout d'une bordure
    borderRadius: 5,  // Coins arrondis
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

*/

export default Dashboard;
