import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import StockTableChart from "../components/StockTableChart";


export default function StocksScreen({route}) {

  const [dateRange, setDateRange] = useState("7");

  const {  otherParam } = route.params;


  return (
    <View style={styles.container}>
        <Text style={styles.textColor1}>Selected Stock: <Text style={styles.textColor2}>{otherParam}</Text></Text>
        <View style={styles.rowBox2}>
              <TouchableOpacity
              style={styles.button2}
              onPress={() => setDateRange("7")}
            >
              <Text style={styles.textColor3}>1W</Text>
            </TouchableOpacity>
              <TouchableOpacity
              style={styles.button2}
              onPress={() => setDateRange("30")}
            >
              <Text style={styles.textColor3}>1M</Text>
            </TouchableOpacity>
              <TouchableOpacity
              style={styles.button2}
              onPress={() => setDateRange("90")}
            >
              <Text style={styles.textColor3}>3M</Text>
            </TouchableOpacity>
              <TouchableOpacity
              style={styles.button2}
              onPress={() => setDateRange("180")}
            >
              <Text style={styles.textColor3}>6M</Text>
            </TouchableOpacity>
              <TouchableOpacity
              style={styles.button2}
              onPress={() => setDateRange("360")}
            >
              <Text style={styles.textColor3}>1Y</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.box}>
              {StockTableChart(otherParam, dateRange)}
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textColor:{
    color: "darkgreen",
    fontSize:15,
  },
  textColor1:{
    color: "darkgreen",
    fontSize:17,
    paddingLeft:5,
    paddingBottom:5,
  },
  textColor2:{
    color: "darkgreen",
    fontSize:18,
    fontWeight: "bold",
    fontStyle:"italic"
  },
  textColor3: {
    fontSize: 15,
    fontWeight: "bold",
    paddingTop:2,
    color: "white",
  },
  button2: {
    alignItems: "center",
    backgroundColor: "darkseagreen",
    padding: 5,
    margin:5,
    height: 30,
    borderRadius: 10,
    flex:1,
  },
  rowBox2: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: "grey",
    borderTopWidth: 1,
    height:40,
    paddingTop:5,
  },
  box:{
    paddingTop:5,
  }
  });