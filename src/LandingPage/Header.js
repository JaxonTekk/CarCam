import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

export default function Header() {
    let d = new Date().getHours()%12 + ":" + (new Date().getMinutes()/10===0?"0"+new Date().getMinutes():new Date().getMinutes()) + " " + (new Date().getHours()<12?"AM":"PM");

    return (
        <View styles={styles.container}>
            <View styles={styles.border}>
                <Text>Welcome!</Text>
                <Text>{d}</Text>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
});