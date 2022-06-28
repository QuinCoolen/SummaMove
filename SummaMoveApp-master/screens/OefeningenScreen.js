import { TouchableOpacity, Text, StyleSheet, View, FlatList,ActivityIndicator,Pressable } from "react-native";
import { getCurrentToken, setToken, getUser, setUser } from "./Auto";
import { useState,useEffect } from "react";
import { Image } from 'react-native';

const OefeningenScreen = ({navigation,route}) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    let foto ="";

    const Item = ({ title, description }) => (
        <TouchableOpacity>
            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
    const getOefeningen = async () => {
        try {
           
            const response = await fetch('http://localhost:8000/api/oefeningenNO/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const json = await response.json();
            if (response.status == 200) {
                setData(json.data);
                foto = json.data[0].foto;
               console.log(foto);
               setLoading(false);
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getOefeningen();
    }, []);
    return (
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                    <View >
                        <Pressable style={styles.divies} onPress={() => { navigation.navigate('BekijkOefening', { oefening:item })}}>
                            <Image style={{ width:"100%",height:"100%",  opacity: 0.3}} source={{  uri: item.foto,}}></Image>
                            <Text style={styles.title}>{item.naam}</Text>
                        </Pressable>
                    </View>

                    )}
                />
            )}
        </View>
        
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1464B5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        width: 200,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
    },
    title: {
        position:'absolute',
        fontSize: 32,
        color:"white"
    },
    description: {
        fontSize: 16,
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
        width: '100%',
        marginTop:10,
        shadowColor: "#000",
        shadowOffset: {
          width: 4,
          height: 14,
        },
        shadowOpacity: 0.14,
        shadowRadius: 20,
      },
});

export default OefeningenScreen;