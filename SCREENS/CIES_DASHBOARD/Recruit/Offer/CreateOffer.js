import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, label, Pressable } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';

/*Import for database */
import axios from 'axios';
import myip from '../../../../IP';


/* IMPORTATION DES OUTILS DONT CETTE SCREEN A BESOIN (2 INPUTS (USER,PASS) ET 2 BUTTONS (LOGIN-SIGNUP)) */
import InputTitle from '../../../../COMPONENTS/COM_UTILS/TEXTBOX/Input_create_offer';
import InputDesc from '../../../../COMPONENTS/COM_UTILS/TEXTBOX/Input_create_offer';
import InputDatestart from '../../../../COMPONENTS/COM_UTILS/TEXTBOX/Input_create_offer';
import InputDateend from '../../../../COMPONENTS/COM_UTILS/TEXTBOX/Input_create_offer';
import InputSchedule from '../../../../COMPONENTS/COM_UTILS/TEXTBOX/Input_create_offer';
import InputNbdriver from '../../../../COMPONENTS/COM_UTILS/TEXTBOX/Input_create_offer';
import InputIdentreprise from '../../../../COMPONENTS/COM_UTILS/TEXTBOX/Input_create_offer';
import InputStatus from '../../../../COMPONENTS/COM_UTILS/TEXTBOX/Input_create_offer';


import Button_basic from '../../../../COMPONENTS/COM_UTILS/BUTTON/Button_create_offer';

import Com_select_vehicule from '../../../../COMPONENTS/COM_UTILS/SELECT/select_name_vehicule';
import Com_select_shift from '../../../../COMPONENTS/COM_UTILS/SELECT/select_name_shift';

// title desc datestart dateend schedule nbdriver identreprise status



export default function CreateOffer({route, navigation}){

    /*VARIABLE DE RECUPERATION DES DATAS DE SIGNUP (FIRSTNAME, LASTNAME, EMAIL, USERNAME & PASSWORD) */
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [datestart, setDatestart] = React.useState('');
    const [dateend, setDateend] = React.useState('');
    const [schedule, setSchedule] = React.useState('');
    const [nbdriver, setNbdriver] = React.useState('');

    const [selectedVehicule, setSelectedVehicule] = useState('');
    const [selectedShift, setSelectedShift] = useState('');




    const {identreprise} = route.params;
    //const {identreprise} = {identreprise:58};
    const [status, setStatus] = React.useState('off');


    const [data, setData] = useState([]);



    /* les labels username et password */
    const label_title = "title: "
    const label_desc = "description: "
    const label_datestart = "datestart: "
    const label_dateend = "dateend: "
    const label_schedule = "schedule: "
    const label_nbdriver = "nbdriver: "
    const label_typeVehicule = "type Vehicule: "
    const label_typeShift = "type Shift: "



    
    
    const Insert_offer = () =>{

        if (title == "" || desc == "" || datestart == "" || dateend == "" || schedule == "" || nbdriver == "" || status == "") {
            alert("remplir tous les champs")
        } else {
            

        axios.post('http://' + myip +':80/link/entreprise/InsertOffer.php', {
         
         Title: title,
         Desc: desc,
         Datestart: datestart,
         Dateend: dateend,
         Schedule: schedule,
         Nbdriver: nbdriver,
         Identreprise: identreprise,
         TypeVehicule: selectedVehicule,
         TypeShift: selectedShift,
         Location: "location",
         Status: status
        })
    
        .then((response) => {
            console.log(response);
            alert("Insert Success");
            //navigation.navigate("PostOffer", {identreprise: identreprise});


/*================================REFRESH DATA==================================================== */
          axios.post('http://' + myip +':80/link/entreprise/SelectListOffer.php', {id_utilisateur : identreprise})
          .then(response => {
            //setData(response.data);
    
            const transformedData = response.data.map(item => ({
              id: item.id,
              title: item.title,
              status: item.status,
              }));
            setData(transformedData);


          })
          .catch(error => {
            console.error(error);
          });
/*================================REFRESH DATA==================================================== */
        navigation.navigate("PostOffer", {identreprise : identreprise});//OfferScreen

        })
        


        .catch((error) => {
          console.error(error);
          alert("Echec Request");
    
        });
    
    }
    
}






    /* UPDATE DES DATAS LORSQUE LES INPUT CHANGE DE TEXT */
    const TextInputTitle = (text) => {
        setTitle(text)
    };                
    const TextInputDesc = (text) => {
        setDesc(text)
    };    
    const TextInputDatestart= (text) => {
        setDatestart(text)
    };
    const TextInputDateend = (text) => {
        setDateend(text)
    };    
    const TextInputSchedule = (text) => {
        setSchedule(text)
    }; 
    const TextInputNbdriver = (text) => {
        setNbdriver(text)
    };


    
    const handleSelectVehicule = value => {
        setSelectedVehicule(value);

      };
      const handleSelectShift = value => {
        setSelectedShift(value);

      };


/*
      useEffect(() => {
        console.log(selectedVehicule);
      }, [selectedVehicule]);
      
      useEffect(() => {
        console.log(selectedShift);
      }, [selectedShift]);
    */



// title desc datestart dateend schedule nbdriver identreprise status




        /* COMPOSANT TEXTINPUT LOGIN && SIGNUP AVEC L'ACTION ATTENDU DANS LES PARAMAS DANS LE COMPOSANT */
        const input_title = <InputTitle
        action={TextInputTitle}
        />
            const input_desc = <InputDesc
            action={TextInputDesc}
        />
        const input_datestart = <InputDatestart
        action={TextInputDatestart}
        />
        const input_dateend = <InputDateend
        action={TextInputDateend}
        />
        const input_schedule = <InputSchedule
        action={TextInputSchedule}
        />
        const input_nbdriver = <InputNbdriver
        action={TextInputNbdriver}
        />            

    




            const button_signup = <Button_basic 
                title={"Sign up"} 
                onPress={Insert_offer}
                title1={title}
                desc={desc}
                datestart={datestart}
                dateend={dateend}
                schedule={schedule}
                nbdriver={nbdriver}
                identreprise={identreprise}
                typeVehicule={selectedVehicule}
                typeShift={selectedShift}
                location={location}
                status={status}
            />

            let leRetour = 
            <View style={styles.container}>



            <Text style={{
            fontSize:40,
            color:'black',
            borderColor:'blue',

            }}>
            Create offer
            </Text>

            <br/><br/> 

            <Text style={{
            color:'whitesilver',
            }}>
            {[label_title,<br/>, input_title]}
            <br/> 
            {[label_desc,<br/>, input_desc]}
            <br/> 
            {[label_datestart,<br/>, input_datestart]}
            <br/> 
            {[label_dateend,<br/>, input_dateend]}
            <br/> 
            {[label_schedule,<br/>, input_schedule]}
            <br/> 
            {[label_nbdriver,<br/>, input_nbdriver]}
            <br/>  
            {[
                label_typeVehicule, 
                <br/>, 
                <Com_select_vehicule selectedValue={selectedVehicule} onChange={handleSelectVehicule}/>
            ]}
            {[
                <br/>,
                label_typeShift,
                <br/>,
                <Com_select_shift selectedValue={selectedShift} onChange={handleSelectShift}/>,
                <br/>
            ]}

           
            

            </Text>
            <br/> 
            <br/> 

<Text style={styles.signup}>{ button_signup }</Text>
</View>

        return([leRetour]);
}


const CALL_CreateOffer = () => {
    alert("CreateOffer Clicked!")
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
