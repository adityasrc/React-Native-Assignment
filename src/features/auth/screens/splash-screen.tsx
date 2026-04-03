import type { StaticScreenProps } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// //static type definations react navigation me use hota hai
import {StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/theme';


export default function SplashScreen() {
    const navigation = useNavigation<any>();

    useEffect(()=>{
        const timer = setTimeout(()=>{
            navigation.navigate('Welcome'); 
        }, 2000);

        return () => clearTimeout(timer);

    }, [navigation]);

    return(
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/ready.png')}
                style = {{width: 250, height: 150}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "colors.white",
        alignItems: "center",
        justifyContent: 'center',
    },
});

