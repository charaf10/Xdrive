import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';

function Button_basic({ title, onPress, usern, passw }) {
    
  const handleClick = () => {
    onPress(usern, passw); // Passez le titre en tant que paramètre à la fonction onPress
  };


  const leRetour =     
            <Pressable onPress={handleClick} 
            style={{
                backgroundColor:'#4885F8',
                height: 30,
                width:100,
                borderColor: 'black',
                borderRadius: 15,
                borderWidth: 1, 
                color: 'white',
                Text: 'red',
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

export default Button_basic;
