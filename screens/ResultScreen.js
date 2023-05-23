import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const Stack = createNativeStackNavigator();

export default function ResultsScreen({ navigation, route }) {
    let searchTerm = route.params.searchTerm;
    const [results, setResults] = useState("");
    const [currentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const http = rateLimit(axios.create(), { maxRPS: 3 }); // 1 request per second

    useEffect(() => {
        setIsLoading(true);
        if (searchTerm.trim() !== '') {
            searchTerm = searchTerm.toLowerCase();
          } else {
            const randomId = Math.floor(Math.random() * 1000) + 1;
            searchTerm = randomId;
          }
        http.get("https://pokeapi.co/api/v2/pokemon/"+ searchTerm)
        .then(res => setResults(res.data))
        .catch((error) => {
            console.error(error);
            setIsLoading(false);
        })
        .finally(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000); // add a delay of 1 second before the next request
        });
    }, [currentPage]);

   

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.headerStyle}>Pokemon Result</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Details', { results })}>
                <Text style={styles.imageTitle}>Appearance</Text>
                {results.sprites && results.sprites.front_default ? (
                <Image style={styles.itemImage} source={{ uri: results.sprites.front_default }} />
                ) : (
                <Text style={styles.itemTitle}>No sprite available</Text>
                )}
                <Text style={styles.itemTitle}>Pokedex Id: {results.id}</Text>
                <Text style={styles.itemTitle}>Name: {results.name}</Text>
            </TouchableOpacity>
    </View>
    
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaa',
        marginTop: StatusBar.currentHeight, // add padding for status bar
    },
    header: {
        fontSize: 20,
        marginTop: 10, 
    },
    headerStyle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 16,
        textDecorationLine: 'underline',
    },
    itemImage: {
        width: 400,
        height: 400,
        resizeMode: 'cover',
        borderRadius: 4,
        marginRight: 16,
    },
    itemTitle: {
        fontSize: 32,
        fontWeight: 'normal',
        marginBottom: 25,
        textAlign: 'center',
    },
    imageTitle: {
        fontSize: 32,
        fontWeight: 'normal',
        textAlign: 'center',
        paddingVertical: 10,
        textDecorationLine: 'underline',
    },
});
