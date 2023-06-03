import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, label, Pressable } from 'react-native';
import * as React from 'react';

/*Import for database */
import axios from 'axios';
import myip from '../../IP';

// `firstname`, `lastname`, `username`, `password`, `birth`, `address`, `city`, `coutry` , `licence` , `email`, `phone` , `sign`

/* IMPORTATION DES OUTILS DONT CETTE SCREEN A BESOIN (2 INPUTS (USER,PASS) ET 2 BUTTONS (LOGIN-SIGNUP)) */
import InputFirstname from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputLastname from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputUsername from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputPassword from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputBirth from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputAddress from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputCity from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputCountry from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputLicence from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputEmail from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputPhone from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';
import InputSign from '../../COMPONENTS/COM_UTILS/TEXTBOX/Input_basic';

import Button_basic from '../../COMPONENTS/COM_UTILS/BUTTON/Button_sign';
import { add } from 'react-native-reanimated';


/*CETTE SCREEN SIGN-UP */
export default function SignUp({navigation}){


    /*VARIABLE DE RECUPERATION DES DATAS DE SIGNUP (FIRSTNAME, LASTNAME, EMAIL, USERNAME & PASSWORD) */
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [birth, setbirth] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [licence, setLicence] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [sign, setSign] = React.useState('');

    /* les labels username et password */
    const label_firstname = "Firstname: "
    const label_lastname = "Lastname: "
    const label_username = "Username: "
    const label_password = "Password: "
    const label_birth = "Birth: "
    const label_address = "Address: "
    const label_city = "City: "
    const label_country = "Country: "
    const label_licence = "Licence: "
    const label_email = "Email: "
    const label_phone = "Phone: "
    const label_sign = "Sign: "


    
    const Insert_driver = () =>{

        if (firstname == "" || lastname == "" || username == "" || password == "" || birth == "" || address == "" || city == "" || country == "" || licence == "" || email == "" || phone == "" || sign == "") {
            alert("remplir tous les champs")
        } else {
            

        axios.post('http://' + myip +':80/link/driver/Signup_driver.php', {
         
         Firstname: firstname,
         Lastname: lastname,
         Username: username,
         Password: password,
         Birth: birth,
         Address: address,
         City: city,
         Country: country,
         Licence: licence,
         Email: email,
         Phone: phone,
         Sign : sign
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

/* `firstname`,
 `lastname`,
  `username`,
   `password`,
    `birth`,
     `address`,
      `city`,
       `coutry` ,
        `licence` ,
         `email`,
          `phone` ,
           `sign`

    /* UPDATE DES DATAS LORSQUE LES INPUT CHANGE DE TEXT */
    const TextInputFirstname = (text) => {
        setFirstname(text)
    };

    const TextInputLastname = (text) => {
        setLastname(text)
    };  
    const TextInputUsername = (text) => {
        setUsername(text)
    }; 
    const TextInputPassword = (text) => {
        setPassword(text)
    }; 
    const TextInputBirth = (text) => {
        setbirth(text)
    }; 
    const TextInputAddress = (text) => {
        setAddress(text)
    }; 
    const TextInputCity = (text) => {
        setCity(text)
    }; 
    const TextInputCountry = (text) => {
        setCountry(text)
    };
    const TextInputLicence = (text) => {
        setLicence(text)
    };  
    const TextInputEmail = (text) => {
        setEmail(text)
    };
    const TextInputPhone = (text) => {
        setPhone(text)
    }; 
    const TextInputSign = (text) => {
        setSign(text)
    };  
    


        /* COMPOSANT TEXTINPUT LOGIN && SIGNUP AVEC L'ACTION ATTENDU DANS LES PARAMAS DANS LE COMPOSANT */
        const input_firstname = <InputFirstname
        action={TextInputFirstname}
        />
            const input_lastname = <InputLastname
            action={TextInputLastname}
        />
        const input_username = <InputUsername
        action={TextInputUsername}
        />
        const input_password = <InputPassword
        action={TextInputPassword}
        />
        const input_birth = <InputBirth
        action={TextInputBirth}
        />
        const input_address = <InputAddress
        action={TextInputAddress}
        />
        const input_city = <InputCity
        action={TextInputCity}
        />
        const input_country = <InputCountry
        action={TextInputCountry}
        />
        const input_licence = <InputLicence
        action={TextInputLicence}
        />
        const input_email = <InputEmail
        action={TextInputEmail}
        />
        const input_phone = <InputPhone
        action={TextInputPhone}
        />
        const input_sign = <InputSign
        action={TextInputSign}
        />

    

    
    const button_signup = <Button_basic 
                            title={"Sign up"} 
                            onPress={Insert_driver}
                            firstname={firstname}
                            lastname={lastname}
                            username={username}
                            password={password}
                            birth={birth}
                            address={address}
                            city={city}
                            country={country}
                            licence={licence}
                            email={email}
                            phone={phone}
                            sign={sign}
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
                        {[label_firstname,<br/>, input_firstname]}
                        <br/> 
                        {[label_lastname,<br/>, input_lastname]}
                        <br/> 
                        {[label_username,<br/>, input_username]}
                        <br/>                     
                        {[label_password,<br/>, input_password]}
                        <br/> 

                        
                        {[label_birth,<br/>, input_birth]}
                        <br/> 
                        {[label_address,<br/>, input_address]}
                        <br/> 
                        {[label_city,<br/>, input_city]}
                        <br/> 
                        {[label_country,<br/>, input_country]}
                        <br/> 
                        {[label_licence,<br/>, input_licence]}
                        <br/> 
                        {[label_email,<br/>, input_email]}
                        <br/> 
                        {[label_phone,<br/>, input_phone]}
                        <br/>                     
                        {[label_sign,<br/>, input_sign]}
                        <br/> 


                 
               
                </Text>
                <br/> 
                <br/> 

                <Text style={styles.signup}>{ button_signup }</Text>
        </View>


return([leRetour]);

  
}


  const styles = StyleSheet.create({
    container:{
        marginTop:'-25%',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'grey',
    },
  })




