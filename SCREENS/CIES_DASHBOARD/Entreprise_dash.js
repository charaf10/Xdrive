import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SayHello from '../../COMPONENTS/COM_VIEWS/SayHello';

import Pressable_Recruit from '../../COMPONENTS/COM_UTILS/BUTTON/Pressable_entreprise_dash';
import Pressable_Manage from '../../COMPONENTS/COM_UTILS/BUTTON/Pressable_entreprise_dash';
import Pressable_Flotte from '../../COMPONENTS/COM_UTILS/BUTTON/Pressable_entreprise_dash';
import Pressable_Setting from '../../COMPONENTS/COM_UTILS/BUTTON/Pressable_entreprise_dash';


import List_driver from '../../SCREENS/CIES_DASHBOARD/Recruit/ListDriver';
import Post_offer from '../../SCREENS/CIES_DASHBOARD/Recruit/Offer/PostOffer';
import Flotte from '../../SCREENS/CIES_DASHBOARD/Flotte/FlotteScreen';
import Maps from '../../SCREENS/CIES_DASHBOARD/maps/Maps';


const Tab = createBottomTabNavigator();


export default function Entreprise_dash({ route, navigation }) {
  
  const { id, username, password } = route.params;
  //const { id } = {id:58};

  /*console.log("username:", username);
  console.log("password:", password);*/


    const separe = <br/>

  return (
    <Tab.Navigator >      
      <Tab.Screen name="List driver" component={List_driver} initialParams={{ id: id }}/>
      <Tab.Screen name="Post offer" component={Post_offer}  initialParams={{ id: id }}/>
      <Tab.Screen name="Flotte" component={Flotte}  options={{ tabBarBadge: 1 }}/>
      <Tab.Screen name="Maps" component={Maps}  options={{ tabBarBadge: 3 }}/>
    </Tab.Navigator>
  );
}







/*



      <Pressable_Recruit  
      title = {"Recruit"}
      onPress={() => {
        navigation.navigate("RecruitScreen", {id: id});
        }}/>
      {separe}
      
      
      
      */