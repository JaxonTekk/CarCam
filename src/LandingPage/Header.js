import React from 'react'
import {useState} from 'react'
import {StyleSheet, View, Text, Dimensions} from 'react-native'

export default function Header() {
    let [t, setT] = useState(new Date().getHours()%12 + ":" + (new Date().getMinutes()/10<1?"0"+new Date().getMinutes():new Date().getMinutes()) + " " + (new Date().getHours()<12?"AM":"PM"));
    setInterval(() => setT(new Date().getHours()%12 + ":" + (new Date().getMinutes()/10<1?"0"+new Date().getMinutes():new Date().getMinutes()) + " " + (new Date().getHours()<12?"AM":"PM")), 1000);

    return (
        <View styles={styles.container}>
            <View style={styles.rectangle}>
                <Text style={styles.largeText}>Welcome</Text>
                <Text style={styles.smallText}>{t}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    rectangle: {
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    largeText: {
        marginTop: Dimensions.get('window').height/19,
        marginLeft: Dimensions.get('window').width/25,
        fontSize: 26
    },
    smallText: {
        marginTop: 5,
        marginLeft: Dimensions.get('window').width/25,
        fontSize: 40,
        marginBottom: 10,
        color: "#4c3f77"
    }
});
