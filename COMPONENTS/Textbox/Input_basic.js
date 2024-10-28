import {TextInput } from 'react-native';
import * as React from 'react';


const UselessTextInput = ({title, action}) => {


    const [valeur, setvaleur] = React.useState("")

    const handleTextInputChange = (text) => {
        setvaleur(text);
        // Appeler la fonction action avec la valeur du TextInput
        action(text);
      };


const txt1 =   <TextInput
                style={{ height: 30, borderColor: 'gray', borderWidth: 1, borderRadius:5,}}
                placeholder={title}
                onChangeText={handleTextInputChange}
                value={valeur}
                /> 


                return([txt1]);
}



export default UselessTextInput

