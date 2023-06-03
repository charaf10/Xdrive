 
 
 
 import { StatusBar } from 'expo-status-bar';
 import { StyleSheet, Text, View, Button, TextInput, label, Pressable } from 'react-native';
 import * as React from 'react';
 
 
 /*Import for database */
 import axios from 'axios';
 import myip from '../../IP';
 
 
 /* IMPORTATION DES OUTILS DONT CETTE SCREEN A BESOIN (2 INPUTS (USER,PASS) ET 2 BUTTONS (LOGIN-SIGNUP)) */
 import InputUsername from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
 import InputPassword from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
 
 import Button_basic from '../../COMPONENTS/COM_UTILS/BUTTON/Button_basic';
 import Button_sign from '../../COMPONENTS/COM_UTILS/BUTTON/Button_sign';
 
 
 import Pressable_ from '../../COMPONENTS/COM_UTILS/BUTTON/Pressable_entreprise_dash';
 
 
 
 export default function LOGIN({navigation}){

 
 
 
 
 /* COMPOSANT BUTTON LOGIN && SIGNUP IMPORTED AND STOCKED ON VARIABLE */

const button_login_driver = <Button_sign
 title={"Je suis un driver"} 
 onPress={() => {
 navigation.navigate("LoginDriver");
 }}
 />

const button_login_entreprise = <Button_sign 
 title={"Je suis une entreprise"} 
 onPress={() => {
 navigation.navigate("LoginEntreprise");
 }}
 />


 let leRetour = 
 <View style={{ 
     marginTop:'-30%',
     marginLeft:'-10%',  
     flex:1,
     alignItems: 'center',
     justifyContent: 'center',
     marginLeft:4,
     }}>
     <Text style={{
             fontSize:40,
         }}>
             Log in
     </Text>
         <br/><br/> 
    

     <Text style={{marginTop:20}} >{[button_login_driver ]}</Text>

     <Text style={{marginTop:20}}>{[button_login_entreprise ]}</Text>
 </View>


return([leRetour]);

}
