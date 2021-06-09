import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function Features() {
    return (
        <View>
            <View style={styles.headers}>
                <FontAwesome5 name="bullseye" size={35} style={styles.bullseye}/>
                <Text style={styles.headerText}>Features</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.start}>
                    <Text style={styles.startText}>Start</Text>
                    <MaterialCommunityIcons name="fiber-smart-record" size={35}/>
                </View>
                <View style={styles.viewRecordings}>
                    <Text style={styles.viewRecordingsText}>View Recordings</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headers: {
        flexDirection: 'row',
        marginLeft: Dimensions.get('window').width/25,
        marginRight: Dimensions.get('window').width/25,
        marginTop: Dimensions.get('window').height/55,
    },

    headerText: {
        fontSize: 26,
        marginTop: 6,
        marginLeft: 10,
        marginBottom: 20
    },

    bullseye: {
        marginTop: 5
    },

    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    start: {    
        backgroundColor: '#007f97',
        borderRadius: 20,
        marginLeft: 15,
        marginRight: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
    },

    viewRecordings: {
        backgroundColor: '#7c587f',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
    },

    startText: {
        color: 'white',
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginHorizontal: Dimensions.get('window').width/6
    },

    viewRecordingsText: {
        color: 'white',
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginHorizontal: Dimensions.get('window').width/20
    }
});