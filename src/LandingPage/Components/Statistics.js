import React from 'react'
import {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default function Statistics() {
    let [memory, setMemory] = useState(0 + "%")
    let [videos, setVideos] = useState(0);

    return(
        <View>
            <Text>Statistics</Text>
            <View>
                <Text>Memory</Text>
                <Text>{memory}</Text>
            </View>
            <View styles={styles.videos}>
                <Text>Videos</Text>
                <Text>{videos}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    videos: {
        backgroundColor: '#7c587f',
    }
});