import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StocksScreen from "../screens/StocksScreen";
import QuoteScreen from "../screens/QuoteScreen";

const Stack = createStackNavigator();  // creates object for Stack Navigator

export default function StockQuiteNav({navigation, route}){

    return (
        <Stack.Navigator>
          <Stack.Screen
            name="Stocks"
            component={StocksScreen}
            options={{ headerLeft: null }} 
          />
           <Stack.Screen
            name="Quote"
            component={QuoteScreen}
          />
        </Stack.Navigator>
      );
}

