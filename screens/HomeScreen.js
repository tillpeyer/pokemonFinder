import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

export default function HomeScreen({navigation}) {

    const [searchTerm, setSearchTerm] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>Find your Pokemon</Text>
            <TextInput 
                style={styles.input}
                placeholder="Search for a pokemon (name or number)"
                onChangeText={text => setSearchTerm(text)}
                value={searchTerm}/>
            <Button
                style={styles.button}
                title="Search"
                onPress={() => navigation.navigate('Result', { searchTerm })} />
            <StatusBar style="auto"/>
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            fontSize: 30,
            backgroundColor: '#aaa',
            textAlign: 'center',
            justifyContent: 'center',
            marginTop: StatusBar.currentHeight,
        },
        input: {
            height: 40,
            width: '100%',
            borderWidth:2.5,
            borderRadius:12,
            paddingHorizontal: 10,
            marginVertical: 20,
        },
        button: {
            margin: 12,
            padding: 10,
            backgroundColor: 'yellow',
            borderRadius: 12,
        },
        headerStyle: {
            fontSize: 40,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingVertical: 16,
        },
    });
