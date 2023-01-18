import React, { useState, useEffect, useContext } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Swiper as Swiper} from 'react-native-swiper'

export default function TutorialScreen({ navigation}){

    return(
      <Swiper 
        style={styles.wrapper} 
        showsButtons={true}
        removeClippedSubviews={false}
        scrollEnabled={true}  
      >
        <View 
        style={styles.container1}
        >
          <View 
          style={styles.textBox}
          >
          <Text style={styles.textColor}>First, You have to go to Sign up page</Text>
          <Text style={styles.textColor}>to register your account.</Text>
          </View>
          <View style={styles.view9}>
            <Image style={styles.logo} source={require('./img/pic1.png')} />
          </View>
        </View>
        <View 
        style={styles.container2}
        >
          <View 
          style={styles.textBox}
          >
          <Text style={styles.textColor}>Then, You can login from main page.</Text>
          </View>
                    <View style={styles.view9}>
            <Image style={styles.logo} source={require('./img/pic2.png')} />
          </View>
        </View>
        <View 
        style={styles.container3}
        >
           <View 
          style={styles.textBox}
          >
          <Text style={styles.textColor}>Now, You can search the stock,</Text>
          <Text style={styles.textColor}>and put them into watchlist</Text>
          <Text style={styles.textColor}>by pressing the stock symbol</Text>
          <Text style={styles.textColor}>in search screen.</Text>
          </View>
                    <View style={styles.view9}>
            <Image style={styles.logo} source={require('./img/pic3.png')} />
          </View>
        </View>
        <View 
        style={styles.container4}
        >
          <View 
          style={styles.textBox}
          >
          <Text style={styles.textColor}>You can see some basic info of</Text>
          <Text style={styles.textColor}>stocks in your watchkist</Text>
          <Text style={styles.textColor}>in stock screen.</Text>
          <Text style={styles.textColor}>You can see details by pressing </Text>
          <Text style={styles.textColor}>the stock symbol.</Text>
          </View>
          <View style={styles.view9}>
            <Image style={styles.logo} source={require('./img/pic4.png')} />
          </View>
        </View>
        <View 
        style={styles.container4}
        >
          <View 
          style={styles.textBox}
          >
            <Text style={styles.textColor}>In quote screen.</Text>
          <Text style={styles.textColor}>You can see graph and table.</Text>
          </View>
          <View style={styles.view9}>
            <Image style={styles.logo} source={require('./img/pic5.png')} />
          </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Main")}
            >
              <Text style={styles.textColor4}>go back to main screen.</Text>
            </TouchableOpacity>
        </View>
    </Swiper>
    );
}

const styles = StyleSheet.create({
    textColor4: {
      fontSize: 17,
      color: "blue",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color:"white"
      },
      textColor: {
        color: "midnightblue",
        fontSize: 18,
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
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
      },
      view1: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        alignItems: "center",
        backgroundColor: "darkseagreen",
        padding: 15,
        margin:10,
        height: 50,
        width:200,
        borderRadius: 10,
      },
      container1: {
        alignItems: "center",
        flex:1,
        justifyContent:"center",
        backgroundColor: "cadetblue",
      },
      container2: {
        alignItems: "center",
        flex:1,
        justifyContent:"center",
        backgroundColor: "lightcoral",
      },
      container3: {
        alignItems: "center",
        flex:1,
        justifyContent:"center",
        backgroundColor: "lightgoldenrodyellow",
      },
      container4: {
        alignItems: "center",
        flex:1,
        justifyContent:"center",
        backgroundColor: "lightsteelblue",
      },
      view9: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      logo: {
        width: 200,
        height: 400
      },
      textBox: {
        paddingBottom:10,
      },
});