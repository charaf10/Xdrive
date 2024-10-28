import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
/*
import Manage_driver from "./manage_driver";
import Cycle from "./Manage_Cycle";
//import WorkerDetailScreen from "./worker/WorkerDetailScreen";
*/


import Schedule from "../../Schedule/SCH_screen/Schedule_V4_3 copy";
import Manage from "../Dash/Manage";
import Hiring from "../Recruit/Offer/PostOffer";
//import ManagementDriversComponent from "../ManagementDrivers/manage_driver";
import ManagementDriversComponent from "../ManagementDrivers/manage_driver";
import Manage_driver from "../../Schedule/SCH_screen/manage_driver";

import DashboardSchedule from '../../Schedule/SCH_screen/dashboard';



const Dashboard = ({navigation, route}) => {
  const [currentComponent, setCurrentComponent] = useState(null);


 // const {identreprise} = route.params;
  //const {id} = route.params;

  const  id = 58;


  console.log("identreprise",id);
  


  const renderComponent = (component) => {
    setCurrentComponent(component);
    //console.log(component.name);

  };

  const ScheduleComponent = () => {
    return <DashboardSchedule/>;
  };

  /*const ManageComponent = () => {
    return <Manage/>;

  };*/

  const ManageComponent = ({ navigation }) => {
    const params = { param1: navigation, param2: id }; // Replace with actual parameters
    return <Manage navigation={navigation} route={{ params }} />;
};


  const HiringComponent = ({navigation}) => {
    const params = { param1: navigation, param2: id }; // Replace with actual parameters
    return <Hiring navigation={navigation} route={{ params }} />;
  };


  const DriversComponent = ({navigation}) => {
    const params = { param1: navigation, param2: id }; // Replace with actual parameters
    return <ManagementDriversComponent navigation={navigation} route={{params}} />;
  };

  const ReportComponent = () => {
    return 1;
  };



  const SettingComponent = () => {
    return <Text>Composant de paramètre</Text>;
  };

  const SupportComponent = () => {
    return <Text>Composant de support</Text>;
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


        <TouchableOpacity onPress={() => renderComponent(<ManageComponent />)}>
          <Text style={[styles.menuItemManage, { borderColor: getBorderColor('ManageComponent') }]}>
            Dashboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => renderComponent(<HiringComponent />)}>
          <Text style={[styles.menuItem, { borderColor: getBorderColor('HiringComponent') }]}>
            Hiring
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => renderComponent(<ScheduleComponent />)}>
          <Text style={[styles.menuItem, { borderColor: getBorderColor('ScheduleComponent') }]}>
            Schedule
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => renderComponent(<DriversComponent />)}>
          <Text style={[styles.menuItem, { borderColor: getBorderColor('ManagementDriversComponent') }]}>
            Management Drivers
          </Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => renderComponent(<ReportComponent />)}>
          <Text style={[styles.menuItem, { borderColor: getBorderColor('ReportComponent') }]}>
            Report
          </Text>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => renderComponent(<SettingComponent />)}>
          <Text style={[styles.menuItem, { borderColor: getBorderColor('SettingComponent') }]}>
            Setting
          </Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => renderComponent(<SupportComponent />)}>
          <Text style={[styles.menuItem, { borderColor: getBorderColor('SupportComponent') }]}>
            Support
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
    backgroundColor: 'black',
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

  menuItemManage: {
    color: '#f0f0f0',
    fontSize: 16,
    marginHorizontal: 12,  // Espace horizontal entre les éléments du menu
    borderWidth: 1,  // Ajout d'une bordure
    borderRadius: 5,  // Coins arrondis pour chaque élément
    padding: 8,
    borderRadius : '40%',
    //backgroundColor : 'red',
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
