import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { getCurrentToken, setToken, getUser, setUser,setoefening,Getoefening,getBeschrijving } from "./Auto";


const bekijkoefening = ({ navigation, route }) => {
  let Language ;

  let lang ="";
  getBeschrijving((token) => {
  console.log("got:" + token)
  lang = token;
});
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
 
  if(lang == "en"){ 
    Language = route.params.oefening.beschrijvingENG;
  }
  else{
    Language = route.params.oefening.beschrijvingNL;
  }
  let foto = "";
  foto = route.params.oefening.foto
  console.log(foto);
  const Item = () => (
    <View style={styles.container}  >
      <View style={styles.divies}  >
        <Image style={{ width: 400, height: 300, marginTop: 0 }} source={{ uri: foto, }}></Image>
        <Text style={{fontSize:30,}}>{route.params.oefening.naam}</Text>
        <Text style={styles.beschrijving}>{Language}</Text>
      </View>
    </View>
  );
  return (
    <View>
      <Item />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
  divies: {
    borderRadius:10,
    marginTop:10,
    overflow:'hidden',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    
    elevation: 11,
  },
  beschrijving:{
    marginTop:20
  }
});

export default bekijkoefening;