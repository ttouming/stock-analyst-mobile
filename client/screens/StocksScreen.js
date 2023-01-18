import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList
} from "react-native";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
// bottom sheet

import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import StockTableChart from "../components/StockTableChart";
import AsyncStorage from "@react-native-async-storage/async-storage";

//---filter stockData for display---
function checkData(data) {
  let finalData = [];

  if(data == null || data ==""){
    finalData = finalData;
  }
  else{
    for (let i = 0; i < data.length; i++) {
  
      let count = 0;
  
      for (let j = 0; j < finalData.length; j++) {
        
        if(typeof(data[i])!= "undefined"){
          if(data[i][0]!=undefined){
            if(data[i][0]["symbol"]!=undefined){
              if ((data[i][0].symbol == finalData[j][0].symbol)) {
                count++;
              }
            }
          }
        }
      }
  
      if (count == 0) {
        finalData.push(data[i]);
      }
    }
  }

  return finalData;
}
// the program needs to process the data before displaying.
//---filter stockData for display---

export default function StocksScreen({ navigation, route }) {
  const { watchList, removeFromWatchlist } = useStocksContext(); // for using Async WatchList data
  const [state, setState] = useState({});
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sheetSym, setSheetSym] = useState(""); // for setting symbol in bottomsheet
  const [checkWlist, setCheckWlist] = useState(0);

  const [dateRange, setDateRange] = useState(7);
  let stockData1 = [];

  console.log("async watchlist in stock");
  console.log(watchList);
  // ---bottomsheet---
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["80%"], []);

  const openModal = () => {
    bottomSheetModalRef.current.present();
  };
  // ---bottomsheet---

  //---List for displaying data in stockscreen---
  function List({ item }) {
    if(item!=null && item!= undefined && item[0]["symbol"]!=undefined){
      return (
        <View style={styles.rowBox}>
          <Text
            style={styles.textColorBox1}
            onPress={() =>
              navigation.navigate("Quote", {
                itemId: 100,
                otherParam: item[0]["symbol"],
              })
            }
          >
            {item[0]["symbol"]}
          </Text>
          <Text
            style={styles.textColorBox}
          >
            {item[0]["price"]}
          </Text>
          <Text
            style={ item[0].changes >= 0 ? styles.textColorBox3 : styles.textColorBox2}
          >
            {((item[0].changes)*1).toFixed(3)}
          </Text>
          <View style={styles.view1}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                alert(item[0]["symbol"] + " has been deleted.")
                removeFromWatchlist(item[0]["symbol"])}}
            >
              <Text style={styles.textColor2}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    else{
      return (
        <View style={styles.rowBox}>
          <Text
            style={styles.textColorBox1}
            onPress={() =>
              navigation.navigate("Quote", {
                itemId: 100,
              })
            }
          >
            {"item[0]"}
          </Text>
          <Text
            style={styles.textColorBox}
          >
            {"item[0]"}
          </Text>
          <Text
            style={ styles.textColorBox3}
          >
            {"item[0]"}
          </Text>
          <View style={styles.view1}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                alert("")
                removeFromWatchlist(item[0])}}
            >
              <Text style={styles.textColor2}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  // displaying row element
  //---List for displaying data in stockscreen---

  //---List for displaying data in stockscreen---
  function List2({ item }) {
    return (
      <View style={styles.rowBox}>
        <Text
          style={styles.textColorBox}
          onPress={() =>
              navigation.navigate("Quote", {
              itemId: 100,
              otherParam: item,
            })
          }
        >
          {item}
        </Text>
        <View style={styles.view1}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {alert("");
              removeFromWatchlist(item)}}
          >
            <Text style={styles.textColor2}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  // displaying row element
  //---List for displaying data in stockscreen---

  const API_KEY = "72b24ce965fd0980f888f7bbdc0bd4c7"; 
  // input FMP api key here

  console.log("watchlist item 0: " + watchList[0]);
  console.log("watchlist item 0 type: " + typeof watchList[0]);
  // checking watchlist[0] data n type

  useEffect(() => {

    if(!loading && watchList !=""){
      let c = 0;
      setStockData([]);
      watchList.map((item) =>
        fetch(
          `https://financialmodelingprep.com/api/v3/profile/${item}?apikey=${API_KEY}`
        )
        .then((response) => response.json())
        .then((json) => setStockData((x) => [...x, json]))
        .then(() => console.log("item for fetching: " + item))
        .then(() => console.log("checkfetching: " + c), c++)
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
      );
    }
  }
  , [watchList]);
  //this is fetching data from fmp
  // when refreshing the program fetch multiple times

  useEffect(() => {
    getData();
   }, []);

  const [name, setName] = useState("");

  const getData = async ()=>{
    try{
      await AsyncStorage.getItem('email')
      .then(value=>{
          if(value != null){
            setName(value);
          }
        });
    }
    catch(error){
      console.log(error);
    }
  }// get async email

  console.log("reading api data: ");
  let fData = checkData(stockData);
  console.log("filter the data: ");
  console.log(fData);

  let sData = "";
  let c = 0;
  if(watchList != null){
    for(let item in watchList){
      if(c==0){
        sData = watchList[item];
        c++
      }
      else{
        sData = sData + "," + watchList[item];
      }
    }
  }

  let k = 0;

  // check fData for final displaying
  if (loading == true && stockData.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.textColor}>Loading</Text>
      </View>
    );
  } else if (loading == true && (stockData.length == 0 && watchList.length == 0)) {
    return (
      <View style={styles.container}>
        <Text style={styles.textColor}>Nothing in the watchlist yet.</Text>
      </View>
    );
  } else {
    return (
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <View style={styles.container0}>
            <Text style={styles.textColor}>Watch List: </Text>
            <Text style={styles.textColor}>User Name: </Text>
          </View>
          <FlatList
            data={fData}
            renderItem={({ item }) => List({ item })}
            keyExtractor={(item) => 
              {item}
            }
            //this is to display stock symbol
            //this can apply scroll
          />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <View>
            <Text>Selected Symbol: {sheetSym}</Text>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
}

const styles = StyleSheet.create({
  textColor: {
    color: "darkgreen",
    fontSize:15,
  },
  container0:{
    borderColor: "grey",
    borderBottomWidth: 1,
  },
  bottonStyle1: {
    margin: 10,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "blue",
  },
  textColorBox1: {
    paddingTop:3,
    paddingLeft:5,
    fontSize:20,
    color:"darkgreen",
    flex:1
  },
  textColorBox: {
    padding: 5,
    color: "darkgreen",
    padding: 18,
    flex: 1,
  },
  textColorBox2: {
    padding: 18,
    color: "red",
    fontSize:17,
    flex: 1,
  },
  textColorBox3: {
    padding: 5,
    color: "green",
    fontSize:17,
    flex: 1,
  },
  rowBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: "grey",
    borderBottomWidth: 1,
    height:80,
  },
  rowBox2: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: "grey",
    borderBottomWidth: 1,
    height:40,
  },
  view1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColor2: {
    fontSize: 13,
    color: "white",
  },
  textColor3: {
    fontSize: 8,
    paddingTop:2,
    color: "black",
  },
  button: {
    alignItems: "center",
    backgroundColor: "darkseagreen",
    padding: 15,
    margin:5,
    borderRadius: 10,
  },
  button2: {
    alignItems: "center",
    backgroundColor: "darkseagreen",
    padding: 5,
    height: 30,
    width:45,
    borderRadius: 10,
  },
});
