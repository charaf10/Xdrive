import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';


import Pressable_FindDriver from '../../../COMPONENTS/COM_UTILS/BUTTON/Pressable_entreprise_dash';
import Pressable_CreateOffer from '../../../COMPONENTS/COM_UTILS/BUTTON/Pressable_entreprise_dash';
import Pressable_ListDriver from '../../../COMPONENTS/COM_UTILS/BUTTON/Pressable_entreprise_dash';


export default function RecruitScreen({ route, navigation }) {
  
  const { id } = route.params;
  //const {id} = {identreprise:58};

/*
  console.log("username:", username);
  console.log("password:", password);
*/

    const separe = <br/>

  return (
    <View>
      <Text><h1>Recruit Screen {id}</h1> </Text>

      {separe}{separe}{separe}

      <Pressable_FindDriver  
      title = {"Find driver"}
      onPress={() => {
        navigation.navigate("FindDriver");
        }}/>
      {separe}










{/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      <Pressable_CreateOffer 
        title = {"Offer"}
        onPress={() => {
          navigation.navigate("PostOffer", {identreprise : id});//OfferScreen
          }}
          />
      {separe}
{/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}












      <Pressable_ListDriver  
      title = {"List of driver"}
      onPress={() => {
        //navigation.navigate("ListDriver");
        navigation.navigate("ListDriver");
        }}/>
      {separe}




    </View>
  );
}
