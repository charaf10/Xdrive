import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

/* NAVIGATION */
import * as React from 'react';

/* Imported Fichier JS */
import Bonjour from '../../Test/Bonjour';
import input from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';




function HomeScreen({ navigation }) {

    let user = "Inkonnu"
    let bonjour  = <Bonjour name={user}/>

    let btn_login = 
    


            <Button  
                onPress={() => {
                navigation.navigate("Login");
                }}
                title='LOGIN'
                color="black"
            />


    let btn_signup = <Button  
              onPress={() => {
              navigation.navigate("Signup");
              }}
              title='Sign-Up'
              color="#841584" 
              />


    let retour = 
              <View style={styles.container}>
                  {<View> {btn_login} </View>}  
              </View>

  return ([retour]);
}

export default HomeScreen



const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#D7D4CF',
      alignItems: 'center',
      justifyContent: 'center',
    },

    title:{
        textAlign: 'center',
        marginVertical: 8,

    },
  });


