import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ResultScreen from "./screens/ResultScreen";
import DetailScreen from "./screens/DetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen 
          name = "PokemonSearch" 
          component={HomeScreen}
          options={{title: "Pokemon Finder"}}/>
        <Stack.Screen 
          name = "Result"
          component={ResultScreen}/>
        <Stack.Screen
          name = "Details"
          component={DetailScreen} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
}
