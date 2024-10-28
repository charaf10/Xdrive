import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, label, Pressable } from 'react-native';
import * as React from 'react';

/*Import for database */
import axios from 'axios';
import {myip, mydbAPI} from '../../IP';


/* IMPORTATION DES OUTILS DONT CETTE SCREEN A BESOIN (2 INPUTS (USER,PASS) ET 2 BUTTONS (LOGIN-SIGNUP)) */
import InputNom from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputNoentreprise from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputPassword from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputDomain from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputPhone from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputEmail from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';

import Button_basic from '../../COMPONENTS/COM_UTILS/BUTTON/Button_sign';


/*CETTE SCREEN SIGN-UP */
export default function SignUp({navigation}){


    /*VARIABLE DE RECUPERATION DES DATAS DE SIGNUP (FIRSTNAME, LASTNAME, EMAIL, USERNAME & PASSWORD) */
    const [nom, setNom] = React.useState('');
    const [noentreprise, setNoentreprise] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [domain, setDomain] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');

    /* les labels username et password */
    const label_nom = "Nom: "
    const label_noentreprise = "No entreprise: "
    const label_password = "Password: "
    const label_domain = "Domain: "
    const label_phone = "Phone: "
    const label_email = "Email: "



    
    const Insert_entreprise = () =>{

        if (nom == "" || noentreprise == "" || password == "" || domain == "" || phone == "" || email == "") {
            alert("remplir tous les champs")
        } else {
            

        axios.post('http://' + myip +':80/link/entreprise/Signup_entreprise.php', {
         
         Name: nom,
         Noentreprise: noentreprise,
         Password: password,
         Domain: domain,
         Phone: phone,
         Email: email
        })
    
        .then((response) => {
            console.log(response);
            alert("Insert Success");
            navigation.navigate("Login");
        })
        
        .catch((error) => {
          console.error(error);
          alert("Echec Request");
    
        });
    
    }
    
}


    /* UPDATE DES DATAS LORSQUE LES INPUT CHANGE DE TEXT */
    const TextInputNom = (text) => {
        setNom(text)
    };                
    const TextInputNoentreprise = (text) => {
        setNoentreprise(text)
    };    
    const TextInputPassword = (text) => {
        setPassword(text)
    };
    const TextInputDomain = (text) => {
        setDomain(text)
    };    
    const TextInputPhone = (text) => {
        setPhone(text)
    }; 
    const TextInputEmail = (text) => {
        setEmail(text)
    };
    


        /* COMPOSANT TEXTINPUT LOGIN && SIGNUP AVEC L'ACTION ATTENDU DANS LES PARAMAS DANS LE COMPOSANT */
        const input_nom = <InputNom
        action={TextInputNom}
        />
            const input_noentreprise = <InputNoentreprise
            action={TextInputNoentreprise}
        />
        const input_password = <InputPassword
        action={TextInputPassword}
        />
        const input_domain = <InputDomain
        action={TextInputDomain}
        />
        const input_phone = <InputPhone
        action={TextInputPhone}
        />
        const input_email = <InputEmail
        action={TextInputEmail}
        />
    

    
    const button_signup = <Button_basic 
                            title={"Sign up"} 
                            onPress={Insert_entreprise}
                            nom={nom}
                            noentreprise={noentreprise}
                            passw={password}
                            domain={domain}
                            phone={phone}
                            email={email}
                            />

    let leRetour = 
        <View style={styles.container}>



            <Text style={{
                    fontSize:40,
                }}>
                    Sign up
            </Text>
                <br/><br/> 
                <Text>
                    {[label_nom,<br/>, input_nom]}
                    <br/> 
                    {[label_noentreprise,<br/>, input_noentreprise]}
                    <br/> 
                    {[label_password,<br/>, input_password]}
                    <br/> 
                  {[label_domain,<br/>, input_domain]}
                    <br/> 
                  {[label_phone,<br/>, input_phone]}
                    <br/> 
                    {[label_email,<br/>, input_email]}
                    <br/> 
               
                </Text>
                <br/> 
                <br/> 

                <Text style={styles.signup}>{ button_signup }</Text>
        </View>


return([leRetour]);

  
}

  /*CETTE FONCTION EST APPELÉ LORSQU'IL YA  UN CLIC SUR LOGIN */
  const Sign_Press = (nom, noentreprise, password, domain, phone, email) => {

    console.log("Nom = " + nom);
    console.log("No entreprise = " + noentreprise);
    console.log("Password = " + password);
    console.log("Domain = " + domain);
    console.log("Phone = " + phone);
    console.log("Email = " + email);
    console.log("=================================");

  };


  const styles = StyleSheet.create({
    container:{
        marginTop:'-25%',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'grey',
    },
  })




