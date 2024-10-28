import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { useState } from 'react';
import SayHello from '../../COMPONENTS/COM_VIEWS/SayHello';

import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
 
import Pressable_test from '../../COMPONENTS/COM_UTILS/BUTTON/Pressable_driver_dash';
import react from 'react';
import Test from '../../Test/Test';
import FindDriver from '../CIES_DASHBOARD/Recruit/FindDriver';

import Profil from './profil/Profil';
import Dashboard from './Dashboard';
import Maps from './maps/Maps';




const Tab = createBottomTabNavigator();



export default function Driver_dash({ route, navigation }) {
  
  const { id, username, password } = route.params;
  //const { id  } = 28;

  /*console.log("username:", username);*/
  console.log("id:", id);


    const separe = <br/>

  return (

    
    <Tab.Navigator >      
      <Tab.Screen name="Profil" component={Profil} initialParams={{ id: id }}/>
      <Tab.Screen name="Dashboard" component={Dashboard}  initialParams={{ id: id }}/>
      <Tab.Screen name="Maps" component={Maps}  options={{ tabBarBadge: 3 }}/>
    </Tab.Navigator>

          );
    }




 {/*   
 
 <View>
      <Text><h1>Driver_dashBoard</h1> </Text>

      <SayHello id={username}/>
      {separe}{separe}{separe}
 
       <Pressable_test  
      title = {"Find Work"}
      onPress={() => {
        navigation.navigate("Offer_list", {id: id});
        }}/>
      {separe}
    </View>


 */}




