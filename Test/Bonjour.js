/* Outils  */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


/* Composants */
import BtnSIgnUp from './ButtonSignUp';
import BtnLogin from './ButtonLogin';
import Menu from './Menu';


export default function DisBonjour(props){

    let signup_com = <BtnSIgnUp/>
    let login_com = <BtnLogin/>
   
    let _name = props.name

    let retour = 
        <View style={styles.container}>
            <Text>Bonjour {_name}</Text>
            {/*<View>{signup_com} {login_com}</View>*/}
            <StatusBar style="auto" />
        </View>

        return([retour]);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });