import * as React from "react";
import {
  Platform,
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  Button,
} from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { StocksProvider } from "./contexts/StocksContext";
import TutorialScreen from "./screens/TutorialScreen";
import { useState, useEffect } from "react";
import validator from "validator";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import StockQuiteNav from "./navigation/StackNavigator";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const theme = {
  myOwnProperty: true,
  colors: {
    primary: "#3498db",
    secondary: "#f1c40f",
    tertiary: "#a1b2c3",
  },
};

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <StocksProvider>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Main"
                options={{ headerShown: false }}
                component={Login}
              />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen
                name="BottomTab"
                component={BottomTabNavigator}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="TutorialScreen"
                component={TutorialScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </StocksProvider>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textColor: {
    color: "white",
  },
  textInputStyle: {
    margin: 5,
    padding: 5,
    color: "white",
    borderWidth: 3,
    borderColor: "white",
  },
  bottonStyle1: {
    margin: 10,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "blue",
  },
});
