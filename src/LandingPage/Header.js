import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

export default function Header() {
    let t = new Date().getHours()%12 + ":" + (new Date().getMinutes()/10<1?"0"+new Date().getMinutes():new Date().getMinutes()) + " " + (new Date().getHours()<12?"AM":"PM");

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.time}>{t}</Text> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100, 
        backgroundColor: '#fff',
        padding: 2, 
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
    },

    welcome: {
        marginTop: 5,
        fontSize: 25
    },

    time: {
        fontSize: 30,
        color: '#7c587f'
    }
});