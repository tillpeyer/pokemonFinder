import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function DetailScreen({ route }) {
    const [details, setDetails] = useState("");
    let id = route.params.results.id;

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon/"+ id)
            .then((response) => setDetails(response.data))
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    return (
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.headerStyle}>Pokemon Details</Text>
            <Text style={styles.imageTitle}>Shiny Appearance</Text>
                {details.sprites && details.sprites.front_shiny ? (
                    <Image style={styles.itemImage} source={{ uri: details.sprites.front_shiny }} />
                    ) : (
                    <Text style={styles.itemTitle}>No shiny available</Text>
                    )}
                    <Text style={styles.itemTitle}>Height: {details.height}</Text>
                    <Text style={styles.itemTitle}>Weight: {details.weight}</Text>
                    <Text style={styles.categorie}>Abilities</Text>
                    {details.abilities && details.abilities.map((ability, index) => (
                    <Text key={index} style={styles.itemText}>{index+1}: {ability.ability.name}</Text>
        ))}
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaa',
        marginTop: StatusBar.currentHeight, // add padding for status bar
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
    categorie: {
        fontSize: 24,
        fontWeight: 'normal',
        textAlign: 'center',
        paddingVertical: 16,
        textDecorationLine: 'underline',
    },
    itemText: {
        paddingVertical: 10,
        paddingBottom: 15,
        textAlign: 'center',
    }
});
