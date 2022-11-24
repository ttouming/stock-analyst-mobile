// ---jwt_decode---
// import jwt_decoded first
import jwt_decode from "jwt-decode";
// ---jwt_decode---

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  FlatList /* include other react native components here as needed */,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const { ServerURL } = useStocksContext();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getUserLogin();
  }, []);

  console.log("Name: " + name);
  console.log("Password: " + password);

  const getUserLogin = () => {
    try {
      AsyncStorage.getItem("email").then((value) => {
        if (value != null) {
          navigation.navigate("BottomTab");
        }
        if (value == null) {
          navigation.navigate("Main");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  function SetLogin() {
    fetch(`${ServerURL}/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email: name,
        password: password,
      }),
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.token != null) {
          console.log(jwt_decode(res.token));
          AsyncStorage.setItem("email", name);
          navigation.navigate("BottomTab");
        } else {
          console.log(res);
          alert("Email or password is not valid. Please try again.");
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <View style={styles.view9}>
          <Image style={styles.logo} source={require("./img/logo.png")} />
        </View>
        <View style={styles.view0}>
          <Text style={styles.textColor}>Please Enter Email:</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter email..."
            placeholderTextColor="grey"
            value={name}
            onChangeText={(event) => setName(event)}
          />
        </View>
        <View style={styles.view1}>
          <Text style={styles.textColor}>Please Enter Password:</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter password..."
            placeholderTextColor="grey"
            secureTextEntry
            onChangeText={(event) => setPassword(event)}
          />
        </View>
        <View style={styles.view1}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              SetLogin();
              setName("");
              setPassword("");
            }}
          >
            <Text style={styles.textColor2}>LOG IN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view1}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.textColor2}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view1}>
          <Text>First time using the app?</Text>
          <Text>Here is a quick guide for ya.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("TutorialScreen")}
          >
            <Text style={styles.textColor4}>Tutorial</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
  },
  textColor: {
    color: "darkgreen",
    fontSize: 15,
  },
  textColor2: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  textColor4: {
    fontSize: 17,
    //fontWeight: "bold",
    color: "blue",
  },
  textInputStyle: {
    margin: 5,
    padding: 10,
    color: "green",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    height: 40,
    width: 300,
  },
  bottonStyle1: {
    margin: 10,
    padding: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 10,
  },
  bottonStyle2: {
    margin: 10,
    padding: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 10,
  },
  view9: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  view0: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  view1: {
    alignItems: "center",
    justifyContent: "center",
  },
  view2: {
    alignItems: "center",
    justifyContent: "center",
  },
  button3: {
    alignItems: "center",
    flex: 1,
    height: 50,
    width: 300,
    margin: 30,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "lightblue",
  },
  text3: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: "darkseagreen",
    padding: 15,
    margin: 10,
    height: 50,
    width: 200,
    borderRadius: 10,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
