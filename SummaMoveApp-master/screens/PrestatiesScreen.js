import { TouchableOpacity, Text, StyleSheet, View, FlatList,ActivityIndicator,Pressable } from "react-native";
import { getCurrentToken, setToken, getUser, setUser,setoefening,Getoefening } from "./Auto";
import { Image } from 'react-native';
import { useState,useEffect } from "react";
import { color } from "react-native-reanimated";
const PrestatieScreen = ({navigation,route}) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [oefeningid, setoefeningid] = useState([]);
    let foto ="";
    let id;
    getUser((userid) => {
         console.log("got:" + userid)
         id = userid;
    });

    let AccessToken;
    getCurrentToken((token) => {
      // console.log("got:" + token)
      AccessToken = token;
    });
    const Getoefeningen = async ()=>{

        try {
            const response = await fetch('http://localhost:8000/api/oefeningen', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer "+AccessToken,
                }
            });
            const json = await response.json();
            if (response.status == 200) {
                console.log(json)
                foto = json.data[0].foto;
                setData(json.data);
               setLoading(false);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        Getoefeningen();
    }, []);

    const Item = () => (
        <View style={{ display:"flex",alignItems:"center", justifyContent:"center"}} >
    <Image style={{ width:400,height:300, marginTop:20 }} source={{  uri: "https://i1.sndcdn.com/artworks-BryYhZ1w20ACsciS-SJBUbA-t500x500.jpg",}}></Image>
        </View>
);
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                    <View >
                           <Pressable style={styles.divies}  onPress={() => { navigation.navigate('Showscreen', { oefening:item })}}>
                           <Image style={{ width:"100%",height:"100%",  opacity: 0.3}} source={{  uri: item.foto,}}></Image>
                            <Text style={{ position:'absolute', color:'#FFFFFF',marginTop:100, fontSize:30 }}>{item.naam}</Text>
                            </Pressable>
                     </View>
                    
                    )}
                />
            )}
        </View>
        </View>
    )
    }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    divies:{
        overflow:"hidden",
        borderWidth:1,
      borderRadius:20,
      alignItems: 'center',
      backgroundColor: '#606060',
      height:200,
      width:400,

      shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 14,
        },
        shadowOpacity: 0.14,
        shadowRadius: 20,
    }
});

export default PrestatieScreen;