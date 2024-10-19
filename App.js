import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

/* NAVIGATION t*/
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* Imported Fichier JS DE TEST */
import Test from './Test/Test';
import Test2 from './Test/Test_2';
import LongPressOffer from './COMPONENTS/COM_VIEWS/CIES/Long_press_offer';

/*Developpement*/

/* Screen login  && signup */
import HomeScreen from './SCREENS/HOME/HomePage'
import Login from './SCREENS/LOGIN/Login';
import LoginEntreprise from './SCREENS/LOGIN/LoginEntreprise';
import LoginDriver from './SCREENS/LOGIN/LoginDriver';
import Signup_driver from './SCREENS/SIGN_UP/Signup_driver';
import Signup_entreprise from './SCREENS/SIGN_UP/Signup_entreprise';

/* Screen Entreprise Dash */
import Entreprise_dash from './SCREENS/CIES_DASHBOARD/Entreprise_dash';
import RecruitScreen from './SCREENS/CIES_DASHBOARD/Recruit/RecruitScreen';
import ManageScreen from './SCREENS/CIES_DASHBOARD/Manage/ManageScreen';
import FlotteScreen from './SCREENS/CIES_DASHBOARD/Flotte/FlotteScreen';
import MapsEntreprise from './SCREENS/CIES_DASHBOARD/maps/Maps';
import SettingScreen from './SCREENS/CIES_DASHBOARD/Settings/SettingScreen';
import WorkerScreenBaseCards from "./SCREENS/CIES_DASHBOARD/ScreenBaseCards";


/* Screen offer  */
import OfferScreen from './SCREENS/CIES_DASHBOARD/Recruit/Offer/Offer';
import PostOffer from './SCREENS/CIES_DASHBOARD/Recruit/Offer/PostOffer';
import ListApply from './SCREENS/CIES_DASHBOARD/Recruit/ListApply';


/* Screen Recruit Dash */
import CreateOffer from './SCREENS/CIES_DASHBOARD/Recruit/Offer/CreateOffer';
import FindDriver from './SCREENS/CIES_DASHBOARD/Recruit/FindDriver';
import ListDriver from './SCREENS/CIES_DASHBOARD/Recruit/ListDriver';
import Details_driver from './SCREENS/CIES_DASHBOARD/Show_detail_driver';
import driverProfil from './SCREENS/CIES_DASHBOARD/Driver';

/* Screen base Entreprise*/ 
import ListDriverSmall from './SCREENS/CIES_DASHBOARD/Recruit/ListDriver_small';
import Grid from './SCREENS/CIES_DASHBOARD/Flotte/Grille';
import Section from './COMPONENTS/FUNCT/Section';



/*DRIVER SIDE */
import Driver_dash from './SCREENS/DRIVER_DASHBOARD/Driver_dash';
import Offer_list from './SCREENS/DRIVER_DASHBOARD/FindWork/ListOfferDriver';

/* CREATE PROFIL */
import Create_profil from './SCREENS/DRIVER_DASHBOARD/profil/Create_profil';
import Maps from './SCREENS/DRIVER_DASHBOARD/maps/Maps';


/* SCHEDULE */
import dashboard from './SCREENS/Schedule/SCH_screen/dashboard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const App = () => {


  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MapsEntreprise"> 

        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Test_2" component={Test2} />

        <Stack.Screen name="LongPressOffer" component={LongPressOffer} />

           {/* APPLICATION */}
          <Stack.Screen name="MyHome" component={HomeScreen} />

          <Stack.Screen name="Login" component={Login} />


          <Stack.Screen name="LoginEntreprise" component={LoginEntreprise} />
          <Stack.Screen name="Signup_driver" component={Signup_driver} />
          <Stack.Screen name="Signup_entreprise" component={Signup_entreprise} />
           {/* ENTREPRISE DASHBOARD */}
           <Stack.Screen name="WorkerScreenBaseCards" component={WorkerScreenBaseCards}  />
          <Stack.Screen name="Entreprise_dash" component={Entreprise_dash} />
          <Stack.Screen name="RecruitScreen" component={RecruitScreen} />
          <Stack.Screen name="ManageScreen" component={ManageScreen} />
          <Stack.Screen name="FlotteScreen" component={FlotteScreen} />
          <Stack.Screen name="SettingScreen" component={SettingScreen} />

          <Stack.Screen name="OfferScreen" component={OfferScreen} />
          <Stack.Screen name="PostOffer" component={PostOffer} />
          <Stack.Screen name="ListApply" component={ListApply} />


          <Stack.Screen name="FindDriver" component={FindDriver} />
          <Stack.Screen name="CreateOffer" component={CreateOffer} />
          <Stack.Screen name="ListDriver" component={ListDriver} />
          <Stack.Screen name="Details_driver" component={Details_driver} />
          <Stack.Screen name="driverProfil" component={driverProfil} />
          
          <Stack.Screen name="MapsEntreprise" component={MapsEntreprise} />
          

          <Stack.Screen name="ListDriverSmall" component={ListDriverSmall} />
          <Stack.Screen name="Grid" component={Grid} />
          <Stack.Screen name="Section" component={Section} />


          <Stack.Screen name="dashboard" component={dashboard} />


           {/* Driver DASHBOARD */}
           <Stack.Screen name="LoginDriver" component={LoginDriver} />
           <Stack.Screen name="Driver_dash" component={Driver_dash} />
           <Stack.Screen name="Offer_list" component={Offer_list} />

           <Stack.Screen name="Create_profil" component={Create_profil} />
           <Stack.Screen name="Maps" component={Maps} />






           {/* HIRING (ENTREPRISE) */}
           {/* HIRING (ENTREPRISE) */}






           {/* MANAGEMENT DISPATCH (ENTREPRISE)*/}
           {/* MANAGEMENT DISPATCH (ENTREPRISE)*/}










           {/* SCHEDULE (ENTREPRISE)*/}
           {/* SCHEDULE (ENTREPRISE)*/}












           {/* REPORT (ENTREPRISE)*/}
           {/* REPORT (ENTREPRISE)*/}













           {/* SETTING (ENTREPRISE)*/}
           {/* SETTING (ENTREPRISE)*/}









        </Stack.Navigator>




      </NavigationContainer>
  );
}

export default App




