import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from "react";
import { getCurrentToken, setToken, getUser, setUser,setoefening,Getoefening } from "./Auto";

import "../i18n/i18n";
import {useTranslation} from 'react-i18next';
const HomeScreen = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  let id;
  getUser((userid) => {
       console.log("got:" + userid)
       id = userid;
  });
  const checklogged = ()=>{
    if(id ==null){
      alert(t('skipped'));

    }else{
      navigation.navigate('Prestaties')

    }
  }
  
  const [currentLanguage,setLanguage] =useState('en');
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.screen} onPress={() => navigation.navigate('Oefeningen')}>
                <Text style={styles.title}>{t('exercises')}{' '}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.screen} onPress={() => checklogged()}>
                <Text style={styles.title}>{t('performance')}{' '}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.screen} onPress={() => navigation.navigate('About')}>
                <Text style={styles.title}>{t('about')}{' '}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.screen} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.title}>{t('logout')}{' '}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#6200ee',
    width: 200,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;