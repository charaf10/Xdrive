import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function BTN_LOGIN({navigation}){

    let btn = 
    
    <Button  
        onPress={() => {
        navigation.navigate("Test");
        }}
        title='go to test page...'
        color="#116BF7" 
    />




    let retour = 
        <View>
            <Text>je suis le composant ButtonLogin</Text>
            {btn}
        </View>

        return([retour]);
}


const CALL_LOGIN = () => {
    alert("SignUP Clicked!")
}




