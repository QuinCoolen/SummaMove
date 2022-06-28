import { Text, StyleSheet, View,TextInput,Button,Pressable,Alert} from "react-native";
import { useState } from "react";
import { setToken } from "./Auto";
import { setUser } from "./Auto";

const LoginScreen = ({navigation, route}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setuserid] = useState("");
  let acces_token = '';
  let role ='';

const login = async ()=>{
  try {
    const response = await fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',         
      },
      body: JSON.stringify({
        email: "admin@gmail.com",
        password: "admin123"
      })
    });
    const json = await response.json();
    acces_token = json.access_token;
    
    if (response.status == 200) {
      setToken(acces_token);
      setUser(json.userData[0].id);
      navigation.navigate("SummaMove", {data: {userid: userid, acces_token: acces_token}})
    }
  } catch(e) {
    console.error(e)
  } 
}
    return (
        <View style={styles.container}>
             <View style={{ flex: 0.5, backgroundColor: "red", }} ></View>
                <View style={{ flex: 3,  display:"flex",textAlign:"center",alignItems:"center",   border:"1px", borderRadius:"10px",}} >
        {/* __________________________________________________________________________ email */}
        <Text style={styles.Title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={(Textmail)=>setEmail(Textmail)}
        value={email}
        placeholder="email"
        />
        {/* __________________________________________________________________________ password */}
      <TextInput
        style={styles.input}
        onChangeText={(Textpassword)=>setPassword(Textpassword)}
        value={password}
        placeholder="wachtwoord"
        />
        <Pressable style={styles.Button}><Text style={{margin:"auto", textAlign:"center", justifyContent:"center"}}  onPress={() => {
          login();
        }}>inloggen</Text></Pressable>
        </View>
                <View style={{ flex: 1, backgroundColor: "green" }} ></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width:400
      },
      Button:{
        display:"flex",
        position:"absolute",
        bottom:80,
        justifyContent:'center',
        height:40,
        width:200,
        border:"1px",
        borderRadius:"10px",
        backgroundColor:"blue"

      },
      Title:{
        marginBottom:10,
        fontSize:30,
        textAlign:"center"
      }
});

export default LoginScreen;