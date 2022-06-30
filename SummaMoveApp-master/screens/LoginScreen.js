import { Text, StyleSheet, View,Button,Pressable,Alert } from "react-native";
import {TextInput} from "react-native-paper";
import { useState } from "react";
import { setToken } from "./Auto";
import { setUser } from "./Auto";
import { setBeschrijving } from "./Auto";
import "../i18n/i18n";
import {useTranslation} from 'react-i18next';
const LoginScreen = ({navigation, route}) => {
 
  const {t, i18n} = useTranslation();
  
  const [currentLanguage,setLanguage] =useState('en');
  
  const changeLanguage = value => {
    setBeschrijving(value);
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };



  let Language = "nl";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setuserid] = useState("");
  const [getLan, setlan] = useState("");
  const [wrong,setmsgwrong] =useState("");


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
        email: email,
        password: password
      })
    });
    const json = await response.json();
   
    
    if (response.status == 200) {
      acces_token = json.access_token;
      setToken(acces_token);
      setUser(json.userData[0].id);
      navigation.navigate("SummaMove", {data: {userid: userid, acces_token: acces_token}})
      setmsgwrong('');
    
    }
    else{
      setmsgwrong(t('wrong'));
    }
  }
   catch(e) {
    console.log(e);
  }   
  finally{
   
  }
}

    return (
        <View style={styles.container}>
             <View style={{ flex: 0.5, backgroundColor: "red", }} ></View>
                <View style={{ flex: 3,  display:"flex",textAlign:"center",alignItems:"center",   border:"1px", borderRadius:"10px",}} >
        {/* __________________________________________________________________________ email */}
        <Text style={styles.Title}>	{t('login')}{' '}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(Textmail)=>setEmail(Textmail)}
        value={email}
        placeholder={t('email')}
        mode={'outlined'}
        />
        {/* __________________________________________________________________________ password */}
      <TextInput
        style={styles.input}
        onChangeText={(Textpassword)=>setPassword(Textpassword)}
        value={password}
        placeholder={t('password')}
        mode={'outlined'}
        />
        <Text>
          {wrong}
        </Text>
        <Pressable style={styles.Button}><Text style={{margin:"auto", color: 'white', textAlign:"center", justifyContent:"center"}}  onPress={() => {
          login();
        }}>{t('login')}{' '}</Text></Pressable>
        <Pressable style={styles.Button2}><Text style={{margin:"auto", color: 'white', textAlign:"center", justifyContent:"center"}}  onPress={() => {
          navigation.navigate("Register");
        }}>{t('register')}{' '}</Text></Pressable>
            <Text style={styles.changelangtxt }>{t('changelang')}{' '}</Text>
            <Pressable style={styles.Button3}><Text style={{margin:"auto", color: 'white', textAlign:"center", justifyContent:"center"}}  onPress={() => changeLanguage('en')} >en</Text></Pressable>
            <Pressable style={styles.Button4}><Text style={{margin:"auto", color: 'white', textAlign:"center", justifyContent:"center"}}  onPress={() => changeLanguage('nl')} >nl</Text></Pressable>
        </View>
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
        width: '100%'
      },
      Button:{
        display:"flex",
        position:"absolute",
        bottom:"50%",
        justifyContent:'center',
        height:40,
        width:200,
        border:"1px",
        borderRadius:"10px",
        backgroundColor:"#6200ee"

      },
      Button2:{
        display:"flex",
        position:"absolute",
        bottom:"40%",
        justifyContent:'center',
        height:40,
        width:200,
        border:"1px",
        borderRadius:"10px",
        backgroundColor:"#6200ee"

      },
      Button3:{
        display:"flex",
        position:"absolute",
        bottom:"15%",
        left:'20%',
        justifyContent:'center',
        height:40,
        width:50,
        border:"1px",
        borderRadius:"10px",
        backgroundColor:"#6200ee"

      },
      Button4:{
        display:"flex",
        position:"absolute",
        bottom:"15%",
        right:'20%',
        justifyContent:'center',
        height:40,
        width:50,
        border:"1px",
        borderRadius:"10px",
        backgroundColor:"#6200ee"

      },
      Title:{
        marginBottom:10,
        fontSize:30,
        textAlign:"center"
      },
      changelangtxt:{
        position:'absolute',
        bottom:"25%"
      }
});

export default LoginScreen;