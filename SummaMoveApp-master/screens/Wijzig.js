import { TouchableOpacity, Text, StyleSheet, View, FlatList, ActivityIndicator, Pressable, ImageBackground, Alert } from "react-native";
import { useState, useEffect } from "react";
import { getCurrentToken, setToken, getUser, setUser, setoefening, Getoefening, } from "./Auto";
import { Image } from 'react-native';
import {TextInput, Button} from "react-native-paper";

import React from 'react'

import "../i18n/i18n";
import {useTranslation} from 'react-i18next';
const CreatePres = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const [currentLanguage,setLanguage] =useState('en');

  const [datum, setdatum] = useState(route.params.prestatie.datum);
  const [starttijd, setStarttijd] = useState(route.params.prestatie.starttijd);
  const [eindtijd, setEindtijd] = useState(route.params.prestatie.eindtijd);
  const [aantal, setAantal] = useState(route.params.prestatie.aantal);
  
  let id = route.params.prestatie.id;
  let AccessToken;
    getCurrentToken((token) => {
      // console.log("got:" + token)
      AccessToken = token;
    });

  let oefeningid ="";
  Getoefening((oefeningid) => {
    console.log(oefeningid)
    oefeningid = oefeningid;
  });

  let Userid;
  getUser((userid) => {
    // console.log("got:" + userid)
    Userid = userid;
  });

  const validateDate = (date) => {
    var re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    return re.test(date);
  };
  const validatetime = (time) => {
    var re = /([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/g;
    return re.test(time);

  }
  const onSubmit = () => {
    if (validateDate(datum)) {
       console.log("right date")

       if (validatetime(starttijd)) {
         console.log("right time")
         if (validatetime(eindtijd)) {
            updatepres();
          navigation.navigate('Prestaties')
         } 
         else {
           console.log("wrong time start tijd")
         }
       } else {
         console.log("wrong time")
       }
     } else {
       console.log("wrong date")
     }
  }
  const updatepres = async ()=>{
   
    try {
        const response = await fetch('http://localhost:8000/api/prestaties/'+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json",
          Authorization: "Bearer "+AccessToken,       
        },
        body: JSON.stringify({
          datum: datum,
          starttijd: starttijd,
          eindtijd: eindtijd,
          oefeningid: route.params.id,
          userid : Userid,
          aantal:aantal
        }),
        
      });
      const json = await response.json();
      if (response.status == 200) {
        console.log(json.data);
        setToken(json.access_token);
      }
      } catch (error) {
        console.log(error);
        Alert.alert("er is iets mis gegaan bij het Wijzigen van je prestatie");
      }
  }

  return (
    <View style={styles.container}>
        
      <TextInput
        style={styles.input}
        onChangeText={(newdate) => setdatum(newdate)}
        defaultValue = {datum}
        placeholder="DD/MM/YY"
        onSubmitEditing={onSubmit}
        mode={'outlined'}
      />

      <TextInput
        style={styles.input}
        onChangeText={(newstarttijd) => setStarttijd(newstarttijd)}
        value = {starttijd}
        placeholder="UUR:MIN:SEC"
        onSubmitEditing={onSubmit}
        mode={'outlined'}
      />

      <TextInput
        style={styles.input}
        onChangeText={(neweindtijd) => setEindtijd(neweindtijd)}
        defaultValue = {eindtijd}
        placeholder="UUR:MIN:SEC"
        mode={'outlined'}
      />

      <TextInput
        style={styles.input}
        onChangeText={(newAantal) => setAantal(newAantal)}
        defaultValue = {aantal}
        placeholder={t('amount')}
        keyboardType={'numeric'} // This prop help to open numeric keyboard
        mode={'outlined'}
      />
      <Button onPress={() => {
        onSubmit();
      }} 
      mode={'outlined'} style={styles.button}>{t('edit')}{' '}</Button>
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '90%'
  },
  button: {
    marginTop: 25,
  }
});


export default CreatePres