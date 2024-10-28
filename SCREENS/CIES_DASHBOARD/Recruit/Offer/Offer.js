import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';


import Pressable_FindDriver from '../../../../COMPONENTS/COM_UTILS/BUTTON/Pressable_entreprise_dash';
import Pressable_ListDriver from '../../../../COMPONENTS/COM_UTILS/BUTTON/Pressable_entreprise_dash';

import Pressable_CreateOffer from '../../../../COMPONENTS/COM_UTILS/BUTTON/Pressable_entreprise_dash';

export default function RecruitScreen({ route, navigation }) {
  
  //const { id } = route.params;
  const  id  = 58;
/*
  console.log("username:", username);
  console.log("password:", password);
*/

    const separe = <br/>

  return (
    <View>
      <Text><h1>Offer Screen {id}</h1> </Text>

      {separe}{separe}{separe}

      <Pressable_FindDriver  
      title = {"Create offer"}
      onPress={() => {
        navigation.navigate("CreateOffer", {identreprise: id});
        }}/>
      {separe}

      <Pressable_CreateOffer 
        title = {"My offer"}
        onPress={() => {
          //navigation.navigate("PostOffer", {identreprise: id});
          navigation.navigate("PostOffer", {identreprise: id});
          }}
          />





    </View>
  );
}
