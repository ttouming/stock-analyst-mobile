import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Text,
  FlatList,
  Button,
  Pressable,
  TouchableOpacity /* include other react native components here as needed */,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";
import validator from "validator";

export default function Signup() {
  const { ServerURL } = useStocksContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("severurl", ServerURL);
  console.log("severurl type", typeof ServerURL);

  //---Register with back-end---
  function Register() {
    fetch(`${ServerURL}/users/register`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error(error.message));
  }
  //---Register with back-end---

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <View style={styles.view0}>
          <Text style={styles.textColor}>Enter Your Email:</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Email..."
            placeholderTextColor="grey"
            value={email}
            onChangeText={(event) => setEmail(event)}
          />
        </View>
        <View style={styles.view1}>
          <Text style={styles.textColor}>Enter Your Password:</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Password..."
            placeholderTextColor="grey"
            secureTextEntry
            value={password}
            onChangeText={(event) => setPassword(event)}
          />
        </View>
        <View style={styles.view1}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (validator.isEmail(email)) {
                Register();
                setEmail("");
                setPassword("");
                alert("Sign up successfully.");
              } else {
                setEmail("");
                setPassword("");
                alert("please enter a valid email.");
              }
            }}
          >
            <Text style={styles.textColor2}>SUBMIT</Text>
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
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "blue",
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
  textColor2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  view1: {
    alignItems: "center",
    justifyContent: "center",
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
});
