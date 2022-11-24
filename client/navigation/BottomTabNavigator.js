import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Button, TextInput, Text, FlatList, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import StocksScreen from "../screens/StocksScreen";
import SearchScreen from "../screens/SearchScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import StockQuiteNav from "./StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useStocksContext } from '../contexts/StocksContext';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Search";

export default function BottomTabNavigator({ navigation, route }) {
  const { deleteWatchlist } = useStocksContext();

  useEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);


  const Logout = async ()=>{
    try{
        await AsyncStorage.removeItem("email");
        deleteWatchlist();
        navigation.navigate("Main");
      }
    catch(error){
      console.log(error);
    }
  }


  return (
    <BottomTab.Navigator 
      initialRouteName={INITIAL_ROUTE_NAME}
    >
      <BottomTab.Screen
        name="StocksQuote"
        component={StockQuiteNav}
        options={{
          title: "Stocks",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-trending-up" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-search" />
          ),
          headerRight: () => (
            <View style={styles.view1}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => Logout()}
              >
                <Text style={styles.textColor2}>Logout</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  return getFocusedRouteNameFromRoute(route) ?? INITIAL_ROUTE_NAME;
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color:"white"
    },
    textColor: {
      color: "darkgreen",
      fontSize: 15,
    },
    textInputStyle: {
      margin: 5,
      padding: 10,
      color: "green",
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "gray",
      height: 40,
      width:300,
    },
    bottonStyle1:{
        margin:10,
        borderWidth:3,
        borderColor:"white",
        backgroundColor:"blue",
    },
    view0: {
      alignItems: 'center',
      justifyContent: 'center',
      padding:10
    },
    view1: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    button3: {
      alignItems: 'center',
      flex: 1,
      height: 50,
      width:300,
      margin: 30,
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'lightblue',
    },
    text3: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    textColor2: {
      fontSize: 14,
      color: "white",
    },
    view1: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      alignItems: "center",
      backgroundColor: "darkseagreen",
      padding: 10,
      margin:10,
      height: 40,
      width:80,
      borderRadius: 10,
    },
});
