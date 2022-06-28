import { View, Text, Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";

const bekijkoefening = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  let Language = route.params.oefening.beschrijvingNL;
  let foto = "";
  foto = route.params.oefening.foto
  console.log(foto);
  const Item = () => (
    <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
      <Image style={{ width: 400, height: 300, marginTop: 20 }} source={{ uri: foto, }}></Image>
      <Text>{route.params.oefening.naam}</Text>
      <Text>{Language}</Text>
    </View>
  );
  return (
    <View>
      <Item />
    </View>
  )
}
export default bekijkoefening