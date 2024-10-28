import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';

function Button_sign({ title, onPress, nom, noentreprise, passw, domain, phone, email}) {
    
  const handleClick = () => {
    onPress(nom, noentreprise, passw, domain, phone, email); // Passez le titre en tant que paramètre à la fonction onPress
  };


  const leRetour =     
            <Pressable onPress={handleClick} 
            style={{
                backgroundColor:'white',
                height: 30,
                width:180,
                borderRadius: 15,
                borderColor: '#0FC2C0',
                borderWidth: 2, 
                color: 'white',
                alignItems: 'center',
                justifyContent: 'center', 
                 
                 
                }}>

                <View>
                    <Text
                        style={{
                            color:'black',
                        }}>
                        {title}
                    </Text>
                </View>

            </Pressable>

  return (leRetour);
}

export default Button_sign;
