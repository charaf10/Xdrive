import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';



 function btnSignUp({navigation}){


    let retour = 
        <View>
            <Button 
            onPress={CALL_SIGNUP}
            
                title='Sign Up!'
                color="#841584"
              />
        </View>

        return(retour);
}


const CALL_SIGNUP = () => {
    alert("SignUP Clicked!")

    navigation.navigate("./Test");

}



export default btnSignUp