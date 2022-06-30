import { Button, View, StyleSheet} from "react-native";
import {TextInput} from "react-native-paper";
import { useState } from "react";
import { setToken } from "./Auto";
import { setUser } from "./Auto";
import "../i18n/i18n";
import {useTranslation} from 'react-i18next';

const Register= ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const [currentLanguage,setLanguage] =useState('en');

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ConfPassword, setConfPassword] = useState("");
    
    const RegisterUser = async ()=>{
    
        try {
          const response = await fetch('http://localhost:8000/api/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',         
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
              password_confirmation: ConfPassword,
              role: 'gebruiker',
            })
          });
          const json = await response.json();
          
          if (response.status == 200) {
            
            navigation.navigate("Login")
          }
        } catch(e) {
          console.error(e)
        } 
      }

    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={(BigName)=>setName(BigName)}
                value= {name}
                placeholder= {t('name')}
                mode={'outlined'}
                />

            <TextInput
                style={styles.input}
                onChangeText={(Text1)=>setEmail(Text1)}
                value={email}
                placeholder={t('email')}
                mode={'outlined'}
                />
                
            <TextInput
                style={styles.input}
                onChangeText={(Text2)=>setPassword(Text2)}
                value={password}
                placeholder={t('password')}
                mode={'outlined'}
                />
                
            <TextInput
                style={styles.input}
                onChangeText={(Text3)=>setConfPassword(Text3)}
                value={ConfPassword}
                placeholder={t('confirm password')}
                mode={'outlined'}
                />
                <Button onPress={() => RegisterUser()} title={t('register')}>{t('register')}{' '} </Button>
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
        bottom:80,
        justifyContent:'center',
        height:40,
        width:200,
        border:"1px",
        borderRadius:"10px",
        backgroundColor:"#6200ee"

      },
      Title:{
        marginBottom:10,
        fontSize:30,
        textAlign:"center"
      }
});


export default Register
