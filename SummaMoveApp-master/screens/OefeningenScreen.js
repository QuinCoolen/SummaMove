import { TouchableOpacity, Text, StyleSheet, View, FlatList,ActivityIndicator,Pressable } from "react-native";
import { getCurrentToken, setToken, getUser, setUser } from "./Auto";
import { useState,useEffect } from "react";

const OefeningenScreen = ({navigation,route}) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    let foto ="";

    const Item = ({ title, description }) => (
        <TouchableOpacity>
            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
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


    // let AccessToken;
    // getCurrentToken((token) => {
    //     // console.log("got:" + token)
    //     AccessToken = token;
    // });

    // let id;
    // getUser((userid) => {
    //     // console.log("got:" + token)
    //     id = userid;
    // });

    return (
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                    <View>
                        <Pressable  onPress={() => { navigation.navigate('BekijkOefening', { oefening:item })}}>
                            <Text>{item.naam}</Text>
                            <Text>{item.beschrijvingNL}</Text>
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
        marginTop:"10px",
        backgroundColor: '#fff',
        padding: 15,
        width: 200,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
    },
    title: {
        marginTop:"10px",
        fontSize: 32,
    },
    description: {
        fontSize: 16,
    },
});
export default OefeningenScreen;