import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList /* include other react native components here as needed */,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";


function searchFilter(data, search) {
  if (data != "") {
    if (search == "") {
      data = data;
    } else {
      data = data.filter((d) => {
        if (d.symbol.toLowerCase().includes(search.toLowerCase())) {
          return d;
        }
      });
    }
  } else {
    data = [0];
  }

  return data;
}

export default function SearchScreen({ navigation, route }) {
  const { watchList, addToWatchlist } = useStocksContext();

  useEffect(() => {
    getData();
  }, []);

  const [name, setName] = useState("");

  const getData = async () => {
    try {
      await AsyncStorage.getItem("email").then((value) => {
        if (value != null) {
          setName(value);
        }
      });
      console.log("Name", name);
    } catch (error) {
      console.log(error);
    }
  };

  const [state, setState] = useState({});
  const [text, setText] = useState("");
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  function stockList({ item }) {
    return (
      <View style={styles.rowBox}>
        <View style={styles.rowBox2}>
          <TouchableOpacity
            style={styles.touch1}
            onPress={() => (
              addToWatchlist(item.symbol),
              alert(
                item.symbol + " added to your watchlist.",
                navigation.navigate("StocksQuote")
              )
            )}
          >
            <Text style={styles.textColorBox1}>{item.symbol}</Text>
            <Text style={styles.textColorBox2}>{item.companyName}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowBox4}>
          <Text style={styles.textColorBox}>{item.sector}</Text>
        </View>
      </View>
    );
  } // displaying row element

  const API_KEY = "72b24ce965fd0980f888f7bbdc0bd4c7";
  // input your FMP api key here

  const url = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=${API_KEY}`;
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setStockData(json))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const finalData = searchFilter(stockData, text);

  if (loading == true) {
    return (
      <View style={styles.container}>
        <Text style={styles.textColor}>Loading</Text>
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container1}>
          <View style={styles.rowBox3}>
            <Text style={styles.textColor2}>User Name: {name}</Text>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(val) => setText(val)}
              placeholder="Enter Stock Symbol..."
              placeholderTextColor="grey"
              // SearchBar
            />
            <Text style={styles.textColor3}>Stock Name: {text}</Text>
          </View>
          <View style={styles.textColor}>
            <FlatList
              data={finalData}
              renderItem={({ item }) => stockList({ item })}
              keyExtractor={(item) => [item, item.symbol]}
              //this is to display stock symbol
              //this can apply scroll
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  textColor: {
    color: "darkgreen",
    fontSize: 15,
  },
  textColor2: {
    color: "darkgreen",
    fontSize: 15,
    paddingLeft: 7,
  },
  textColor3: {
    color: "darkgreen",
    fontSize: 15,
    paddingLeft: 7,
  },
  textInputStyle: {
    margin: 5,
    padding: 10,
    color: "green",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    height: 40,
    width: 350,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textColorBox: {
    padding: 5,
    color: "darkgreen",
    flex: 1,
  },
  textColorBox1: {
    paddingTop: 3,
    paddingLeft: 5,
    fontSize: 20,
    color: "darkgreen",
    flex: 1,
  },
  textColorBox2: {
    paddingLeft: 5,
    paddingTop: 8,
    fontSize: 10,
    color: "darkgreen",
    flex: 1,
  },
  rowBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: "grey",
    borderBottomWidth: 1,
    height: 60,
  },
  rowBox2: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: "grey",
    height: 60,
    width: 200,
  },
  rowBox3: {
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  rowBox4: {
    alignContent: "center",
    paddingLeft: 70,
  },
  touch1: {
    flex: 1,
    borderBottomWidth: 1,
    backgroundColor: "ivory",
  },
});
