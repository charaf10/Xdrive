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


/*CETTE SCREEN LOGIN CONTIENT USERNAME & PASSWORD INFO + UN BUTTON LOGIN 
                + UNE REDIRECTION VERS SIGN-UP */
export default function LOGIN({navigation}){


    /*VARIABLE DE RECUPERATION DES DATAS DE CONNEXION (USERNAME & PASSWORD) */
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    /* les labels username et password */
    const label_username = "Username: "
    const label_password = "Password: "



      /*CETTE FONCTION EST APPELÉ LORSQU'IL YA  UN CLIC SUR LOGIN */
  const Login_Press = () => {

    console.log("Username = " + username);
    console.log("Password = " + password);


    
    axios.post('http://' + myip +':80/link/driver/LoginDriver.php', {
     
     Username: username,
     Password: password,

    })
    .then((response) => {
        let result = response.data[0].Message
        let resultId = response.data[1].MessageId
        console.log("result : " + result)
        console.log("resultId :" + resultId)
        //let resultIdTesting = 16
        if (result == "correct") {
            //alert("id: " + resultId);
            navigation.navigate("Driver_dash",{id: resultId, username: username, password: password});
        } else if(result == "incorrect") {
            alert("Oups!");
        }
        else{
            alert("Info incorrect!");
        }
    })
    
    .catch((error) => {
      console.error(error);
      alert("Echec Request");

    });
  }



  


    /* UPDATE DES DATAS LORSQUE LES INPUT CHANGE DE TEXT */
    const TextInputUsername = (text) => {
        setUsername(text)
    };                
    const TextInputPassword = (text) => {
        setPassword(text)
    };


    /* COMPOSANT TEXTINPUT LOGIN && SIGNUP AVEC L'ACTION ATTENDU DANS LES PARAMAS DANS LE COMPOSANT */
        const input_username = <InputUsername
        action={TextInputUsername}
    />
    const input_password = <InputPassword
        action={TextInputPassword}
    />

    


    /* COMPOSANT BUTTON LOGIN && SIGNUP IMPORTED AND STOCKED ON VARIABLE */
    const button_login = <Button_basic 
                                title={"Login"} 
                                onPress={Login_Press}
                                usern={username}
                                passw={password}
                                />
    const button_signUp_driver = <Button_sign
                                title={"SignUp !"} 
                                onPress={() => {
                                navigation.navigate("Signup_driver");
                                }}
                                />

    let leRetour = 
        <View style={{ 
            marginTop:'-5%',
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
                <Text>
                    {[label_username, <br/>, input_username]}
                    <br/> 
                    {[label_password, <br/>, input_password]}
     
                </Text>
                <br/> 

                <Text >{[button_login ]}</Text>
                <br/><br/>


            <Text>{[button_signUp_driver ]}</Text>

        </View>

    
return([leRetour]);

}


