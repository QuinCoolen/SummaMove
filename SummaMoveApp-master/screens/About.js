import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import "../i18n/i18n";
import {useTranslation} from 'react-i18next';
const About= () => {

    const {t, i18n} = useTranslation();
    return (
        <View styles={styles.container}>
            <Image style={styles.image} source={{  uri: "https://www.summacollege.nl/images/default-source/logo's/logo-summa-sport.jpg?sfvrsn=24f4d85_4.png",}}></Image>
            <Text style={styles.title}>{t('about')}{' '}</Text>
                <Text style={styles.text}>{t('about-text')}{' '}</Text>
                <Text style={styles.text}>{t('support')}{' '}</Text>
                <Text style={styles.text}>v0.8</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    image: {
        height: 175,
        width: 352,
        margin: 'auto',
    },
    text: {
        fontSize: 14,
        margin: 15,
        textAlign: 'center',
    }
});

export default About
