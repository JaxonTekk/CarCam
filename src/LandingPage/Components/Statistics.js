import React from 'react'
import {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { ProgressBar } from 'react-native-paper';

export default function Statistics() {
    let [memory, setMemory] = useState(0);
    let [videos, setVideos] = useState(0);

    return(
        <View>
            <Text>Statistics</Text>
            <View style={styles.memory}>
                <Text style={styles.bigText}>Memory</Text>
                <Text style={styles.smallText}>{memory*100}%</Text>
                <ProgressBar progress={memory} style={styles.progressBar} color={'white'}/>
            </View>
            <View style={styles.videos}>
                <Text style={styles.bigText}>Videos</Text>
                <Text style={styles.videosText}>{videos}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    memory: {
        backgroundColor: '#007f97', 
        borderRadius: 20,
        marginHorizontal: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
    },

    videos: {
        backgroundColor: '#7c587f',
        borderRadius: 15,
        marginLeft: 15,
        marginRight: 250,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
    },
    
    bigText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },

    smallText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },

    videosText: {
        color: 'white',
        fontSize: 50,
        marginLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },

    progressBar: {
        marginRight: 20,
        marginLeft: 15,
        marginBottom: 10
    }
});