import React from 'react'
import {useState} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function Statistics() {
    let [memoryValue, setMemory] = useState(0 + "%")
    let [videos, setVideos] = useState(0);

    return(
        <View>
            <View style={styles.headers}>
                <MaterialIcon style={styles.icons} name="graphic-eq" size={45} color="black"/>
                <Text style={styles.headerText}>Statistics</Text>
            </View>
            <View>
                <Text>Memory</Text>
                <Text>{memoryValue}</Text>
            </View>
            <View style={styles.videos}>
                <Text>Videos</Text>
                <Text>{videos}</Text>
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
        marginLeft: 10
    },
    videos: {
        backgroundColor: '#7c587f',
    },
    icons: {

    }
});