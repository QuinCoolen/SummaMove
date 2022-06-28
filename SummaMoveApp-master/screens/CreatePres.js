import { TouchableOpacity, Text, StyleSheet, View, FlatList, ActivityIndicator, Pressable, ImageBackground, Alert } from "react-native";
import { useState, useEffect } from "react";
import { getCurrentToken, setToken, getUser, setUser, setoefening, Getoefening, } from "./Auto";
import { Image } from 'react-native';
import {TextInput, Button} from "react-native-paper";

import React from 'react'

const CreatePres = ({navigation, route}) => {
  const [datum, setdatum] = useState("");
  const [starttijd, setStarttijd] = useState("");
  const [eindtijd, setEindtijd] = useState("");
  const [aantal, setAantal] = useState("1");
  console.log(route.params.naam)
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
          Create();
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
  const Create = async ()=>{
    try {
      const response = await fetch('http://localhost:8000/api/prestaties/', {
      method: 'POST',
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
      })
    });
    } catch (error) {
      console.log(error);
      Alert.alert("er is iets mis gegaan bij het aanmaken van de prestatie");
    }
    
  }

  return (
    <View style={styles.container}>
      <Text>prestatie voor {route.params.naam} aamaken </Text>
      <TextInput
        style={styles.input}
        onChangeText={(newdate) => setdatum(newdate)}
        placeholder="DD/MM/YY"
        onSubmitEditing={onSubmit}
        mode={'outlined'}
      />

      <TextInput
        style={styles.input}
        onChangeText={(newstarttijd) => setStarttijd(newstarttijd)}
        placeholder="UUR:MIN:SEC"
        onSubmitEditing={onSubmit}
        mode={'outlined'}
      />

      <TextInput
        style={styles.input}
        onChangeText={(neweindtijd) => setEindtijd(neweindtijd)}
        placeholder="UUR:MIN:SEC"
        mode={'outlined'}
      />

      <TextInput
        style={styles.input}
        onChangeText={(newAantal) => setAantal(newAantal)}
        placeholder="aantal"
        keyboardType={'numeric'} // This prop help to open numeric keyboard
        mode={'outlined'}
      />
      <Button onPress={() => {
        onSubmit();
      }} 
      mode={'outlined'} style={styles.button}>Submit</Button>
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