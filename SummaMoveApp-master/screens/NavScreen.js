import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


const NavScreen= ({navigation: {navigate}}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.screen} onPress={() => navigate('Oefeningen')}>
                <Text style={styles.title}>Oefeningen</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.screen} onPress={() => navigate('Prestaties')}>
                <Text style={styles.title}>Prestaties</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.screen} onPress={() => this.props.navigation.getParent().navigate('Login')}>
                <Text style={styles.title}>Log Out</Text>
            </TouchableOpacity>
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
    screen: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: 2,
      borderRadius: 20,
      width: 200,
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
    },
  });

export default NavScreen