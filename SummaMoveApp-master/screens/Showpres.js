import { TouchableOpacity, Text, StyleSheet, View, FlatList, ActivityIndicator, Pressable, ImageBackground } from "react-native";

import { useState, useEffect } from "react";
import { getCurrentToken, setToken, getUser, setUser,setoefening,Getoefening } from "./Auto";
import { Image } from 'react-native';
import React from 'react'


import "../i18n/i18n";
import {useTranslation} from 'react-i18next';

const Showpres = ({ navigation, route }) => {
  const {t, i18n} = useTranslation();
  const [currentLanguage,setLanguage] =useState('en');

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  let foto = "";
  const image = { uri: "https://img.freepik.com/free-vector/white-blurred-background_1034-249.jpg" };
  let idoefening = route.params.oefening.id;
  let naamoefening = route.params.oefening.naam;

    setoefening(idoefening);

  const GetUserPrestaties = async () => {
    let foto = route.params.oefening.foto;
    let AccessToken;

    getCurrentToken((token) => {
      console.log("got:" + token)
      AccessToken = token;
    });
    // get id from autojs.
    let id;
    getUser((userid) => {
      //console.log("got:" + userid)
      id = userid;
    });

    console.log(foto);
    try {
      const response = await fetch('http://localhost:8000/api/oefening/' + idoefening + '/prestatie/' + id, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + AccessToken,
        }
      });
      const json = await response.json();
      if (response.status == 200) {
        console.log(json.data);
        setData(json.data);
        setToken(json.access_token);
        setLoading(false);
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    GetUserPrestaties();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ textAlign: 'center', marginBottom: 10, }}>{t('prestext')}{' '} {route.params.oefening.naam}</Text>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={styles.container}>
                <View style={styles.divies}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                  <Text style={styles.TXT}>{t('Date')}{' '}:{item.datum}</Text>
                  <Text style={styles.TXT}>{t('Start time')}:{' '}{item.starttijd}</Text>
                  <Text style={styles.TXT}>{t('End time')}:{' '}{item.eindtijd}</Text>
                  <Text style={styles.TXT}>{t('amount')}:{' '}{item.aantal}</Text>
                  </ImageBackground>
                </View>
            </View>
          )}
        />
      )}
      <Pressable style={styles.CreateBtn}  onPress={() => { navigation.navigate('CreatePresscreen',{id: idoefening, naam:naamoefening})}}>
            <Text style={{ color:"white",margin:'auto'}}>{t('create')}{' '}</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 10,
  },
  divies: {
    overflow: 'hidden',
    borderWidth: 0.5,
    borderRadius: 20,
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#606060',
    height: 150,
    width: 400,
    marginTop:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 14,
    },
    shadowOpacity: 0.14,
    shadowRadius: 20,
  },
  TXT: {
    fontWeight:'bold',
    margin:'auto',
    color: "black",
    alignItems: 'center',

  },
  image:{
    width:"100%",
    height:"100%"
  },
  CreateBtn:{
    color:"white",
    position:'sticky',
    backgroundColor:"#6200ee",
    textAlign:"center",
    width:"100%",
    height:40,
    borderRadius:50,
  }

});

export default Showpres
